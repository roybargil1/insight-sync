"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, BarChart3, FileText, Zap, Package, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductSelector from "@/components/layout/ProductSelector";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { label: "Feedback Library", path: "/feedback", icon: MessageSquare },
  { label: "Insight Dashboard", path: "/insights", icon: BarChart3 },
  { label: "PRD Factory", path: "/prd", icon: FileText },
  { label: "My Products", path: "/products", icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className="w-64 min-h-screen flex flex-col shrink-0"
      style={{ background: "linear-gradient(180deg, #0d1528 0%, #111827 100%)" }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">InsightSync</p>
            <p className="text-primary text-xs font-medium">AI</p>
          </div>
        </div>
      </div>

      {/* Product Selector */}
      <ProductSelector />

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 px-3 mb-3">
          Workspace
        </p>
        {navItems.map(({ label, path, icon: Icon }) => {
          const active =
            pathname === path ||
            (path === "/feedback" && pathname === "/") ||
            (path !== "/feedback" && pathname.startsWith(path));
          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-sidebar-foreground hover:bg-white/[0.08] hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        {user && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs text-white/40 font-medium truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:bg-white/[0.08] hover:text-white transition-all duration-150"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
