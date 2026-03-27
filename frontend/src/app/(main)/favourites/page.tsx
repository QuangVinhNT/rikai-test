'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  HiArrowLeft,
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiSparkles,
  HiTrash
} from 'react-icons/hi2';

const INITIAL_FAVOURITES = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 1299, category: 'Smartphones', image: 'https://placehold.co/600x600/111827/FFFFFF?text=iPhone', color: 'bg-blue-500' },
  { id: 2, name: 'Apple Watch Ultra', price: 799, category: 'Wearables', image: 'https://placehold.co/600x600/111827/FFFFFF?text=Watch', color: 'bg-orange-500' },
  { id: 3, name: 'MacBook Air M3', price: 1099, category: 'Laptops', image: 'https://placehold.co/600x600/111827/FFFFFF?text=MacBook', color: 'bg-purple-500' },
];

export default function FavouritePage() {
  const [items, setItems] = useState(INITIAL_FAVOURITES);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] overflow-hidden">

      {/* 1. Artistic Header */}
      <div className="shrink-0 px-8 pt-10 pb-6 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors mb-4">
              <HiArrowLeft /> Back to store
            </Link>
            <h1 className="text-5xl font-[950] text-gray-900 tracking-tighter uppercase italic leading-none">
              My <span className="text-red-500 relative">
                Crush
                <HiSparkles className="absolute -top-4 -right-6 text-amber-400 animate-pulse" size={24} />
              </span>
            </h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pt-2">
              You have <span className="text-gray-900">{items.length} Tech Gems</span> reserved
            </p>
          </div>

          <Link href="/cart" className="relative p-5 bg-white border border-gray-100 rounded-[24px] shadow-xl shadow-gray-200/50 hover:scale-105 transition-all group">
            <HiShoppingBag size={24} className="text-gray-900" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-4 border-white">2</span>
          </Link>
        </div>

        {/* Minimal Search */}
        <div className="relative group">
          <HiMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-all" size={18} />
          <input
            type="text"
            placeholder="Search your wishlist..."
            className="w-full pl-14 pr-6 py-4 bg-white/50 border border-transparent rounded-[24px] text-sm font-bold focus:bg-white focus:border-red-100 focus:ring-4 focus:ring-red-50/50 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. Main List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-10">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-[35px] p-5 flex items-center gap-6 border border-gray-50 hover:border-red-100 hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.05)] transition-all duration-500">

                {/* Product Image với hiệu ứng Gradient Background */}
                <div className="relative w-28 h-28 shrink-0 rounded-[28px] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${item.color}`} />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 z-10"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">{item.category}</span>
                  <h3 className="text-[17px] font-black text-gray-900 truncate tracking-tight mt-0.5 group-hover:text-red-500 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-3">
                    <p className="text-lg font-[900] text-gray-900 tracking-tighter">${item.price.toLocaleString()}</p>
                    <div className="h-4 w-[1px] bg-gray-100" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">In Stock</span>
                  </div>
                </div>

                {/* Actions: Hiện ra mượt mà khi hover */}
                <div className="flex flex-col gap-2">
                  <button className="p-3 bg-gray-900 text-white rounded-2xl shadow-lg hover:bg-red-500 transition-all active:scale-90 group/btn">
                    <HiShoppingBag size={18} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                  >
                    <HiTrash size={18} />
                  </button>
                </div>

                {/* Hot Label (Tùy chọn) */}
                <div className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-red-50 text-red-500 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">Trending</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Nâng cấp trực quan */
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="relative mb-10">
              <div className="w-40 h-40 bg-white rounded-[50px] shadow-2xl flex items-center justify-center rotate-12 group hover:rotate-0 transition-transform duration-700">
                <HiHeart size={60} className="text-gray-100 group-hover:text-red-100 transition-colors" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-500 rounded-[20px] flex items-center justify-center text-white shadow-xl -rotate-12">
                <HiSparkles size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Heart is Empty</h2>
            <p className="text-sm font-medium text-gray-400 mt-4 mb-10 max-w-[280px] mx-auto leading-relaxed">
              {`Don't let your favorite tech slip away. Explore our store and save what you love.`}
            </p>
            <Link
              href="/products"
              className="px-12 py-5 bg-gray-900 text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-gray-200 hover:bg-red-500 transition-all active:scale-95"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </div>

      {/* 3. Bottom Quick Stats (Chỉ hiện khi có item) */}
      {items.length > 0 && (
        <div className="p-6 px-8 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Wishlist Value</p>
            <p className="text-2xl font-[950] text-gray-900 tracking-tighter italic">
              ${items.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}
            </p>
          </div>
          <button className="w-full md:w-auto px-10 py-4 bg-red-500 text-white rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-red-200 hover:bg-gray-900 transition-all active:scale-95">
            Add All To Bag
          </button>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
