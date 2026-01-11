
import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Search, 
  Filter, 
  LogOut, 
  Smartphone, 
  Hash, 
  Wallet,
  TrendingUp,
  AlertCircle,
  Calendar,
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Package,
  Activity,
  DollarSign,
  Layers,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  History,
  Info
} from 'lucide-react';
import { Order, PaymentMethod, ServicePackage, ServiceCategory, ActivityLog } from '../types';
import { SMM_SERVICES, DESIGN_SERVICES } from '../constants';

interface Props {
  onLogout: () => void;
}

type AdminTab = 'insights' | 'services' | 'orders' | 'logs';

const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('insights');
  const [searchTerm, setSearchTerm] = useState('');
  
  // States for Services Management
  const [allServices, setAllServices] = useState<ServicePackage[]>([...SMM_SERVICES, ...DESIGN_SERVICES]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);

  // Activity Logs state (Simulated)
  const [logs] = useState<ActivityLog[]>([
    { id: '1', action: 'Price Update', adminName: 'Rawshan', timestamp: 'Today, 2:30 PM', details: 'Facebook Followers unit price changed from 75 to 80' },
    { id: '2', action: 'New Service', adminName: 'Rawshan', timestamp: 'Yesterday, 10:15 AM', details: 'Added TikTok No Drop Followers package' },
    { id: '3', action: 'Stock Refill', adminName: 'Rawshan', timestamp: '20 Oct, 4:00 PM', details: 'Refilled Instagram Likes capacity to 500k' },
  ]);

  // Orders State (Simulated)
  const [orders, setOrders] = useState<Order[]>([
    { id: '#VA-99012', date: '22 Oct 2024', total: 2500, status: 'Pending', paymentMethod: PaymentMethod.BKASH, senderNumber: '01712345678', transactionId: '8NJK29LM0', items: [] },
    { id: '#VA-98845', date: '20 Oct 2024', total: 5000, status: 'Completed', paymentMethod: PaymentMethod.NAGAD, senderNumber: '01887654321', transactionId: 'TXN888222', items: [] },
  ]);

  const updateOrderStatus = (id: string, newStatus: 'Completed' | 'Failed') => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const toggleServiceStatus = (id: string) => {
    setAllServices(allServices.map(s => 
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
    ));
  };

  const deleteService = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই সার্ভিসটি মুছে ফেলতে চান?')) {
      setAllServices(allServices.filter(s => s.id !== id));
    }
  };

  const stats = useMemo(() => ({
    totalServices: allServices.length,
    activeServices: allServices.filter(s => s.status === 'Active').length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    revenue: orders.filter(o => o.status === 'Completed').reduce((acc, o) => acc + o.total, 0)
  }), [allServices, orders]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-100">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Control Panel</h1>
            <p className="text-sm text-gray-500 font-medium italic mt-1">Authorized: Rawshan • Role: Super Admin</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'insights' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Activity size={18} /> Insights
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'services' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Layers size={18} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Package size={18} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'logs' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <History size={18} /> Logs
          </button>
          <div className="w-px h-6 bg-gray-100 mx-2"></div>
          <button onClick={onLogout} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition" title="Logout Session">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-indigo-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Layers size={20} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Services</span>
          </div>
          <p className="text-3xl font-black text-gray-900">{stats.totalServices}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-indigo-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
              <Activity size={20} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Now</span>
          </div>
          <p className="text-3xl font-black text-gray-900">{stats.activeServices}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-indigo-200 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
              <Clock size={20} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waiting Action</span>
          </div>
          <p className="text-3xl font-black text-gray-900">{stats.pendingOrders}</p>
        </div>
        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-white/20 text-white rounded-xl flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Net Revenue</span>
          </div>
          <p className="text-3xl font-black tracking-tight">৳{stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content Switcher */}
      {activeTab === 'insights' && (
        <div className="grid lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" size={24} /> Order Performance (7 Days)
            </h3>
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
                <div key={i} className="flex-grow flex flex-col items-center gap-2 group">
                  <div className="w-full bg-indigo-50 rounded-t-2xl group-hover:bg-indigo-600 transition-all duration-500 cursor-pointer relative" style={{ height: `${h}%` }}>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                      ৳{(h * 150).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Smartphone size={22} /> Control Center
            </h3>
            <div className="space-y-4">
              <button onClick={() => { setActiveTab('services'); setIsAddingNew(true); }} className="w-full py-4 bg-white/10 hover:bg-white text-left px-6 rounded-2xl flex items-center justify-between transition-all group">
                <span className="font-bold group-hover:text-indigo-900">নতুন সার্ভিস যোগ করুন</span>
                <Plus size={20} className="group-hover:text-indigo-900" />
              </button>
              <button onClick={() => setActiveTab('orders')} className="w-full py-4 bg-white/10 hover:bg-white text-left px-6 rounded-2xl flex items-center justify-between transition-all group">
                <span className="font-bold group-hover:text-indigo-900">পেমেন্ট ভেরিফাই করুন</span>
                <ArrowRight size={20} className="group-hover:text-indigo-900" />
              </button>
              <div className="p-5 bg-indigo-800/40 rounded-2xl border border-white/10 mt-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">System Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-200"></div>
                  <span className="text-sm font-bold">সার্ভার রানিং (অপটিমাল)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="সার্ভিস খুঁজুন..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsAddingNew(true)}
              className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
            >
              <Plus size={20} /> প্যাকেজ যোগ করুন
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Package</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing Model</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity Limits</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allServices.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((service) => (
                    <tr key={service.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-sm">
                            {service.platform?.[0] || 'S'}
                          </div>
                          <div>
                            <div className="font-black text-gray-900">{service.name}</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">{service.platform} • ID: {service.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${service.category === ServiceCategory.SMM ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {service.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-black text-indigo-600">Base: ৳{service.basePrice}</div>
                          {service.unitPrice > 0 && <div className="text-[10px] text-gray-500 font-bold uppercase">Unit: ৳{service.unitPrice}/1000</div>}
                          {service.discountPercent > 0 && <div className="text-[10px] text-green-600 font-black uppercase">-{service.discountPercent}% Off</div>}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-[10px] text-gray-600 font-bold uppercase space-y-1">
                          <div>Min: {service.minQuantity.toLocaleString()}</div>
                          <div>Max: {service.maxQuantity.toLocaleString()}</div>
                          <div className="flex items-center gap-1 mt-1 text-indigo-600">
                            <Smartphone size={10} /> Stock: {(service.stock / 1000).toFixed(0)}k
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => toggleServiceStatus(service.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${service.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                        >
                          {service.status === 'Active' ? <Eye size={12} /> : <EyeOff size={12} />}
                          {service.status}
                        </button>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingService(service)} className="p-3 bg-white text-gray-500 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-gray-100">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => deleteService(service.id)} className="p-3 bg-white text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-gray-100">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <History className="text-indigo-600" size={24} /> অ্যাক্টিভিটি লগ
            </h3>
            <button className="text-sm font-bold text-gray-400 hover:text-indigo-600 transition">Clear History</button>
          </div>
          <div className="divide-y divide-gray-50">
            {logs.map(log => (
              <div key={log.id} className="p-8 hover:bg-gray-50 transition-colors flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-black text-gray-900">{log.action}</span>
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase">{log.adminName}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{log.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Add/Edit Modal */}
      {(isAddingNew || editingService) && (
        <div className="fixed inset-0 z-[100] bg-gray-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    {editingService ? 'এডিট সার্ভিস প্যাকেজ' : 'নতুন সার্ভিস যোগ করুন'}
                  </h2>
                  <p className="text-sm text-gray-500 font-medium mt-1 italic">রিয়েল-টাইম ক্যালকুলেশন প্রিভিউ এনাবেল্ড</p>
                </div>
                <button onClick={() => { setIsAddingNew(false); setEditingService(null); }} className="p-4 bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all">
                  <XCircle size={24} />
                </button>
              </div>

              <form className="space-y-8">
                {/* Identity & Content */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Package Name</label>
                    <input type="text" placeholder="উদা: ফেসবুক হাই কোয়ালিটি ফলোয়ার" defaultValue={editingService?.name} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Platform & Category</label>
                    <div className="flex gap-4">
                      <select defaultValue={editingService?.category} className="flex-grow px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-900 appearance-none">
                        <option value={ServiceCategory.SMM}>SMM</option>
                        <option value={ServiceCategory.GRAPHICS}>Graphics</option>
                      </select>
                      <select defaultValue={editingService?.platform} className="flex-grow px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-900 appearance-none">
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>Design</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Advanced Pricing Engine UI */}
                <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100">
                  <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <DollarSign size={18} /> Pricing & Formula Configuration
                  </h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Base Price (৳)</label>
                      <input type="number" defaultValue={editingService?.basePrice || 0} placeholder="0.00" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-black text-indigo-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Unit Price /1k (৳)</label>
                      <input type="number" defaultValue={editingService?.unitPrice || 0} placeholder="0.00" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-black text-indigo-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Discount (%)</label>
                      <input type="number" defaultValue={editingService?.discountPercent || 0} placeholder="0" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-black text-green-600" />
                    </div>
                  </div>
                  {/* Calculation Preview Banner */}
                  <div className="mt-6 p-4 bg-white rounded-2xl border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                        <Info size={16} />
                      </div>
                      <span className="text-xs font-bold text-gray-600">Total Price for 1000 units:</span>
                    </div>
                    <span className="text-xl font-black text-indigo-600">৳{(editingService ? (editingService.basePrice + (editingService.unitPrice * (1000/1000))) * (1 - editingService.discountPercent/100) : 0).toFixed(0)}</span>
                  </div>
                </div>

                {/* Limits & Capacity */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Min Quantity</label>
                    <input type="number" defaultValue={editingService?.minQuantity || 1000} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Max Quantity</label>
                    <input type="number" defaultValue={editingService?.maxQuantity || 50000} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Stock Capacity</label>
                    <input type="number" defaultValue={editingService?.stock || 100000} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-600" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Service Details & Description</label>
                  <textarea placeholder="সার্ভিস সম্পর্কে বিস্তারিত লিখুন..." defaultValue={editingService?.description} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium h-40 resize-none"></textarea>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => { setIsAddingNew(false); setEditingService(null); }} className="flex-1 py-5 bg-gray-100 text-gray-600 font-black rounded-[1.5rem] hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">
                    ডিসকার্ড
                  </button>
                  <button type="button" onClick={() => { setIsAddingNew(false); setEditingService(null); }} className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs">
                    {editingService ? 'পরিবর্তন সেভ করুন' : 'পাবলিশ সার্ভিস প্যাকেজ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
