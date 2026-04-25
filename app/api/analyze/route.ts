import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { title, raw_text, existingSummary } = await req.json();

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a senior product analyst. Analyze the following user feedback.

Feedback title: "${title}"
Feedback text: "${raw_text}"

Existing insights already in the system:
${existingSummary || "None"}

Return a JSON object with ONLY these fields (no markdown, no extra text):
{
  "sentiment": "Positive" | "Negative" | "Neutral" | "Mixed",
  "insight_name": "<concise insight title, max 8 words>",
  "insight_category": "Feature Request" | "Bug" | "UI/UX" | "Positive",
  "insight_severity": <integer 1-5>,
  "insight_description": "<1-2 sentence summary>",
  "matching_insight_id": "<existing insight ID if this clearly relates to one, otherwise null>"
}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "{}";

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);

  return NextResponse.json(result);
}
