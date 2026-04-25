import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from '@/components/layout/AppLayout';
import FeedbackLibrary from '@/pages/FeedbackLibrary';
import InsightDashboard from '@/pages/InsightDashboard';
import PRDFactory from '@/pages/PRDFactory';
import Products from '@/pages/Products';
import Demo from '@/pages/Demo';
import ProductFeedback from '@/pages/ProductFeedback';
import { Toaster as SonnerToaster } from 'sonner';
import { ProductProvider } from '@/lib/ProductContext';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
  if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
  else if (authError.type === 'auth_required') {
    navigateToLogin();
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Redirecting to login…</p>
        <a href="/demo" className="text-sm text-primary underline underline-offset-2 font-medium">
          👀 View Live Demo instead
        </a>
      </div>
    );
  }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/feedback" replace />} />
        <Route path="/feedback" element={<FeedbackLibrary />} />
        <Route path="/insights" element={<InsightDashboard />} />
        <Route path="/prd" element={<PRDFactory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/feedback/:productId" element={<ProductFeedback />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ProductProvider>
        <Router>
          <Routes>
            <Route path="/demo" element={<Demo />} />
            <Route path="*" element={<AuthenticatedApp />} />
          </Routes>
        </Router>
        <Toaster />
        <SonnerToaster position="top-right" richColors />
        </ProductProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;