'use client';

import { Loading } from '@/components/ui';
import { useGetCategories, useGetProducts, useProduct } from '@/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInboxStack,
  HiMagnifyingGlass,
  HiPlus,
  HiTag,
  HiTrash
} from 'react-icons/hi2';

export default function ProductListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '5';

  const { data } = useGetProducts(+page, +limit);
  const { data: categories } = useGetCategories();
  const { deleteProduct, isDeleting } = useProduct();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null);
      }
    });
  };

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden relative">

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
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 shadow-xl shadow-gray-200 transition-all flex items-center gap-2 active:scale-95 cursor-pointer" onClick={() => router.push('/admin/products/create')}>
            <HiPlus size={20} strokeWidth={2} /> Add Product
          </button>
        </div>
      </div>

      {data && data.data && categories && categories.data ? (
        <>
          {/* 2. Stats Cards */}
          <div className="shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Total Products', value: data.meta?.total?.toLocaleString() || '0', icon: HiInboxStack, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Active Categories', value: categories.meta?.total, icon: HiTag, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Out of Stock', value: '0', icon: HiExclamationCircle, color: 'text-red-600', bg: 'bg-red-50' },
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
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-bottom border-gray-50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.data.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => router.push(`/admin/products/${product.id}`)}>
                      <td className="px-8 py-5">
                        <div>
                          <p className="text-sm font-black text-gray-900">{product.productName}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-0.5 tracking-tighter">ID: #{product.id.toString().padStart(4, '0')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-600">{product.category?.categoryName}</td>
                      <td className="px-6 py-5 text-sm font-black text-gray-900">{product.price.toLocaleString()}₫</td>
                      <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-gray-900">{product.quantity}</span>
                            {product.quantity <= 10 && (
                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${product.quantity > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                            )}
                          </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setProductToDelete({ id: product.id, name: product.productName });
                            }}
                            className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                           >
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
                <div className="relative group">
                  <select
                    value={limit}
                    onChange={(e) => handleLimitChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-blue-600 text-xs font-bold py-2 pl-4 pr-10 rounded-xl hover:border-blue-400 hover:ring-4 hover:ring-blue-50 transition-all cursor-pointer outline-none shadow-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  disabled={+page === 1}
                  onClick={() => handlePageChange(+page - 1)}
                  className="p-2.5 border border-gray-200 bg-white rounded-xl text-gray-600 hover:text-blue-600 hover:border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-90"
                >
                  <HiChevronLeft size={20} />
                </button>
                <div className="flex items-center px-5 bg-white border border-gray-200 rounded-xl text-[11px] font-black text-blue-600 shadow-sm uppercase tracking-tighter">
                  Page <span className="ml-1 text-gray-900">{page}</span>
                </div>
                <button 
                  disabled={+page >= (data?.meta?.lastPage || 1)}
                  onClick={() => handlePageChange(+page + 1)}
                  className="p-2.5 border border-gray-200 bg-white rounded-xl text-gray-600 hover:text-blue-600 hover:border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-90"
                >
                  <HiChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {productToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-[6px] animate-in fade-in duration-300">
           <div className="bg-white max-w-md w-full rounded-[40px] p-10 shadow-2xl shadow-gray-900/20 border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center">
                   <HiExclamationTriangle size={40} />
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Delete product?</h3>
                <p className="text-sm font-bold text-gray-400">
                    {`You're about to remove`} <span className="text-gray-900 font-black">{productToDelete.name}</span>. 
                    This action is final and cannot be undone.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-10">
                <button 
                  disabled={isDeleting}
                  onClick={() => setProductToDelete(null)}
                  className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
                >
                    Keep it
                </button>
                <button 
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-red-500 text-white shadow-xl shadow-red-100 hover:bg-red-600 transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center"
                >
                    {isDeleting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : 'Delete Now'}
                </button>
              </div>
           </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
      `}</style>
    </div>
  );
}
