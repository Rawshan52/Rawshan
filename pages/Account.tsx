
import React, { useState } from 'react';
import { User, Package, Settings, LogOut, Mail, Calendar, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  const mockUser = {
    name: "Arif Hossain",
    email: "arif.hossain@example.com",
    joinedDate: "12 March 2024",
    location: "Dhaka, Bangladesh",
    ordersCount: 12
  };

  const orders = [
    { id: '#VA-99012', date: '20 Oct 2024', total: '৳2,500', status: 'Processing', service: 'Facebook Followers (Ultra Cheap)' },
    { id: '#VA-98845', date: '15 Oct 2024', total: '৳5,000', status: 'Completed', service: 'Standard Logo Branding' },
    { id: '#VA-97210', date: '02 Oct 2024', total: '৳170', status: 'Completed', service: 'TikTok Followers (0% Drop)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                <User size={40} />
              </div>
              <h3 className="font-bold text-gray-900">{mockUser.name}</h3>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Verified Client</p>
            </div>
            <nav className="p-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User size={18} />
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Package size={18} />
                <span>Order History</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition">
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <div className="border-t border-gray-100 my-2"></div>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {activeTab === 'profile' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold mb-8">Profile Information</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                        <p className="text-gray-900 font-medium">{mockUser.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                        <p className="text-gray-900 font-medium">{mockUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Member Since</p>
                        <p className="text-gray-900 font-medium">{mockUser.joinedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                        <p className="text-gray-900 font-medium">{mockUser.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md">
                    Update Profile
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <ShieldCheck size={32} />
                      <span className="text-2xl font-bold">VIP</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Account Status</h4>
                    <p className="text-indigo-100 text-sm">Your account is in good standing. You have completed {mockUser.ordersCount} successful projects.</p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center">
                  <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Total Spent</h4>
                  <div className="text-4xl font-extrabold text-gray-900">৳14,580</div>
                  <p className="text-xs text-green-600 font-bold mt-2">↑ 12% from last month</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Order History</h2>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">{orders.length} Total Orders</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                          {order.status === 'Completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900">{order.id}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{order.service}</p>
                          <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto">
                        <p className="text-xl font-bold text-gray-900">{order.total}</p>
                        <button className="text-xs text-indigo-600 font-bold hover:underline">View Invoice</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-gray-100 rounded-3xl text-center">
                <p className="text-gray-500 text-sm mb-4">Need help with an existing order?</p>
                <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition">
                  Contact Support
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
