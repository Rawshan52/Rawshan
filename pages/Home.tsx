
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, ArrowRight, Smartphone, MessageSquare, ExternalLink, LayoutDashboard } from 'lucide-react';

interface Props {
  isAdmin: boolean;
}

const Home: React.FC<Props> = ({ isAdmin }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-12 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[100px] opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isAdmin && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold mb-8 animate-bounce shadow-lg">
              <Shield size={14} />
              ADMIN MODE ACTIVE
            </div>
          )}
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Scale Your Business with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Expert Solutions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed font-medium">
            Professional SMM Growth & Graphics Design tailored for ambitious Bangladeshi brands. 
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <Link to="/smm" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition transform hover:-translate-y-1">
              Start SMM Growth
            </Link>
            <Link to="/design" className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-md border border-gray-100 hover:bg-gray-50 transition transform hover:-translate-y-1">
              Hire a Designer
            </Link>
          </div>

          {/* Quick Payment Info Card */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">bKash Personal</h4>
              <p className="text-2xl font-black text-gray-900 tracking-tight">01302309006</p>
              <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Available 24/7</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Nagad Personal</h4>
              <p className="text-2xl font-black text-gray-900 tracking-tight">01302309006</p>
              <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Available 24/7</p>
            </div>
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">Instant Support</h4>
                <p className="text-sm text-indigo-100 mb-6">Chat with our experts on WhatsApp for custom orders.</p>
                <a href="https://wa.me/8801302309006" target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 rounded-xl font-bold text-sm group-hover:bg-indigo-50 transition">
                  <MessageSquare size={16} /> Open Chat
                </a>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Quick Access Bar (Only if Admin) */}
      {isAdmin && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-indigo-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-indigo-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                <Shield size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Administrative Dashboard</h3>
                <p className="text-indigo-200">You have <span className="text-white font-bold underline">3 pending</span> payment verifications.</p>
              </div>
            </div>
            <Link to="/admin-dashboard" className="w-full md:w-auto px-10 py-4 bg-white text-indigo-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-xl">
              <LayoutDashboard size={20} /> Open Payment Control
            </Link>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Core Solutions</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* SMM Card */}
          <div className="group relative bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="mb-8 w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">S</div>
            <h3 className="text-3xl font-black mb-4">Social Media Marketing</h3>
            <p className="text-gray-600 mb-8 text-lg">High-speed engagement for Facebook, Instagram, and TikTok profiles.</p>
            <ul className="space-y-4 mb-12">
              {['BD Followers (Ultra Cheap)', 'Post Reactions & Likes', 'Watch Time & Views', 'Custom BD Comments'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-gray-700 font-medium">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/smm" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 text-indigo-600 font-bold rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
              Browse Packages <ArrowRight size={20} />
            </Link>
          </div>

          {/* Graphics Card */}
          <div className="group relative bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="mb-8 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">G</div>
            <h3 className="text-3xl font-black mb-4">Branding & Logo Design</h3>
            <p className="text-gray-600 mb-8 text-lg">Unique visual identity that sets your brand apart from the competition.</p>
            <ul className="space-y-4 mb-12">
              {['Custom Concept Creation', 'Vector Source Files', 'Social Media Branding Kits', 'Unlimited Revisions'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-gray-700 font-medium">
                  <CheckCircle size={20} className="text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/design" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 text-blue-600 font-bold rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              View Design Packs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-60">
          <div className="flex flex-col items-center gap-3">
            <Zap size={32} className="text-indigo-600" />
            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Instant Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Shield size={32} className="text-indigo-600" />
            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CheckCircle size={32} className="text-indigo-600" />
            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">24/7 Support</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ExternalLink size={32} className="text-indigo-600" />
            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Lifetime Guarantee</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
