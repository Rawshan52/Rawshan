
import React from 'react';
import { Package, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const orders = [
    { id: '#VA-99012', date: '20 Oct 2024', total: '৳2500', status: 'Processing', service: 'Facebook Followers' },
    { id: '#VA-98845', date: '15 Oct 2024', total: '৳5000', status: 'Completed', service: 'Standard Logo Branding' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-full">2 Active Orders</div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {order.status === 'Completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{order.service} • {order.date}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Amount Paid</p>
                  <p className="text-xl font-bold text-gray-900">{order.total}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <ChevronRight />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Last updated: Today at 2:30 PM</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 rounded-3xl bg-indigo-600 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Need help with an order?</h2>
          <p className="mb-8 opacity-90 max-w-lg">Our support team is available 24/7 to assist with your SMM or Graphics service needs.</p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition">
            Contact Support
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default OrderTracking;
