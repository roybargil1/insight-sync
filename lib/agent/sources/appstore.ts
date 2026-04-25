import type { RawResult } from "../types";

interface AppStoreModule {
  search: (opts: { term: string; limit: number; country: string }) => Promise<
    Array<{ id: string; title: string }>
  >;
  reviews: (opts: { id: string; sort: number; page: number; country: string }) => Promise<
    Array<{ userName: string; score: number; title: string; text: string; updated: string | Date }>
  >;
  sort: { RECENT: number };
}

let _store: AppStoreModule | null = null;
function getStore(): AppStoreModule {
  if (!_store) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _store = require("app-store-scraper") as AppStoreModule;
  }
  return _store;
}

export async function searchAppStore(productName: string): Promise<RawResult[]> {
  try {
    const store = getStore();
    const apps = await store.search({ term: productName, limit: 3, country: "us" });
    if (!apps.length) return [];

    const results: RawResult[] = [];
    for (const app of apps.slice(0, 2)) {
      const reviews = await store.reviews({
        id: app.id,
        sort: store.sort.RECENT,
        page: 1,
        country: "us",
      });
      for (const r of reviews) {
        const dateStr =
          r.updated instanceof Date
            ? r.updated.toISOString().split("T")[0]
            : new Date(r.updated).toISOString().split("T")[0];
        results.push({
          source: "App Store",
          title: r.title || `${r.score}-star review`,
          text: r.text,
          url: `https://apps.apple.com/app/id${app.id}`,
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
