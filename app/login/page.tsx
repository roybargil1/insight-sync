"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/AuthContext";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleGuestLogin = async () => {
    setError(null);
    setGuestLoading(true);
    const { error } = await browserSupabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
      password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
    });
    if (error) {
      setError("Guest login unavailable: " + error.message);
      setGuestLoading(false);
    } else {
      router.push("/feedback");
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    if (mode === "signin") {
      const { error } = await browserSupabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/feedback");
        router.refresh();
      }
    } else {
      const { data, error } = await browserSupabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.session) {
        router.push("/feedback");
        router.refresh();
      } else {
        setNotice("Account created! Check your email for a confirmation link.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-lg text-slate-900 leading-tight">InsightSync</p>
            <p className="text-xs font-semibold text-blue-600 leading-tight">AI</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-xl font-bold text-slate-900 mb-1">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            {mode === "signin"
              ? "Sign in to your InsightSync workspace"
              : "Start collecting and analyzing product feedback"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                {error}
              </div>
            )}

            {notice && (
              <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                {notice}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || guestLoading}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white rounded-lg transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" }}
            >
              {loading
                ? mode === "signin" ? "Signing in…" : "Creating account…"
                : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={guestLoading || loading}
            className="w-full py-2.5 px-4 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {guestLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Logging in…
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                View Demo (Guest Access)
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">No account needed — explore with sample data</p>
        </div>

        {/* Toggle */}
        <p className="text-center text-sm text-slate-500 mt-4">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setNotice(null); }}
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
