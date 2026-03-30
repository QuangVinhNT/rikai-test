'use client';

import { Loading } from '@/components/ui';
import { useCategory, useGetCategories } from '@/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiExclamationTriangle,
  HiMagnifyingGlass,
  HiPlus,
  HiTrash
} from 'react-icons/hi2';

export default function CategoryListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string; } | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '5';

  const { data, isLoading } = useGetCategories(+page, +limit, searchParams.get('search') ?? '');
  const { deleteCategory, isDeleting } = useCategory();

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
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
    if (!categoryToDelete) return;
    deleteCategory(categoryToDelete.id, {
      onSuccess: () => {
        setCategoryToDelete(null);
      }
    });
  };

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden relative">

      {/* 1. Header & Actions */}
      <div className="shrink-0 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Categories</h1>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-600 transition-colors" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories..."
              className="pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-purple-50 focus:border-purple-400 outline-none w-64 transition-all shadow-sm italic"
            />
          </div>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-600 shadow-xl shadow-purple-100 transition-all flex items-center gap-2 active:scale-95 cursor-pointer" onClick={() => router.push('/admin/categories/create')}>
            <HiPlus size={20} strokeWidth={2} /> New Category
          </button>
        </div>
      </div>

      {/* 3. Main Content Section */}
      {!isLoading && data ? (
        <div className="flex-1 bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <tr>
                  <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Category Name</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-center">Specification Keys</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-center">Products Quantity</th>
                  <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => router.push(`/admin/categories/${item.id}`)}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-sm group-hover:scale-150 transition-transform" />
                        <div>
                          <p className="text-sm font-black text-gray-900 uppercase italic tracking-tighter">{item.categoryName}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-0.5 italic tracking-tighter uppercase">Ref: #{item.id.toString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {item.specificationsKey?.length > 0 ? (
                          item.specificationsKey.slice(0, 3).map((key: string, idx: number) => (
                            <span key={idx} className="text-[9px] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 uppercase italic tracking-widest">
                              {key}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] font-black text-gray-300 italic uppercase tracking-[0.2em]">Void Schema</span>
                        )}
                        {item.specificationsKey?.length > 3 && (
                          <span className="text-[9px] font-black text-purple-600 self-center">+{item.specificationsKey.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-black uppercase">
                        {item._count?.products}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCategoryToDelete({ id: item.id, name: item.categoryName });
                          }}
                          className="p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer"
                        >
                          <HiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-24 text-center">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] italic">No taxonomy matches your query</p>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="mt-4 text-[9px] font-black text-purple-600 uppercase tracking-widest hover:underline"
                      >
                        Reset Filters
                      </button>
                    </td>
                  </tr>
                )}
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
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white rounded-4xl border border-gray-100 italic">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Syncing Catalog...</p>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-[6px] animate-in fade-in duration-300">
          <div className="bg-white max-w-md w-full rounded-[40px] p-10 shadow-2xl shadow-gray-900/20 border border-gray-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center">
                <HiExclamationTriangle size={40} />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">Discard taxonomy?</h3>
              <p className="text-sm font-bold text-gray-400 leading-relaxed italic">
                {`You're about to remove`} <span className="text-gray-900 font-black tracking-tighter uppercase italic">{categoryToDelete.name}</span>.
                This action is final and may affect catalog integrity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-10">
              <button
                disabled={isDeleting}
                onClick={() => setCategoryToDelete(null)}
                className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50 italic"
              >
                Retain
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-red-500 text-white shadow-xl shadow-red-100 hover:bg-red-600 transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center italic"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Confirm Discard'}
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
