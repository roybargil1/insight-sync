import Anthropic from "@anthropic-ai/sdk";
import type { RawResult, FilteredResult, Sentiment } from "./types";

const client = new Anthropic();
const BATCH_SIZE = 20;

interface AIDecision {
  index: number;
  relevant: boolean;
  sentiment?: Sentiment;
  title?: string;
}

async function filterBatch(
  product: { name: string; description?: string | null },
  batch: RawResult[]
): Promise<FilteredResult[]> {
  const productContext = product.description
    ? `"${product.name}" — ${product.description}`
    : `"${product.name}"`;

  const prompt = `You are a strict quality filter for user feedback data.

Product: ${productContext}

Mark an item RELEVANT only if ALL four conditions are met:
1. It contains direct, first-hand user experience with "${product.name}" — a real review, complaint, praise, bug report, or feature request
2. The content is about the correct product — reject anything about a different product that happens to share the name
3. It is NOT marketing copy, a press release, official documentation, sponsored content, or promotional material
4. The product is the PRIMARY subject — passing mentions in articles about something else do not qualify

For each relevant item provide:
- sentiment: Positive | Negative | Neutral | Mixed
- title: concise summary of the feedback (max 80 chars)

Return ONLY a valid JSON array, no other text:
[{ "index": 0, "relevant": true, "sentiment": "...", "title": "..." }, { "index": 1, "relevant": false }, ...]

Items to evaluate:
${batch
  .map(
    (r, i) => `[${i}] SOURCE: ${r.source}
TITLE: ${r.title}
TEXT: ${r.text.slice(0, 400).replace(/\n+/g, " ")}
---`
  )
  .join("\n")}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "[]";
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  const decisions: AIDecision[] = JSON.parse(jsonMatch ? jsonMatch[0] : "[]");

  return decisions
    .filter((d) => d.relevant && d.sentiment && d.title)
    .map((d) => ({
      ...batch[d.index],
      sentiment: d.sentiment as Sentiment,
      cleanTitle: d.title!,
    }));
}

export async function filterWithAI(
  product: { name: string; description?: string | null },
  results: RawResult[]
): Promise<FilteredResult[]> {
  if (!results.length) return [];

  const filtered: FilteredResult[] = [];
  for (let i = 0; i < results.length; i += BATCH_SIZE) {
    const batch = results.slice(i, i + BATCH_SIZE);
    const batchFiltered = await filterBatch(product, batch);
    filtered.push(...batchFiltered);
  }
  return filtered;
}
