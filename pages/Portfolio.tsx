
import React, { useState, useMemo } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { Search, LayoutGrid, Filter } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically derive unique categories from the portfolio items
  const categories = useMemo(() => {
    const cats = new Set(PORTFOLIO_ITEMS.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter(item => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Our Creative Showcase
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our collection of successful projects. From iconic logos to viral social media campaigns, we deliver excellence for every brand.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === c 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* Grid Display */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-md aspect-square lg:aspect-video transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in zoom-in-95 duration-500"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay with glassmorphism */}
              <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 border border-white/30">
                    {item.category}
                  </span>
                  <h3 className="text-white text-3xl font-black mb-4 drop-shadow-md">
                    {item.title}
                  </h3>
                  <div className="w-12 h-1 bg-white mx-auto rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                </div>
              </div>

              {/* Quick Info Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center pointer-events-none group-hover:opacity-0 transition-opacity">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Project Name</p>
                  <p className="text-sm font-bold text-gray-900">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <LayoutGrid size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-24 p-12 bg-indigo-900 rounded-[3rem] text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your project?</h2>
          <p className="text-indigo-100 mb-10 max-w-xl mx-auto">
            Our creative team is ready to bring your vision to life. Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#/design" className="px-10 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-gray-50 transition transform active:scale-95 shadow-xl">
              Get a Free Quote
            </a>
            <a href="#/contact" className="px-10 py-4 bg-indigo-800 text-white font-bold rounded-2xl border border-indigo-700 hover:bg-indigo-700 transition transform active:scale-95">
              Contact Sales
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </div>
  );
};

export default Portfolio;
