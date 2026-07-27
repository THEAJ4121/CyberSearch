import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// ── 1. ROUTE LEVEL CODE SPLITTING ──
// Defers loading JS components until effectively routed, slashing initial Load Time Time-to-Interactive (TTI)
const HomePage = lazy(() => import('../pages/HomePage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const ToolDetailPage = lazy(() => import('../pages/ToolDetailPage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary">
    <div className="animate-spin h-10 w-10 border-4 border-current border-t-transparent rounded-full mb-4 opacity-80" />
    <span className="font-medium text-sm tracking-widest uppercase text-text-muted">Loading Application...</span>
  </div>
);

/**
 * AppRoutes — High-Performance routing hub.
 */
function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/search"         element={<SearchPage />} />
          <Route path="/tools/:slug"    element={<ToolDetailPage />} />
          <Route path="/categories"     element={<CategoriesPage />} />
        </Route>
        
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
