import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { runGlobalSync } from "@/lib/agent/sync";

export const maxDuration = 300;

export async function POST(req: Request) {
  console.log("[Sync] ▶ POST /api/agent/sync — request received");
  const startMs = Date.now();

  let productId: string | undefined;
  try {
    const body = await req.json();
    productId = body?.productId ?? undefined;
  } catch {
    // no body is fine — will sync all products
  }

  // Build an authenticated server client so RLS filters by the current user
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.warn("[Sync] ✗ Unauthorized — no active session");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`[Sync]   Authenticated as ${user.email}`);

  try {
    if (productId) {
      console.log(`[Sync]   Scoped to product: ${productId}`);
    }
    const result = await runGlobalSync(supabase, productId);
    const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
    console.log(
      `[Sync] ✓ Complete in ${elapsed}s — ${result.totalSaved} saved across ${result.productsProcessed} product(s)`
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sync failed";
    console.error("[Sync] ✗ Fatal error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
