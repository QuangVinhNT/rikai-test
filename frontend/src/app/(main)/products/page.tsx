'use client';

import { useGetProducts } from '@/hooks';
import Image from 'next/image';
import {
  HiAdjustmentsHorizontal,
  HiArrowUpRight,
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiSparkles
} from 'react-icons/hi2';

export default function EnhancedProductList() {
  const { data: productsResponse, isLoading } = useGetProducts(1, 100); // Fetch more for main page
  const products = productsResponse?.data || [];

  if (isLoading) return (
    <div className="flex items-center justify-center h-full gap-4">
      <div className="w-16 h-16 border-8 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-sm font-black uppercase tracking-widest text-gray-400">Loading essentials...</span>
    </div>
  );

  return (
    <div className="h-full bg-[#FBFBFB] overflow-y-auto custom-scrollbar px-6 md:px-12 pb-20">

      {/* 1. Ultra-Modern Header */}
      <header className="py-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <HiSparkles size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">New Collection 2026</span>
          </div>
          <h1 className="text-6xl font-[900] text-gray-900 tracking-tighter leading-none italic uppercase">
            Future <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Essentials</span>
          </h1>
        </div>

        <div className="flex flex-col gap-4 min-w-[320px]">
          <div className="relative group">
            <input
              type="text"
              placeholder="Find your gear..."
              className="w-full pl-6 pr-14 py-5 bg-white border border-gray-100 rounded-[32px] text-sm font-bold shadow-2xl shadow-gray-100 focus:ring-0 focus:border-blue-500 transition-all outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gray-900 text-white rounded-[22px]">
              <HiMagnifyingGlass size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Bento Grid Section (Highlight) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="md:col-span-2 relative h-[350px] bg-gray-900 rounded-[48px] overflow-hidden group cursor-pointer border border-white/10">
          <Image 
            src="https://images.unsplash.com/photo-1622434641406-a15812345ad1?q=80&w=2000&auto=format&fit=crop" 
            alt="Vision Pro"
            fill
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Spatial Computing</h2>
            <p className="text-gray-400 text-sm font-medium mb-6 max-w-sm italic">Experience the future of work and play with the world&apos;s most advanced technology.</p>
            <button className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest border-b-2 border-blue-500 pb-1 w-fit hover:gap-4 transition-all">
              Discover More <HiArrowUpRight size={18} />
            </button>
          </div>
        </div>
        <div className="bg-blue-600 rounded-[48px] p-10 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
          <div className="z-10 group-hover:scale-105 transition-transform duration-500">
            <h3 className="text-5xl font-black mb-4 italic leading-none">30%<br />OFF</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Summer Flash Sale</p>
            <button className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-2xl">
              Get Code
            </button>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </section>

      {/* 3. Product Grid with Glassmorphism */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Featured Gear</h3>
        <div className="flex gap-2">
          <button className="px-6 py-2.5 bg-white rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 hover:border-blue-200 transition-all">
            Filter <HiAdjustmentsHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group relative cursor-pointer">
            {/* Card Body */}
            <div className="relative aspect-square bg-white rounded-[42px] overflow-hidden p-4 shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">

              {/* Image Container */}
              <div className="w-full h-full bg-[#F3F3F3] rounded-[32px] overflow-hidden relative">
                <Image
                  src={product.images?.[0] || 'https://placehold.co/600x600/F3F3F3/999999?text=No+Image'}
                  alt={product.productName}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Floating Heart */}
                <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-gray-300 hover:text-red-500 transition-all active:scale-90">
                  <HiHeart size={18} />
                </button>
              </div>

              {/* Hover Overlay: Glass Action */}
              <div className="absolute inset-x-8 bottom-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <button className="w-full py-4 bg-gray-900/90 backdrop-blur-xl text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl">
                  <HiShoppingBag size={16} /> Quick Add
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="mt-6 px-2 text-center flex flex-col items-center">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
                {product.category?.categoryName || 'General'}
              </span>
              <h4 className="text-[15px] font-black text-gray-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                {product.productName}
              </h4>
              <p className="text-lg font-black text-gray-400 mt-1 tracking-tighter group-hover:text-gray-900 transition-all">
                {product.price.toLocaleString()} ₫
              </p>

              {/* Inventory Badge */}
              {product.quantity <= 0 && (
                <span className="mt-2 text-[8px] font-black text-red-500 uppercase tracking-widest border border-red-100 px-2 py-0.5 rounded-full">Sold Out</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
