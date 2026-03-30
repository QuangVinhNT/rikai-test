'use client';

import { useGetCategories, useGetProducts } from '@/hooks';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  HiArrowUpRight,
  HiChevronRight,
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiSparkles
} from 'react-icons/hi2';

export default function EnhancedProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const activeCategoryId = searchParams.get('categoryId');

  // Fetch all categories for the filter bar
  const { data: categoriesResponse } = useGetCategories(1, 100);
  const categories = categoriesResponse?.data || [];

  // Fetch products with search and category filters
  const { data: productsResponse, isLoading } = useGetProducts(
    1,
    100,
    searchParams.get('search') ?? '',
    activeCategoryId ? +activeCategoryId : undefined
  );
  const products = productsResponse?.data || [];

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`/products?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleCategorySelect = (id: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('categoryId', id);
    } else {
      params.delete('categoryId');
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-full gap-4">
      <div className="w-16 h-16 border-8 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-sm font-black uppercase tracking-widest text-gray-400">Loading Essentials...</span>
    </div>
  );

  // Group products by category if no specific category is filtered and we aren't searching
  const isBrowsingAll = !activeCategoryId && !searchTerm;
  const groupedProducts = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.categoryId === cat.id)
  })).filter(group => group.items.length > 0);

  return (
    <div className="h-full bg-[#FBFBFB] overflow-y-auto custom-scrollbar px-6 md:px-12 pb-32">

      {/* 1. Ultra-Modern Header */}
      <header className="py-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-50 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 animate-pulse">
            <HiSparkles size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Spring/Summer 2026</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none italic uppercase">
            Future <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Inventory</span>
          </h1>
        </div>

        <div className="flex flex-col gap-4 min-w-[320px]">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find your gear..."
              className="w-full pl-6 pr-14 py-5 bg-white border border-gray-100 rounded-[32px] text-sm font-bold shadow-2xl shadow-gray-100 focus:ring-8 focus:ring-blue-50 focus:border-blue-400 transition-all outline-none italic"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gray-900 text-white rounded-[22px] group-focus-within:bg-blue-600 transition-colors">
              <HiMagnifyingGlass size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Highlighted Bento Grid (Only show on 'All Gear' and no search) */}
      {!activeCategoryId && !searchTerm && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="md:col-span-2 relative h-[400px] bg-gray-900 rounded-[64px] overflow-hidden group cursor-pointer border border-white/10 shadow-3xl shadow-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1622434641406-a15812345ad1?q=80&w=2000&auto=format&fit=crop"
              alt="Highlight"
              fill
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-2000"
            />
            <div className="absolute inset-0 p-16 flex flex-col justify-end bg-linear-to-t from-black/90 to-transparent">
              <h2 className="text-5xl font-black text-white mb-2 uppercase italic tracking-tighter">Hyperion Spatial</h2>
              <p className="text-gray-400 text-sm font-medium mb-8 max-w-sm italic tracking-tight">The ultimate intersection of architecture and biology. Available now for pre-order.</p>
              <button className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.3em] border-b-2 border-blue-500 pb-2 w-fit hover:gap-6 transition-all">
                Explore The Future <HiArrowUpRight size={20} />
              </button>
            </div>
          </div>
          <div className="bg-linear-to-br from-blue-700 to-indigo-800 rounded-[64px] p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group shadow-3xl shadow-blue-200/50">
            <div className="z-10 group-hover:scale-110 transition-transform duration-700">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Limited Release</p>
              <h3 className="text-6xl font-black mb-6 italic leading-none tracking-tighter uppercase">50%<br />CREDIT</h3>
              <p className="text-xs font-bold leading-relaxed opacity-80 italic max-w-[140px] mx-auto">Trade-in program for Legacy Hardware</p>
              <button className="mt-10 px-10 py-4 bg-white text-blue-700 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl active:scale-95">
                Join Network
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-pulse" />
          </div>
        </section>
      )}

      {/* 3. Category Pill Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#FBFBFB]/80 backdrop-blur-xl py-6 mb-12 -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-3">
        <button
          onClick={() => handleCategorySelect(null)}
          className={`cursor-pointer px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${!activeCategoryId ? 'bg-gray-900 text-white border-gray-900 scale-105' : 'bg-white text-gray-400 border-gray-100 hover:border-blue-300 hover:text-blue-600'}`}
        >
          All Gear
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id.toString())}
            className={`cursor-pointer px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border flex items-center gap-3 ${activeCategoryId === cat.id.toString() ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-xl shadow-blue-100' : 'bg-white text-gray-400 border-gray-100 hover:border-blue-300 hover:text-blue-600'}`}
          >
            {cat.categoryName} <span className="opacity-40 font-bold">{cat._count?.products}</span>
          </button>
        ))}
      </div>

      {/* 4. Products Presentation */}
      <div className="space-y-24">
        {isBrowsingAll ? (
          // Grouped Layout
          groupedProducts.map((group) => (
            <section key={group.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex items-center justify-between mb-10 px-2">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic flex items-center gap-4">
                    {group.categoryName}
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic tracking-widest border border-blue-100">{group.items.length} units</span>
                  </h3>
                  <div className="h-1 w-12 bg-blue-600 rounded-full mt-2" />
                </div>
                <button
                  onClick={() => handleCategorySelect(group.id.toString())}
                  className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all hover:translate-x-1"
                >
                  <HiChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {group.items.map((product) => (
                  <ProductCard key={product.id} product={product} router={router} />
                ))}
              </div>
            </section>
          ))
        ) : (
          // Single Grid Layout (Search or Filtered)
          <section className="animate-in fade-in duration-500">
            <div className="mb-10 px-2">
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">
                {searchTerm ? `Matches for "${searchTerm}"` : categories.find(c => c.id.toString() === activeCategoryId)?.categoryName}
                <span className="ml-4 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{products.length} found</span>
              </h3>
              <div className="h-1 w-12 bg-blue-600 rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} router={router} />
              ))}
              {products.length === 0 && (
                <div className="col-span-full py-32 flex flex-col items-center justify-center border-4 border-dashed border-gray-50 rounded-[64px]">
                  <HiMagnifyingGlass size={48} className="text-gray-100 mb-4" />
                  <p className="text-xs font-black text-gray-300 uppercase tracking-widest italic">No essentials match your criteria</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function ProductCard({ product, router }: any) {
  return (
    <div key={product.id} className="group relative cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
      {/* Card Body */}
      <div className="relative aspect-square bg-white rounded-[48px] overflow-hidden p-4 shadow-sm group-hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-1000">

        {/* Image Container */}
        <div className="w-full h-full bg-[#f9f9f9] rounded-[40px] overflow-hidden relative">
          <Image
            src={product.images?.[0] || 'https://placehold.co/600x600/F3F3F3/999999?text=VOID'}
            alt={product.productName}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1500"
          />

          {/* New Tag */}
          {product.quantity > 50 && (
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full italic shadow-lg shadow-blue-200">
              Trending
            </div>
          )}

          {/* Floating Heart */}
          <button className="absolute top-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl text-gray-200 hover:text-red-500 transition-all active:scale-90 hover:shadow-xl hover:shadow-red-100 cursor-pointer">
            <HiHeart size={20} />
          </button>
        </div>

        {/* Hover Overlay: Glass Action */}
        <div className="absolute inset-x-8 bottom-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-10 ease-out">
          <button className="w-full py-5 bg-gray-900/95 backdrop-blur-2xl text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-3xl hover:bg-blue-600 transition-colors">
            <HiShoppingBag size={18} /> Acquisition
          </button>
        </div>
      </div>

      {/* Product Meta */}
      <div className="mt-8 px-4 flex flex-col items-center">
        <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2 italic">
          {product.category?.categoryName || 'Universal'}
        </span>
        <h4 className="text-[17px] font-black text-gray-900 tracking-tighter leading-tight group-hover:text-blue-600 transition-all uppercase italic text-center px-2">
          {product.productName}
        </h4>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-xl font-black text-gray-900 tracking-tighter">{product.price.toLocaleString()}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase italic">Credits</span>
        </div>

        {/* Inventory Badge */}
        {product.quantity <= 0 && (
          <div className="mt-3 flex items-center gap-2 px-4 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
            <div className="w-1 h-1 rounded-full bg-red-500" />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Out of Stock</span>
          </div>
        )}
      </div>
    </div>
  );
}
