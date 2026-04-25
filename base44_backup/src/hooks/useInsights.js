import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// Shared query key used by ALL pages — ensures a single source of truth
export const INSIGHTS_QUERY_KEY = ['insights'];

export function useInsights() {
  const qc = useQueryClient();

  // Invalidate on every mount so navigating to any page always triggers a fresh fetch
  useEffect(() => {
    qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
  }, []);

  return useQuery({
    queryKey: INSIGHTS_QUERY_KEY,
    queryFn: async () => {
      const user = await base44.auth.me();
      const result = await base44.entities.Insight.filter({ created_by: user.email }, '-severity');
      // Double-filter client-side to guarantee no cross-user leakage
      return Array.isArray(result)
        ? result.filter(i => i.created_by === user.email)
        : [];
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useInvalidateInsights() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
}
