import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

/**
 * MainLayout — wraps every page with Navbar + Footer.
 *
 * Why a layout? Instead of importing Navbar and Footer in every single page,
 * we define them once here. React Router's <Outlet> renders the current page
 * inside this layout. This is the "house frame" — all rooms (pages) share it.
 */
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-black">
      <Navbar />
      {/* <Outlet> is where the current page (Home, Search, etc.) renders */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
