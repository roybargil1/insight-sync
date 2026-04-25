import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart3, FileText, Zap, Package, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';
import ProductSelector from '@/components/layout/ProductSelector';

const navItems = [
  { label: 'Feedback Library', path: '/feedback', icon: MessageSquare },
  { label: 'Insight Dashboard', path: '/insights', icon: BarChart3 },
  { label: 'PRD Factory', path: '/prd', icon: FileText },
  { label: 'My Products', path: '/products', icon: Package },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen flex flex-col shrink-0" style={{ background: 'linear-gradient(180deg, #0d1528 0%, #111827 100%)' }}>
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

      {/* Product Selector — prominently below logo */}
      <ProductSelector />

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 px-3 mb-3">Workspace</p>
        {navItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path || (path === '/feedback' && location.pathname === '/');
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-sidebar-foreground hover:bg-white/8 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        {user && (
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">{user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.full_name || user.email}</p>
              {user.full_name && <p className="text-white/40 text-xs truncate">{user.email}</p>}
            </div>
          </div>
        )}
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}