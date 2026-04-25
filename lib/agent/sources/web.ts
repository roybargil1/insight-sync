import type { RawResult } from "../types";

const MAX_RESULTS = 5;
const MAX_CONTENT_CHARS = 2500;

interface TavilyResult {
  title: string;
  url: string;
  content: string;
  raw_content?: string;
  score: number;
  published_date?: string;
}

interface TavilyResponse {
  results: TavilyResult[];
  error?: string;
}

export async function searchWeb(productName: string): Promise<RawResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn("[Sync]   ⚠ TAVILY_API_KEY not set — skipping web search");
    return [];
  }

  const query = `${productName} customer reviews forums feedback`;
  console.log(`[Sync]     [Web] Searching Tavily: "${query}"`);

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: "advanced",
      include_raw_content: true,
      max_results: MAX_RESULTS,
    }),
  });

  if (!res.ok) {
    console.warn(`[Sync]     [Web] Tavily returned ${res.status}`);
    return [];
  }

  const data: TavilyResponse = await res.json();
  if (data.error) {
    console.warn(`[Sync]     [Web] Tavily error: ${data.error}`);
    return [];
  }

  const results = data.results ?? [];
  console.log(`[Sync]     [Web] Tavily returned ${results.length} pages`);

  return results
    .filter((r) => r.score > 0.3)
    .map((r) => {
      const text = r.raw_content
        ? r.raw_content.replace(/\s+/g, " ").trim().slice(0, MAX_CONTENT_CHARS)
        : r.content;

      let domain = r.url;
      try {
        domain = new URL(r.url).hostname.replace(/^www\./, "");
      } catch {
        // keep original url as fallback
      }

      const date = r.published_date
        ? new Date(r.published_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      return {
        source: domain,
        title: r.title,
        text,
        url: r.url,
        date,
        author: domain,
      };
    });
}
