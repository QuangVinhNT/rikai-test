'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import {
  HiArchiveBox,
  HiCheck,
  HiCloudArrowUp,
  HiCube,
  HiCurrencyDollar,
  HiPencilSquare,
  HiTag
} from 'react-icons/hi2';

export default function ProductDetailPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">

      {/* 1. Header - Cố định */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-all group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to list
        </Link>

        <div className="flex items-center gap-3">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 cursor-pointer">
              <HiPencilSquare size={18} /> Edit Product
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-2xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-all cursor-pointer">Cancel</button>
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95 cursor-pointer">
                <HiCheck size={18} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">

        {/* --- CỘT BÊN TRÁI: CỐ ĐỊNH (SHRINK-0) --- */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center">
            <div className="relative group mx-auto w-48 h-48 mb-6">
              <div className="w-full h-full rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative">
                <img src="https://placehold.co/400x400" alt="Product" className="w-full h-full object-cover opacity-80" />
                {isEditing && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiCloudArrowUp size={32} className="text-blue-600 mb-2" />
                    <span className="text-[10px] font-black text-blue-600 uppercase">Change Photo</span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-xl font-black text-gray-900 leading-tight">iPhone 15 Pro Max</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 italic text-blue-600">ID: #0042</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Quick Stats</h3>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase">Sales this month</p>
              <p className="text-lg font-black text-gray-900">142 Units</p>
            </div>
          </div>
        </div>

        {/* --- CỘT BÊN PHẢI: SCROLL ĐỘC LẬP --- */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar pr-2 pb-3">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-full">
            <div className="p-10 space-y-10 flex-1">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                  <HiArchiveBox size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Product Specification</h3>
                  <p className="text-xs font-bold text-gray-400 italic">Technical details and store settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Các Field thông tin */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                  {isEditing ? (
                    <input type="text" defaultValue="iPhone 15 Pro Max" className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all" />
                  ) : (
                    <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900 uppercase italic">iPhone 15 Pro Max</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><HiTag size={14} /> Category</label>
                  {isEditing ? (
                    <select className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all cursor-pointer"><option>Smartphones</option></select>
                  ) : (
                    <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-bold text-blue-600 italic">Smartphones</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><HiCurrencyDollar size={14} /> Retail Price</label>
                  {isEditing ? (
                    <input type="number" defaultValue="1299" className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all" />
                  ) : (
                    <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900">$ 1,299.00</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><HiCube size={14} /> Stock Level</label>
                  {isEditing ? (
                    <input type="number" defaultValue="45" className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all" />
                  ) : (
                    <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900">45 Units Available</p>
                  )}
                </div>

                {/* Description - Thêm nhiều text để kích hoạt scroll */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Description</label>
                  {isEditing ? (
                    <textarea rows={8} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-medium text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all resize-none" defaultValue="Titanium design. A17 Pro chip..." />
                  ) : (
                    <div className="px-8 py-8 bg-gray-50 rounded-[32px] border border-gray-50 space-y-6">
                      <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                        The iPhone 15 Pro Max is the first iPhone to feature an aviation‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.
                        <br /><br />
                        Titanium has one of the best strength‑to‑weight ratios of any metal, making these our lightest Pro models ever. You’ll notice the difference the moment you pick one up.
                        <br /><br />
                        A17 Pro chip. A monster win for gaming. It’s here. The biggest redesign in the history of Apple GPUs. A17 Pro is an entirely new class of iPhone chip that delivers our best graphics performance by far.
                        <br /><br />
                        Mobile games will look and feel so immersive, with incredibly detailed environments and more realistic characters. And with industry-leading speed and efficiency, A17 Pro takes fast and runs with it.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer của cột phải - luôn ở cuối nội dung scroll */}
            <div className="bg-gray-50/80 px-10 py-6 border-t border-gray-100 flex justify-between items-center shrink-0">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Record created: 12 Jan 2024</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">Live on Storefront</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
      `}</style>
    </div>
  );
}
