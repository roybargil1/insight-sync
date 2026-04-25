import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      feedback: {
        Row: {
          id: string;
          title: string;
          source: string | null;
          source_type: "Internal" | "External";
          raw_text: string;
          sentiment: "Positive" | "Negative" | "Neutral" | "Mixed" | null;
          date: string | null;
          analyzed: boolean;
          product_id: string | null;
          confidence_score: string | null;
          source_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["feedback"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["feedback"]["Insert"]>;
      };
      insights: {
        Row: {
          id: string;
          name: string;
          category: "Feature Request" | "Bug" | "UI/UX" | "Positive";
          severity: number | null;
          description: string | null;
          related_feedback_id: string | null;
          related_feedback_title: string | null;
          product_id: string | null;
          occurrence_count: number;
          source_type: "Internal" | "External" | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["insights"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["insights"]["Insert"]>;
      };
      prds: {
        Row: {
          id: string;
          product_name: string;
          goal: string | null;
          target_audience: string | null;
          executive_summary: string | null;
          problem_statement: string | null;
          proposed_solution: string | null;
          user_stories: string | null;
          success_metrics: string | null;
          selected_insight_ids: string | null;
          status: "Draft" | "In Review" | "Approved" | "Archived";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["prds"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["prds"]["Insert"]>;
      };
    };
  };
};
