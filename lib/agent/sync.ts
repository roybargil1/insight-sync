import type { SupabaseClient } from "@supabase/supabase-js";
import { searchReddit } from "./sources/reddit";
import { searchAppStore } from "./sources/appstore";
import { searchGooglePlay } from "./sources/googleplay";
import { searchWeb } from "./sources/web";
import { filterWithAI } from "./filter";
import type { RawResult, SyncResult, ProductSyncResult } from "./types";

async function getExistingUrls(supabase: SupabaseClient, productId: string): Promise<Set<string>> {
  const { data } = await supabase
    .from("feedback")
    .select("source_url")
    .eq("product_id", productId)
    .not("source_url", "is", null);
  return new Set((data ?? []).map((r) => (r.source_url as string)).filter(Boolean));
}

async function syncProduct(
  supabase: SupabaseClient,
  product: { id: string; name: string; description: string | null }
): Promise<ProductSyncResult> {
  console.log(`[Sync] ──────────────────────────────────────────────────`);
  console.log(`[Sync] Starting sync for "${product.name}" — Max 5 Tavily results`);
  console.log(`[Sync]   → Fetching from Reddit, App Store, Google Play, Web…`);

  const [redditResults, appStoreResults, googlePlayResults, webResults] =
    await Promise.allSettled([
      searchReddit(product.name),
      searchAppStore(product.name),
      searchGooglePlay(product.name),
      searchWeb(product.name),
    ]);

  const counts = {
    Reddit:        redditResults.status      === "fulfilled" ? redditResults.value.length      : 0,
    "App Store":   appStoreResults.status    === "fulfilled" ? appStoreResults.value.length    : 0,
    "Google Play": googlePlayResults.status  === "fulfilled" ? googlePlayResults.value.length  : 0,
    Web:           webResults.status         === "fulfilled" ? webResults.value.length         : 0,
  };

  if (redditResults.status      === "rejected") console.warn(`[Sync]   ⚠ Reddit failed:`,       redditResults.reason);
  if (appStoreResults.status    === "rejected") console.warn(`[Sync]   ⚠ App Store failed:`,     appStoreResults.reason);
  if (googlePlayResults.status  === "rejected") console.warn(`[Sync]   ⚠ Google Play failed:`,   googlePlayResults.reason);
  if (webResults.status         === "rejected") console.warn(`[Sync]   ⚠ Web search failed:`,    webResults.reason);

  console.log(
    `[Sync]   → "${product.name}" — raw: Reddit=${counts.Reddit}, App Store=${counts["App Store"]}, Google Play=${counts["Google Play"]}, Web=${counts.Web}`
  );

  const allResults: RawResult[] = [
    ...(redditResults.status      === "fulfilled" ? redditResults.value      : []),
    ...(appStoreResults.status    === "fulfilled" ? appStoreResults.value    : []),
    ...(googlePlayResults.status  === "fulfilled" ? googlePlayResults.value  : []),
    ...(webResults.status         === "fulfilled" ? webResults.value         : []),
  ];

  if (!allResults.length) {
    console.log(`[Sync]   → "${product.name}" — no results found, skipping`);
    return { productId: product.id, productName: product.name, found: 0, saved: 0, skipped: 0 };
  }

  console.log(`[Sync]   → "${product.name}" — sending ${allResults.length} items to AI filter…`);
  const relevant = await filterWithAI(product, allResults);
  console.log(`[Sync]   → "${product.name}" — AI kept ${relevant.length} genuine feedback items`);

  const existingUrls = await getExistingUrls(supabase, product.id);
  const toSave = relevant.filter((r) => !existingUrls.has(r.url));
  const skipped = relevant.length - toSave.length;

  if (skipped > 0) {
    console.log(`[Sync]   → "${product.name}" — skipping ${skipped} duplicate(s)`);
  }

  for (const item of toSave) {
    await supabase.from("feedback").insert({
      title: item.cleanTitle,
      raw_text: item.text,
      source: item.source,
      source_type: "External",
      sentiment: item.sentiment,
      date: item.date,
      analyzed: false,
      product_id: product.id,
      source_url: item.url,
    });
  }

  console.log(`[Sync]   ✓ "${product.name}" — saved ${toSave.length} new item(s)`);

  return {
    productId: product.id,
    productName: product.name,
    found: allResults.length,
    saved: toSave.length,
    skipped,
  };
}

export async function runGlobalSync(supabase: SupabaseClient, productId?: string): Promise<SyncResult> {
  let query = supabase
    .from("products")
    .select("id, name, description")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("id", productId);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("[Sync] Failed to fetch products:", error.message);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  if (!products?.length) {
    console.log("[Sync] No products found — nothing to sync");
    return { productsProcessed: 0, totalFound: 0, totalSaved: 0, perProduct: [] };
  }

  console.log(
    `[Sync] Starting sync for ${products.length} product(s): ${products.map((p) => `"${p.name}"`).join(", ")}`
  );

  const perProduct: ProductSyncResult[] = [];
  for (const product of products) {
    const result = await syncProduct(supabase, product);
    perProduct.push(result);
  }

  return {
    productsProcessed: products.length,
    totalFound: perProduct.reduce((s, r) => s + r.found, 0),
    totalSaved: perProduct.reduce((s, r) => s + r.saved, 0),
    perProduct,
  };
}
