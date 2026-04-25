import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { product_name, goal, target_audience, insightsSummary } = await req.json();

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a senior Product Manager. Generate a comprehensive PRD for the following product based on user insights.

Product: ${product_name}
Goal: ${goal || "Not specified"}
Target Audience: ${target_audience || "Not specified"}

User Insights:
${insightsSummary}

Return a JSON object with ONLY these fields (no markdown, no extra text):
{
  "executive_summary": "<2-3 sentence high-level summary>",
  "problem_statement": "<clear articulation of the problem, 2-3 sentences>",
  "proposed_solution": "<detailed proposed solution, 3-4 sentences>",
  "user_stories": "<3-5 user stories in format 'As a [user], I want to [action], so that [benefit].' — each on a new line>",
  "success_metrics": "<4-5 measurable KPIs, each on a new line starting with '•'>"
}

Write in a professional, concise PM style.`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "{}";

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);

  return NextResponse.json(result);
}
