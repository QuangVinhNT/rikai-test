'use client';

import React from 'react';
import { 
  HiChevronLeft, 
  HiChevronRight, 
  HiMagnifyingGlass, 
  HiPlus, 
  HiTrash,
  HiSquares2X2,
  HiChartPie,
  HiPencilSquare
} from 'react-icons/hi2';

// --- 1. Mock Data ---
const MOCK_CATEGORIES = [
  { id: 1, name: 'Smartphones', count: 124, status: 'Active', color: 'bg-blue-500' },
  { id: 2, name: 'Laptops', count: 42, status: 'Active', color: 'bg-purple-500' },
  { id: 3, name: 'Accessories', count: 512, status: 'Archived', color: 'bg-emerald-500' },
  { id: 4, name: 'Wearables', count: 88, status: 'Active', color: 'bg-amber-500' },
];

export default function CategoryListPage() {
  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">
      
      {/* 1. Header & Actions */}
      <div className="shrink-0 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Categories</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-purple-50 focus:border-purple-400 outline-none w-64 transition-all shadow-sm"
            />
          </div>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-600 shadow-xl shadow-purple-100 transition-all flex items-center gap-2 active:scale-95 cursor-pointer">
            <HiPlus size={20} strokeWidth={2} /> New Category
          </button>
        </div>
      </div>

      {/* 2. Stats Cards */}
      <div className="shrink-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[
          { label: 'Total Categories', value: '12', icon: HiSquares2X2, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Items Organized', value: '856', icon: HiChartPie, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-[28px] border border-gray-100 flex items-center gap-5 shadow-sm">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-gray-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Table Section */}
      <div className="flex-1 bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Category Name</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-center">Linked Products</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_CATEGORIES.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm`} />
                      <div>
                        <p className="text-sm font-black text-gray-900">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5 italic">Category Reference #{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                      {item.count}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight 
                      ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                        <HiPencilSquare size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                        <HiTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Rows per page:</span>
            <select className="appearance-none bg-white border border-gray-200 text-purple-600 text-xs font-bold py-2 pl-4 pr-8 rounded-xl outline-none shadow-sm cursor-pointer hover:border-purple-300 transition-all">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 bg-white rounded-xl text-gray-400 hover:text-purple-600 transition-all hover:bg-purple-50">
              <HiChevronLeft size={20} />
            </button>
            <div className="flex items-center px-5 bg-white border border-gray-200 rounded-xl text-[11px] font-black text-purple-600 shadow-sm uppercase tracking-tighter">
              Page <span className="ml-1 text-gray-900">1</span>
            </div>
            <button className="p-2 border border-gray-200 bg-white rounded-xl text-gray-400 hover:text-purple-600 transition-all hover:bg-purple-50">
              <HiChevronRight size={20} />
            </button>
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
