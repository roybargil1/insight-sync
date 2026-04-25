export type FeedbackSource = string;
export type Sentiment = "Positive" | "Negative" | "Neutral" | "Mixed";

export interface RawResult {
  source: FeedbackSource;
  title: string;
  text: string;
  url: string;
  date: string;
  rating?: number;
  author?: string;
}

export interface FilteredResult extends RawResult {
  sentiment: Sentiment;
  cleanTitle: string;
}

export interface ProductSyncResult {
  productId: string;
  productName: string;
  found: number;
  saved: number;
  skipped: number;
}

export interface SyncResult {
  productsProcessed: number;
  totalFound: number;
  totalSaved: number;
  perProduct: ProductSyncResult[];
}
