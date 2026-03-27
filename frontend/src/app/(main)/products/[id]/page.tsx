'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  HiArrowPath,
  HiChevronLeft,
  HiHeart,
  HiShieldCheck,
  HiShoppingBag,
  HiStar,
  HiTruck
} from 'react-icons/hi2';

export default function UserProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('Titanium');
  const [selectedSize, setSelectedSize] = useState('256GB');
  const [isFavorite, setIsFavorite] = useState(false);

  const colors = [
    { name: 'Titanium', class: 'bg-zinc-400' },
    { name: 'Blue', class: 'bg-blue-900' },
    { name: 'Silver', class: 'bg-slate-200' },
    { name: 'Black', class: 'bg-zinc-900' },
  ];

  const sizes = ['128GB', '256GB', '512GB', '1TB'];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden p-1">

      {/* 1. Header Navigation */}
      <div className="shrink-0 px-4 py-4 flex items-center justify-between z-10">
        <Link href="/products" className="p-3 bg-gray-50 rounded-2xl text-gray-900 hover:bg-gray-100 transition-all active:scale-90 shadow-sm border border-gray-100">
          <HiChevronLeft size={24} />
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-3 rounded-2xl transition-all active:scale-90 shadow-sm border ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
          >
            <HiHeart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button className="p-3 bg-gray-900 text-white rounded-2xl shadow-xl active:scale-90 transition-all">
            <HiShoppingBag size={24} />
          </button>
        </div>
      </div>

      {/* 2. Main Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col lg:flex-row">

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 px-6 py-4">
            <div className="aspect-square bg-gray-50 rounded-[64px] overflow-hidden group relative">
              <img
                src="https://placehold.co/800x800/F3F4F6/111827?text=iPhone+15+Pro"
                alt="Product"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info & Purchase Options */}
          <div className="w-full lg:w-1/2 px-8 py-6 lg:py-12 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <HiStar key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">(128 Reviews)</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">iPhone 15 Pro Max</h1>
              <p className="text-3xl font-black text-blue-600 tracking-tighter italic">$1,299.00</p>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Color: <span className="text-gray-900">{selectedColor}</span></h4>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-4 transition-all active:scale-90 ${color.class} ${selectedColor === color.name ? 'border-blue-100 ring-2 ring-gray-900' : 'border-transparent opacity-60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Storage Capacity</h4>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 
                      ${selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                        : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-gray-50 py-8">
              <div className="flex flex-col items-center text-center gap-2">
                <HiTruck size={24} className="text-gray-400" />
                <p className="text-[9px] font-black uppercase text-gray-900">Free Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-x border-gray-50">
                <HiShieldCheck size={24} className="text-gray-400" />
                <p className="text-[9px] font-black uppercase text-gray-900">1 Year Warranty</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <HiArrowPath size={24} className="text-gray-400" />
                <p className="text-[9px] font-black uppercase text-gray-900">7 Days Return</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Description</h4>
              <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
                Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex gap-4 pt-4 pb-10">
              <button className="flex-[2] py-5 bg-gray-900 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-3">
                <HiShoppingBag size={20} /> Add To Bag
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
