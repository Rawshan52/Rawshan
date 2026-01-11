
import React, { useState, useMemo } from 'react';
import { SMM_SERVICES } from '../constants';
import { CartItem } from '../types';
// Added ShieldCheck to the import list from lucide-react
import { Check, Info, Filter, ArrowUpDown, AlertCircle, ShoppingCart, Zap, DollarSign, ShieldCheck } from 'lucide-react';

interface Props {
  addToCart: (item: CartItem) => void;
}

const SMMStore: React.FC<Props> = ({ addToCart }) => {
  const [selectedId, setSelectedId] = useState(SMM_SERVICES[0].id);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(1000);
  const [notes, setNotes] = useState('');
  const [quantityError, setQuantityError] = useState<string | null>(null);
  
  // Filter and Sort states
  const [platformFilter, setPlatformFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'default' | 'low-high' | 'high-low'>('default');

  const platforms = ['All', 'Facebook', 'Instagram', 'TikTok', 'YouTube'];

  const filteredAndSortedServices = useMemo(() => {
    let result = [...SMM_SERVICES];
    if (platformFilter !== 'All') result = result.filter(s => s.platform === platformFilter);
    if (sortOrder === 'low-high') result.sort((a, b) => a.basePrice - b.basePrice);
    else if (sortOrder === 'high-low') result.sort((a, b) => b.basePrice - a.basePrice);
    return result;
  }, [platformFilter, sortOrder]);

  const selectedPackage = SMM_SERVICES.find(s => s.id === selectedId) || filteredAndSortedServices[0];

  const validateQuantity = (val: number) => {
    if (!selectedPackage) return true;
    if (val < selectedPackage.minQuantity) {
      setQuantityError(`Minimum quantity is ${selectedPackage.minQuantity.toLocaleString()}`);
      return false;
    }
    if (val > selectedPackage.maxQuantity) {
      setQuantityError(`Maximum quantity is ${selectedPackage.maxQuantity.toLocaleString()}`);
      return false;
    }
    setQuantityError(null);
    return true;
  };

  const calculateTotalPrice = (pkg: typeof selectedPackage, qty: number) => {
    if (!pkg) return 0;
    const baseTotal = pkg.basePrice + (pkg.unitPrice * (qty / 1000));
    const discounted = baseTotal * (1 - pkg.discountPercent / 100);
    return discounted;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setQuantity(val);
    validateQuantity(val);
  };

  const handleAddToCart = () => {
    if (!selectedPackage) return;
    if (!link) { alert("Target URL টি প্রদান করুন!"); return; }
    if (!validateQuantity(quantity)) return;
    
    addToCart({
      packageId: selectedPackage.id,
      name: selectedPackage.name,
      price: calculateTotalPrice(selectedPackage, quantity),
      targetLink: link,
      quantity,
      notes
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-100">
          <Zap size={14} className="animate-pulse" /> SMM Growth Engine
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Social Media Solutions</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">আপনার প্রোফাইল গ্রোথের জন্য প্রিমিয়াম কোয়ালিটি সার্ভিস বেছে নিন।</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <Filter size={20} className="text-indigo-600" />
              <div className="flex flex-wrap gap-2">
                {platforms.map(p => (
                  <button key={p} onClick={() => setPlatformFilter(p)} className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${platformFilter === p ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
              <ArrowUpDown size={18} className="text-gray-400" />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                <option value="default">Sort: Recommended</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {filteredAndSortedServices.map((pkg) => (
              <button key={pkg.id} onClick={() => setSelectedId(pkg.id)} className={`group p-8 text-left rounded-[2.5rem] border-2 transition-all relative overflow-hidden ${selectedId === pkg.id ? 'border-indigo-600 bg-indigo-50/50 shadow-xl shadow-indigo-100' : 'border-gray-100 bg-white hover:border-indigo-200 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${selectedId === pkg.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {pkg.platform}
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-black text-indigo-600">৳{pkg.basePrice} <span className="text-[10px] text-gray-400 uppercase">Starting</span></div>
                    {pkg.discountPercent > 0 && <span className="text-[10px] text-green-600 font-black uppercase">Save {pkg.discountPercent}%</span>}
                  </div>
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-3 leading-tight">{pkg.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 font-medium mb-6">{pkg.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.features.slice(0, 2).map((f, i) => (
                    <span key={i} className="text-[10px] font-bold text-indigo-400 uppercase bg-white px-2 py-1 rounded-md border border-indigo-50">{f}</span>
                  ))}
                </div>
                {selectedId === pkg.id && <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600 rounded-bl-[2.5rem] flex items-center justify-center text-white"><Check size={20} /></div>}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-indigo-100/20 sticky top-24">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <ShoppingCart className="text-indigo-600" size={28} /> কনফিগার করুন
            </h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Target Link (URL) *</label>
                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="উদা: https://facebook.com/profile" className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3 px-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Quantity *</label>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">
                    {selectedPackage?.minQuantity.toLocaleString()} - {selectedPackage?.maxQuantity.toLocaleString()}
                  </span>
                </div>
                <input type="number" value={quantity} onChange={handleQuantityChange} step="500" className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 focus:ring-2 outline-none transition font-black ${quantityError ? 'border-red-500 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-500'}`} />
                {quantityError && <p className="mt-2 text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={12} /> {quantityError}</p>}
              </div>

              <div className="p-6 bg-indigo-900 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-indigo-200">Total Price</span>
                  <div className="text-right">
                    <div className="text-3xl font-black">৳{calculateTotalPrice(selectedPackage, quantity).toFixed(0)}</div>
                    <div className="text-[10px] font-bold text-indigo-300 uppercase mt-1">Include VAT & Fees</div>
                  </div>
                </div>
                <button onClick={handleAddToCart} disabled={!!quantityError} className={`w-full py-5 rounded-2xl font-black text-indigo-900 uppercase tracking-widest text-sm transition transform active:scale-95 shadow-xl ${quantityError ? 'bg-indigo-300 cursor-not-allowed' : 'bg-white hover:bg-indigo-50'}`}>
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 justify-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
              <ShieldCheck size={14} className="text-green-500" /> Secure Payment Powered by View Agency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMMStore;
