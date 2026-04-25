"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Insights } from "@/lib/db";

export const INSIGHTS_QUERY_KEY = ["insights"];

export function useInsights() {
  const qc = useQueryClient();

  useEffect(() => {
    qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
  }, []);

  return useQuery({
    queryKey: INSIGHTS_QUERY_KEY,
    queryFn: () => Insights.list(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always" as const,
    refetchOnWindowFocus: true,
  });
}

export function useInvalidateInsights() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
}
