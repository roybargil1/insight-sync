// Supabase data helpers — replaces base44 entity API
// Uses createBrowserClient so the session cookie is included in every request (RLS works automatically)
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Products ──────────────────────────────────────────────────────────────────

export const Products = {
  list: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  get: async (id: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },
  create: async (payload: { name: string; company?: string; description?: string }) => {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};

// ── Feedback ──────────────────────────────────────────────────────────────────

export const Feedback = {
  list: async (productId?: string | null) => {
    let q = supabase.from("feedback").select("*").order("created_at", { ascending: false });
    if (productId) q = q.eq("product_id", productId);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },
  create: async (payload: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("feedback")
      .insert({ analyzed: false, source_type: "Internal", ...payload })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, payload: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("feedback")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (error) throw error;
  },
};

// ── Insights ──────────────────────────────────────────────────────────────────

export const Insights = {
  list: async () => {
    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .order("severity", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  create: async (payload: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("insights")
      .insert({ occurrence_count: 1, ...payload })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, payload: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("insights")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("insights").delete().eq("id", id);
    if (error) throw error;
  },
};

// ── PRDs ──────────────────────────────────────────────────────────────────────

export const PRDs = {
  list: async () => {
    const { data, error } = await supabase
      .from("prds")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  create: async (payload: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("prds")
      .insert({ status: "Draft", ...payload })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  update: async (id: string, payload: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from("prds")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("prds").delete().eq("id", id);
    if (error) throw error;
  },
};
