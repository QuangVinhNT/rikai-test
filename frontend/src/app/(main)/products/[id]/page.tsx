'use client';

import { useGetProduct } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
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
  const params = useParams();
  const productId = Number(params?.id);
  const { data: productResponse, isLoading } = useGetProduct(productId);
  const product = productResponse?.data;

  const [isFavorite, setIsFavorite] = useState(false);

  // Parse specifications safely
  const specifications = useMemo(() => {
    if (!product?.specifications) return {};
    try {
      return typeof product.specifications === 'string' 
        ? JSON.parse(product.specifications) 
        : product.specifications;
    } catch (e) {
      return {};
    }
  }, [product?.specifications]);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-black text-gray-900 uppercase italic">Product Not Found</p>
      <Link href="/products" className="text-blue-600 font-bold text-sm hover:underline italic">Back to products</Link>
    </div>
  );

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
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-gray-50 rounded-[64px] overflow-hidden group relative border border-gray-100">
              <Image
                src={product.images?.[0] || 'https://placehold.co/800x800/F3F4F6/111827?text=No+Image'}
                alt={product.productName}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Right: Product Info & Purchase Options */}
          <div className="w-full lg:w-1/2 space-y-10 pb-20">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <HiStar key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">(Verified Item)</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-4 uppercase italic">{product.productName}</h1>
              <p className="text-3xl font-black text-blue-600 tracking-tighter italic">
                {product.price.toLocaleString()} ₫
              </p>
            </div>

            {/* Dynamic Specifications Tags (Top 4) */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(specifications).slice(0, 4).map(([key, value]) => (
                <div key={key} className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{key}</p>
                  <p className="text-[10px] font-bold text-gray-900">{String(value).split(",").join(", ")}</p>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
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

            {/* Description */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Description</h4>
              <p className="text-sm font-medium text-gray-500 leading-relaxed italic whitespace-pre-wrap">
                {product.description || 'No detailed description available.'}
              </p>
            </div>

            {/* Full Specifications Section */}
            {Object.keys(specifications).length > 0 && (
              <div className="space-y-6 pt-6 border-t border-gray-50">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Technical Details</h4>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-black text-gray-400 uppercase">{key}</span>
                      <span className="text-xs font-black text-gray-900">{String(value).split(",").join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4 pt-10">
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
