
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  User,
  LayoutDashboard,
  Lock,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

import Home from './pages/Home';
import SMMStore from './pages/SMMStore';
import DesignStore from './pages/DesignStore';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

import { CartItem } from './types';

const Navbar = ({ cartCount, isAdmin, isUserLoggedIn, onLogout }: { cartCount: number, isAdmin: boolean, isUserLoggedIn: boolean, onLogout: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">V</div>
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">View Agency</span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-semibold transition">Home</Link>
            <Link to="/smm" className="text-gray-600 hover:text-indigo-600 font-semibold transition">SMM</Link>
            <Link to="/design" className="text-gray-600 hover:text-indigo-600 font-semibold transition">Design</Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Admin Unlock Button */}
            <Link 
              to={isAdmin ? "/admin-dashboard" : "/admin-login"} 
              className={`p-2.5 rounded-xl transition flex items-center gap-2 ${
                isAdmin 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {isAdmin ? <ShieldCheck size={22} /> : <ShieldAlert size={22} />}
            </Link>

            <Link to={isUserLoggedIn ? "/account" : "/login"} className="p-2.5 text-gray-500 hover:text-indigo-600 transition bg-gray-50 rounded-xl" title="My Account">
              <User size={22} />
            </Link>

            <Link to="/checkout" className="relative p-2.5 text-gray-500 hover:text-indigo-600 transition bg-gray-50 rounded-xl">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold ring-4 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {(isAdmin || isUserLoggedIn) && (
              <button 
                onClick={onLogout} 
                className="p-2.5 text-red-500 hover:bg-red-50 transition rounded-xl flex items-center gap-2 group" 
                title="Logout"
              >
                <LogOut size={22} className="group-hover:translate-x-0.5 transition-transform" />
                <span className="hidden lg:inline text-xs font-bold uppercase tracking-widest">লগআউট</span>
              </button>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 animate-in slide-in-from-top-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 font-bold">Home</Link>
          <Link to="/smm" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 font-bold">SMM Services</Link>
          <Link to="/design" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 font-bold">Design Store</Link>
          {isAdmin && (
            <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-indigo-600 font-bold">Admin Dashboard</Link>
          )}
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem('va_admin_session') === 'true');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(() => localStorage.getItem('va_user_token') === 'true');

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const clearCart = () => setCart([]);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('va_admin_session', 'true');
  };

  const handleUserLogin = () => {
    setIsUserLoggedIn(true);
    localStorage.setItem('va_user_token', 'true');
  };

  const handleLogout = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?')) {
      setIsAdmin(false);
      setIsUserLoggedIn(false);
      localStorage.removeItem('va_admin_session');
      localStorage.removeItem('va_user_token');
      // Force redirect to login for user or home for admin
      window.location.hash = '/login';
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar cartCount={cart.length} isAdmin={isAdmin} isUserLoggedIn={isUserLoggedIn} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isAdmin={isAdmin} />} />
            <Route path="/smm" element={<SMMStore addToCart={addToCart} />} />
            <Route path="/design" element={<DesignStore addToCart={addToCart} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            
            {/* User Auth Routes */}
            <Route path="/login" element={isUserLoggedIn ? <Navigate to="/account" /> : <Login onLogin={handleUserLogin} />} />
            <Route path="/account" element={isUserLoggedIn ? <Account /> : <Navigate to="/login" />} />
            
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin-login" element={isAdmin ? <Navigate to="/admin-dashboard" /> : <AdminLogin onLogin={handleAdminLogin} />} />
            <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin-login" />} />
          </Routes>
        </main>

        <footer className="bg-white py-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">V</div>
              <span className="font-bold text-gray-900">View Agency</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-500 font-medium">
              <Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link>
              <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link>
              <Link to="/contact" className="hover:text-indigo-600 transition">Support</Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">© 2024 View Agency.</span>
              <Link to="/admin-login" className="p-1 opacity-0 hover:opacity-10 transition">
                <Lock size={10} />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
