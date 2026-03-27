'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import {
  HiCheck,
  HiInboxStack,
  HiInformationCircle,
  HiPencilSquare,
  HiSquares2X2,
  HiSwatch,
  HiTag
} from 'react-icons/hi2';

export default function CategoryDetailPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">

      {/* 1. Header - Cố định */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-all group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to list
        </Link>

        <div className="flex items-center gap-3">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-600 transition-all shadow-xl shadow-gray-200 active:scale-95 cursor-pointer">
              <HiPencilSquare size={18} /> Edit Category
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
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
            <div className="mx-auto w-24 h-24 mb-6 bg-purple-50 rounded-[32px] flex items-center justify-center text-purple-600 shadow-inner">
              <HiSquares2X2 size={48} />
            </div>
            <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tight">Smartphones</h2>
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mt-2">Core Taxonomy</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Products</span>
              <span className="text-3xl font-black text-gray-900">124</span>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-tight">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Status
              </div>
            </div>
          </div>
        </div>

        {/* --- CỘT BÊN PHẢI: SCROLL ĐỘC LẬP --- */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-full">
            <div className="p-10 space-y-10 flex-1">

              {/* Header Info */}
              <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white">
                  <HiInformationCircle size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Category Settings</h3>
                  <p className="text-xs font-bold text-gray-400 italic">Configure classification and display rules</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Field: Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <HiTag size={14} /> Category Name
                  </label>
                  {isEditing ? (
                    <input type="text" defaultValue="Smartphones" className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-purple-50 focus:border-purple-400 outline-none transition-all" />
                  ) : (
                    <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900 uppercase italic">Smartphones</p>
                  )}
                </div>

                {/* Field: Color Theme */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <HiSwatch size={14} /> Brand Color Theme
                  </label>
                  <div className="flex items-center gap-4 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-50">
                    <div className="w-8 h-8 rounded-xl bg-purple-600 shadow-sm" />
                    {isEditing ? (
                      <input type="text" defaultValue="#7C3AED" className="bg-transparent border-none font-bold text-xs text-purple-600 outline-none uppercase" />
                    ) : (
                      <span className="text-xs font-black text-gray-500 tracking-widest">#7C3AED (Default Purple)</span>
                    )}
                  </div>
                </div>

                {/* Field: Description */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Description</label>
                  {isEditing ? (
                    <textarea rows={6} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-medium text-sm focus:ring-4 focus:ring-purple-50 focus:border-purple-400 outline-none transition-all resize-none" defaultValue="All mobile communication devices..." />
                  ) : (
                    <div className="px-8 py-8 bg-gray-50 rounded-[32px] border border-gray-50">
                      <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                        This category encompasses all mobile communication devices, ranging from entry-level smartphones to high-end flagship models.
                        <br /><br />
                        It includes sub-taxonomies for iOS and Android ecosystems, as well as specialized mobile hardware components. All products in this category must meet specific battery and connectivity standards before being published.
                      </p>
                    </div>
                  )}
                </div>

                {/* Section: Linked Products Preview (Chỉ hiển thị khi không edit) */}
                {!isEditing && (
                  <div className="space-y-4 pt-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <HiInboxStack size={14} /> Sample Products in Category
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['iPhone 15 Pro Max', 'Samsung Galaxy S24', 'Google Pixel 8', 'Nothing Phone 2'].map((prod, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-purple-200 transition-all cursor-pointer group">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">IMG</div>
                          <span className="text-xs font-black text-gray-700">{prod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50/80 px-10 py-6 border-t border-gray-100 flex justify-between items-center shrink-0">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Record ID: CAT_001_A</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Last Catalog Re-sync: 5m ago</p>
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
