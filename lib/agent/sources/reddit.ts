import type { RawResult } from "../types";

const USER_AGENT = "InsightSyncAI/1.0 (feedback aggregator)";
const SEARCH_LIMIT = 10;

interface RedditPost {
  data: {
    title: string;
    selftext: string;
    permalink: string;
    created_utc: number;
    author: string;
    score: number;
  };
}

interface RedditSearchResponse {
  data: {
    children: RedditPost[];
  };
}

export async function searchReddit(productName: string): Promise<RawResult[]> {
  const query = encodeURIComponent(`"${productName}"`);
  const url = `https://www.reddit.com/search.json?q=${query}&sort=new&limit=${SEARCH_LIMIT}&type=link&restrict_sr=false`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as RedditSearchResponse;
  const posts = json?.data?.children ?? [];

  return posts.map((post) => ({
    source: "Reddit" as const,
    title: post.data.title,
    text: post.data.selftext || post.data.title,
    url: `https://reddit.com${post.data.permalink}`,
    date: new Date(post.data.created_utc * 1000).toISOString().split("T")[0],
    author: post.data.author,
  }));
}
