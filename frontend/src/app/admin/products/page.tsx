'use client';

import {
  HiChevronLeft,
  HiChevronRight,
  HiExclamationCircle,
  HiInboxStack,
  HiMagnifyingGlass,
  HiPlus,
  HiTag,
  HiTrash
} from 'react-icons/hi2';

// --- 1. Mock Data ---
const MOCK_PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Smartphones', price: 1299, stock: 45, status: 'In Stock', image: 'https://placehold.co/48' },
  { id: 2, name: 'MacBook Air M3', category: 'Laptops', price: 999, stock: 12, status: 'Low Stock', image: 'https://placehold.co/48' },
  { id: 3, name: 'AirPods Pro 2', category: 'Accessories', price: 249, stock: 0, status: 'Out of Stock', image: 'https://placehold.co/48' },
  { id: 4, name: 'Apple Watch Series 9', category: 'Wearables', price: 399, stock: 88, status: 'In Stock', image: 'https://placehold.co/48' },
];

export default function ProductListPage() {
  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">

      {/* 1. Header & Actions */}
      <div className="shrink-0 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Products</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none w-64 transition-all shadow-sm"
            />
          </div>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 shadow-xl shadow-gray-200 transition-all flex items-center gap-2 active:scale-95 cursor-pointer">
            <HiPlus size={20} strokeWidth={2} /> Add Product
          </button>
        </div>
      </div>

      {/* 2. Stats Cards */}
      <div className="shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'Total Products', value: '1,240', icon: HiInboxStack, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Categories', value: '12', icon: HiTag, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Out of Stock', value: '03', icon: HiExclamationCircle, color: 'text-red-600', bg: 'bg-red-50' },
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
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50">Product Name</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50">Category</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50">Price</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50">Stock</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_PRODUCTS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-black text-gray-900">{item.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-0.5">ID: #{item.id.toString().padStart(4, '0')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-600">{item.category}</td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900">${item.price.toLocaleString()}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-600">{item.stock} units</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight 
                      ${item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                        <HiTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination (As per your previous request) */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Rows per page:</span>
            <select className="appearance-none bg-white border border-gray-200 text-blue-600 text-xs font-bold py-2 pl-4 pr-8 rounded-xl outline-none shadow-sm cursor-pointer">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all">
              <HiChevronLeft size={20} />
            </button>
            <div className="flex items-center px-5 bg-white border border-gray-200 rounded-xl text-[11px] font-black text-blue-600 shadow-sm uppercase tracking-tighter">
              Page <span className="ml-1 text-gray-900">1</span>
            </div>
            <button className="p-2 border border-gray-200 bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all">
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
