import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ToolDetailPage from '../pages/ToolDetailPage';
import CategoriesPage from '../pages/CategoriesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * AppRoutes — single source of truth for all URL routes.
 *
 * Pattern used: Nested routes where MainLayout is the parent
 * and all pages are children rendered inside its <Outlet>.
 * This means Navbar + Footer automatically wrap every page.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* All routes that use the Navbar+Footer layout */}
      <Route element={<MainLayout />}>
        <Route path="/"               element={<HomePage />} />
        <Route path="/search"         element={<SearchPage />} />
        <Route path="/tools/:slug"    element={<ToolDetailPage />} />
        <Route path="/categories"     element={<CategoriesPage />} />
      </Route>

      {/* Auth pages — no Navbar/Footer (full-screen forms) */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
