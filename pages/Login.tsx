
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Chrome, AlertCircle, ArrowRight, User, ShieldCheck } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError('পাসওয়ার্ড ম্যাচ করছে না!');
          setLoading(false);
          return;
        }
        // Simulated success for sign up
        alert('অ্যাকাউন্ট তৈরি সফল হয়েছে! এখন লগইন করুন।');
        setIsSignUp(false);
        setLoading(false);
      } else {
        // Simulated check for sign in
        if (formData.email === 'user@example.com' && formData.password === 'password123') {
          onLogin();
        } else {
          setError('ভুল ইমেইল অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।');
          setLoading(false);
        }
      }
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // Google OAuth simulation
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-gray-50/30">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-100/20">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-xl shadow-indigo-100">V</div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              {isSignUp ? 'নতুন অ্যাকাউন্ট' : 'স্বাগতম ফিরে আসার জন্য!'}
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              {isSignUp ? 'আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন' : 'আপনার অ্যাকাউন্টে লগইন করুন'}
            </p>
          </div>

          {/* Google Button */}
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] mb-8 group"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="bg-white px-4 text-gray-400">অথবা ইমেইল দিয়ে</span>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Arif Hossain"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                {!isSignUp && <Link to="/contact" className="text-xs font-bold text-indigo-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</Link>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Confirm Password</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-white transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-2 ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>{isSignUp ? 'অ্যাকাউন্ট তৈরি করুন' : 'সাইন ইন করুন'} <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              {isSignUp ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'অ্যাকাউন্ট নেই?'} {' '}
              <button 
                onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                className="text-indigo-600 font-bold hover:underline"
              >
                {isSignUp ? 'লগইন করুন' : 'একটি নতুন অ্যাকাউন্ট তৈরি করুন'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-400 font-medium">
          লগইন করতে সমস্যা হচ্ছে? <Link to="/contact" className="text-gray-600 underline">সহায়তা নিন</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
