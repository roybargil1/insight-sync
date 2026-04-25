import type { RawResult } from "../types";

interface GooglePlayModule {
  search: (opts: { term: string; num: number; lang: string; country: string }) => Promise<
    Array<{ appId: string; title: string }>
  >;
  reviews: (opts: { appId: string; sort: number; num: number; lang: string; country: string }) => Promise<{
    data: Array<{
      userName: string;
      score: number;
      title: string | null;
      text: string;
      date: Date | string;
      version: string;
      url: string;
    }>;
  }>;
  sort: { NEWEST: number };
}

let _gplay: GooglePlayModule | null = null;
function getGPlay(): GooglePlayModule {
  if (!_gplay) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _gplay = require("google-play-scraper") as GooglePlayModule;
  }
  return _gplay;
}

export async function searchGooglePlay(productName: string): Promise<RawResult[]> {
  try {
    const gplay = getGPlay();
    const apps = await gplay.search({ term: productName, num: 3, lang: "en", country: "us" });
    if (!apps.length) return [];

    const results: RawResult[] = [];
    for (const app of apps.slice(0, 1)) {
      const { data: reviews } = await gplay.reviews({
        appId: app.appId,
        sort: gplay.sort.NEWEST,
        num: 10,
        lang: "en",
        country: "us",
      });
      for (const r of reviews) {
        const dateStr =
          r.date instanceof Date
            ? r.date.toISOString().split("T")[0]
            : new Date(r.date).toISOString().split("T")[0];
        results.push({
          source: "Google Play",
          title: r.title || `${r.score}-star review`,
          text: r.text,
          url: r.url || `https://play.google.com/store/apps/details?id=${app.appId}`,
          date: dateStr,
          rating: r.score,
          author: r.userName,
        });
      }
    }
    return results;
  } catch {
    return [];
  }
}
