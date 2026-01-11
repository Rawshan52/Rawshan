
import React, { useState, useMemo } from 'react';
import { DESIGN_SERVICES } from '../constants';
import { CartItem, DesignBrief } from '../types';
import { Check, Palette, Sparkles, Trophy, ArrowUpDown } from 'lucide-react';

interface Props {
  addToCart: (item: CartItem) => void;
}

const DesignStore: React.FC<Props> = ({ addToCart }) => {
  const [showBriefForm, setShowBriefForm] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(DESIGN_SERVICES[1]);
  const [sortOrder, setSortOrder] = useState<'default' | 'low-high' | 'high-low'>('default');
  
  const [brief, setBrief] = useState<DesignBrief>({
    businessName: '',
    industry: '',
    colors: '',
    styleReference: ''
  });

  const sortedServices = useMemo(() => {
    let result = [...DESIGN_SERVICES];
    if (sortOrder === 'low-high') {
      // Fixed: ServicePackage uses basePrice instead of price
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortOrder === 'high-low') {
      // Fixed: ServicePackage uses basePrice instead of price
      result.sort((a, b) => b.basePrice - a.basePrice);
    }
    return result;
  }, [sortOrder]);

  const handleBuy = (pkg: typeof DESIGN_SERVICES[0]) => {
    setSelectedPkg(pkg);
    setShowBriefForm(true);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.businessName || !brief.industry) {
      alert("Please fill in the business name and industry.");
      return;
    }
    
    addToCart({
      packageId: selectedPkg.id,
      name: selectedPkg.name,
      // Fixed: ServicePackage uses basePrice instead of price
      price: selectedPkg.basePrice,
      designBrief: brief
    });
    setShowBriefForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Logo & Branding Packages</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Transform your business with a unique visual identity designed by professional artists.</p>
      </div>

      {!showBriefForm ? (
        <div className="space-y-10">
          <div className="flex justify-end bg-white p-4 rounded-2xl border border-gray-100 shadow-sm max-w-xs ml-auto">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={18} className="text-gray-400" />
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="default">Sort: Recommended</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sortedServices.map((pkg) => {
              const isPopular = pkg.id === 'design-standard';
              return (
                <div 
                  key={pkg.id} 
                  className={`relative flex flex-col p-8 rounded-3xl border transition-all hover:shadow-2xl ${
                    isPopular 
                    ? 'border-indigo-600 shadow-xl bg-indigo-50 ring-4 ring-indigo-600 ring-opacity-10' 
                    : 'border-gray-200 bg-white'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold py-1 px-4 rounded-full uppercase tracking-widest">
                      Best Value
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline mb-4">
                      {/* Fixed: ServicePackage uses basePrice instead of price */}
                      <span className="text-4xl font-extrabold text-gray-900">৳{pkg.basePrice}</span>
                      <span className="text-gray-500 ml-2">one-time</span>
                    </div>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                  </div>

                  <div className="flex-grow space-y-4 mb-10">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Check size={18} className={isPopular ? 'text-indigo-600' : 'text-green-500'} />
                        <span className="text-sm text-gray-700 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleBuy(pkg)}
                    className={`w-full py-4 rounded-xl font-bold transition transform active:scale-95 ${
                      isPopular 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' 
                      : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Choose Package
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-gray-200 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Creative Brief</h2>
              <p className="text-sm text-gray-500">Selected: {selectedPkg.name}</p>
            </div>
            <button onClick={() => setShowBriefForm(false)} className="text-gray-400 hover:text-gray-600">Back to Pricing</button>
          </div>

          <form onSubmit={handleBriefSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Business Name *</label>
                <input 
                  type="text" 
                  value={brief.businessName}
                  onChange={(e) => setBrief({...brief, businessName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. View Agency"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Industry/Purpose *</label>
                <input 
                  type="text" 
                  value={brief.industry}
                  onChange={(e) => setBrief({...brief, industry: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Digital Marketing"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Color Preferences</label>
              <input 
                type="text" 
                value={brief.colors}
                onChange={(e) => setBrief({...brief, colors: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Blue and White, Pastel tones"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Style/Concept Reference</label>
              <textarea 
                value={brief.styleReference}
                onChange={(e) => setBrief({...brief, styleReference: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 h-32"
                placeholder="Tell us about the vibe you want (e.g. Modern, Minimal, Bold, etc.)"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg"
            >
              Complete Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DesignStore;
