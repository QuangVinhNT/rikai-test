'use client';

import {
  HiChevronRight,
  HiFire,
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiSparkles,
  HiArrowUpRight
} from 'react-icons/hi2';

// --- 1. Mock Data Cải Tiến ---
const CATEGORIES = [
  { name: 'Phones', icon: '📱', color: 'from-orange-400 to-red-400' },
  { name: 'Laptops', icon: '💻', color: 'from-blue-400 to-indigo-500' },
  { name: 'Watch', icon: '⌚', color: 'from-emerald-400 to-teal-500' },
  { name: 'Audio', icon: '🎧', color: 'from-purple-400 to-pink-500' },
];

const TRENDING_PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: 999, tag: 'Titanium', image: 'https://placehold.co/600x600/111827/FFFFFF?text=iPhone' },
  { id: 2, name: 'AirPods Max', price: 549, tag: 'New Color', image: 'https://placehold.co/600x600/111827/FFFFFF?text=Audio' },
  { id: 3, name: 'MacBook M3', price: 1299, tag: 'Limited', image: 'https://placehold.co/600x600/111827/FFFFFF?text=MacBook' },
  { id: 4, name: 'Watch Ultra', price: 799, tag: 'Extreme', image: 'https://placehold.co/600x600/111827/FFFFFF?text=Watch' },
  { id: 5, name: 'iPhone 15 Pro', price: 999, tag: 'Titanium', image: 'https://placehold.co/600x600/111827/FFFFFF?text=iPhone' },
  { id: 6, name: 'AirPods Max', price: 549, tag: 'New Color', image: 'https://placehold.co/600x600/111827/FFFFFF?text=Audio' },
  { id: 7, name: 'MacBook M3', price: 1299, tag: 'Limited', image: 'https://placehold.co/600x600/111827/FFFFFF?text=MacBook' },
  { id: 8, name: 'Watch Ultra', price: 799, tag: 'Extreme', image: 'https://placehold.co/600x600/111827/FFFFFF?text=Watch' },
];

export default function LuxuryHomePage() {
  return (
    <div className="h-full bg-[#f8f9fa] overflow-y-auto custom-scrollbar pb-20">

      {/* 1. Glassmorphism Search Bar */}
      <nav className="sticky top-0 z-30 px-8 py-6 bg-[#f8f9fa]/80 backdrop-blur-2xl flex items-center gap-6">
        <div className="flex-1 relative group">
          <HiMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-all" size={20} />
          <input
            type="text"
            placeholder="Search the future..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[28px] text-sm font-bold shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-4 bg-white border border-gray-100 text-gray-900 rounded-[22px] shadow-sm active:scale-90 transition-all">
            <HiHeart size={22} />
          </button>
          <button className="p-4 bg-gray-900 text-white rounded-[22px] shadow-2xl shadow-gray-200 active:scale-90 transition-all flex items-center gap-2">
            <HiShoppingBag size={22} />
            <span className="text-[10px] font-black bg-blue-500 px-2 py-0.5 rounded-full">2</span>
          </button>
        </div>
      </nav>

      {/* 2. Cinematic Hero Banner */}
      <section className="px-8 mt-2">
        <div className="relative w-full h-[400px] rounded-[50px] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <img
            src="https://placehold.co/1200x800/000000/FFFFFF?text=Vision+Pro"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
            alt="Hero"
          />
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end items-start">
            <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
              <HiSparkles className="text-blue-400" size={14} />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">New Arrival</span>
            </div>
            <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter italic uppercase mb-6">
              Enter the <br /> <span className="text-blue-500">Spatial</span> Age.
            </h2>
            <button className="group/btn px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all shadow-2xl">
              Pre-Order Now <HiArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Minimal Categories */}
      <section className="mt-16 px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Collections</h3>
          <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all shadow-sm">
            <HiChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="group relative h-40 bg-white rounded-[40px] border border-gray-100 p-6 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-gray-100 transition-all">
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${cat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-100 transition-opacity`} />
              <div className="text-4xl">{cat.icon}</div>
              <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trending Grid - "The Floating Look" */}
      <section className="mt-20 px-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[2px] flex-1 bg-gray-100" />
          <div className="flex items-center gap-2">
            <HiFire className="text-orange-500" size={24} />
            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Trending Gear</h3>
          </div>
          <div className="h-[2px] flex-1 bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {TRENDING_PRODUCTS.map((prod) => (
            <div key={prod.id} className="group flex flex-col">
              <div className="relative aspect-square bg-white rounded-[48px] overflow-hidden mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Floating Price Tag */}
                <div className="absolute top-6 left-6 bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-xl">
                  <p className="text-sm font-black tracking-tighter italic">${prod.price}</p>
                </div>

                {/* Bottom Blur Action */}
                <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full py-4 bg-white/90 backdrop-blur-xl text-gray-900 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95">
                    Add To Bag
                  </button>
                </div>
              </div>

              <div className="px-2 space-y-1">
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{prod.tag}</p>
                <h4 className="text-[17px] font-black text-gray-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                  {prod.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Luxury CTA */}
      <section className="mt-24 px-8">
        <div className="bg-gray-900 rounded-[60px] p-20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <HiSparkles size={48} className="text-blue-500 mb-6 animate-pulse" />
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
            Ready to Upgrade?
          </h3>
          <p className="text-gray-400 max-w-sm mb-10 italic">Join 50,000+ tech enthusiasts and get early access to exclusive drops.</p>
          <div className="flex gap-4">
            <button className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-900/40 hover:bg-white hover:text-gray-900 transition-all">
              Join Exclusive Club
            </button>
          </div>

          {/* Animated Glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
