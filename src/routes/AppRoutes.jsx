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

// ── 2. SUSPENSE FALLBACK ──
// Retains UX integrity while Webpack fetches chunked files
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-[#00FFA3]">
    <div className="animate-spin h-12 w-12 border-4 border-current border-t-transparent rounded-full mb-4 shadow-[0_0_15px_#00FFA3]" />
    <span className="font-mono text-xl tracking-widest uppercase">Initializing Node...</span>
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
