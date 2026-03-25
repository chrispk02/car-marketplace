import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from './lib/authService';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import ListingDetail from './pages/ListingDetail';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import CreateListing from './pages/CreateListing';
import SearchResults from './pages/SearchResults';

// Navbar with proper routing and auth
const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black italic tracking-tighter text-primary">
            Precision Curator
          </Link>
          <div className="hidden lg:flex gap-8 items-center font-semibold text-sm">
            <Link to="/" className="text-primary border-b-2 border-primary pb-1">
              Xe Bán
            </Link>
            {isAuthenticated && user?.role === 'SELLER' && (
              <Link to="/my-listings" className="text-on-surface/70 hover:text-primary transition-all duration-300">
                Xe Của Tôi
              </Link>
            )}
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin" className="text-on-surface/70 hover:text-primary transition-all duration-300">
                Quản Lý
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-bold text-gray-600">
                {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 bg-red-500 text-white hover:bg-red-600"
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 text-primary hover:bg-primary/5 border border-primary/10"
              >
                Đăng Nhập
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 bg-primary text-white hover:brightness-110"
              >
                Đăng Ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Footer component moved up
const Footer = () => (
  <footer className="bg-white border-t border-gray-100 w-full pt-32 pb-16 px-6 mt-32">
    <div className="max-w-[1440px] mx-auto text-center md:text-left flex flex-col items-center md:items-start gap-12">
      <Link to="/" className="text-4xl font-black italic tracking-tighter text-primary">
        Precision Curator
      </Link>
      <p className="text-gray-300 text-[10px] uppercase tracking-[0.5em] font-black">
        © 2026 Precision Curator Automotive. All rights reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-on-surface font-sans selection:bg-primary selection:text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listings/:id" element={<ListingDetail />} />

        {/* Seller Routes */}
        <Route
          path="/my-listings"
          element={
            <ProtectedRoute requiredRole="SELLER">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/create"
          element={
            <ProtectedRoute requiredRole="SELLER">
              <CreateListing />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}
