'use client';

import { Loading } from '@/components/ui';
import { useCategory, useGetCategory } from '@/hooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';
import {
  HiAdjustmentsHorizontal,
  HiCheck,
  HiInboxStack,
  HiInformationCircle,
  HiPencilSquare,
  HiPlus,
  HiSquares2X2,
  HiTag,
  HiTrash
} from 'react-icons/hi2';

interface CategoryFormValues {
  categoryName: string;
  specificationsKey: { value: string; }[];
}

export default function CategoryDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const categoryId = Number(params?.id);

  const { data: categoryResponse, isLoading } = useGetCategory(categoryId);
  const category = categoryResponse?.data;

  const { updateCategory, isUpdating } = useCategory();

  const { register, handleSubmit, reset, control } = useForm<CategoryFormValues>({
    values: category ? {
      categoryName: category.categoryName,
      specificationsKey: category.specificationsKey?.map(k => ({ value: k })) || []
    } : undefined
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specificationsKey"
  });

  const onSave = async (values: CategoryFormValues) => {
    const payload = {
      categoryName: values.categoryName,
      specificationsKey: values.specificationsKey.map(k => k.value).filter(v => v.trim() !== '')
    };

    updateCategory(
      { id: categoryId, payload },
      {
        onSuccess: () => {
          setIsEditing(false);
        }
      }
    );
  };

  if (isLoading) return <Loading />;

  if (!category) return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p className="text-lg font-black text-gray-900 uppercase italic">Category Not Found</p>
      <Link href="/admin/categories" className="text-blue-600 font-bold text-sm hover:underline italic">Back to categories</Link>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">
      <form onSubmit={handleSubmit(onSave)} className="h-full flex flex-col">
        {/* 1. Header - Cố định */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <Link
            href="/admin/categories"
            className={`inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-all group ${isUpdating ? 'pointer-events-none opacity-50' : ''}`}
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to list
          </Link>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-600 transition-all shadow-xl shadow-gray-200 active:scale-95 cursor-pointer"
              >
                <HiPencilSquare size={18} /> Edit Category
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
                >
                  {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <HiCheck size={18} />
                  )}
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. Main Content Container */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">

          {/* --- CỘT BÊN TRÁI: CỐ ĐỊNH --- */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
              <div className="mx-auto w-24 h-24 mb-6 bg-purple-50 rounded-[32px] flex items-center justify-center text-purple-600 shadow-inner">
                <HiSquares2X2 size={48} />
              </div>
              <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tighter uppercase italic">{category.categoryName}</h2>
              <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mt-2 italic">Ref ID: #{category.id}</p>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4 text-center">
              <div className="pt-4">
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-black capitalize">
                  Product Quantity: {category._count?.products}
                </div>
              </div>
            </div>
          </div>

          {/* --- CỘT BÊN PHẢI: SCROLL --- */}
          <div className="flex-1 h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-full">
              <div className="p-10 space-y-10 flex-1">

                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white">
                    <HiInformationCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter italic">Category Settings</h3>
                    <p className="text-xs font-bold text-gray-400 italic">Configure classification schema for products</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {/* Field: Name */}
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <HiTag size={16} className="text-purple-600" /> Category Name
                    </label>
                    {isEditing ? (
                      <input
                        {...register('categoryName')}
                        disabled={isUpdating}
                        type="text"
                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-purple-50 focus:border-purple-400 outline-none transition-all disabled:opacity-50 italic"
                      />
                    ) : (
                      <p className="px-5 py-4 bg-gray-50 rounded-2xl text-sm font-black text-gray-900 uppercase italic border border-gray-50">
                        {category.categoryName}
                      </p>
                    )}
                  </div>

                  {/* Section: Specification Template Keys */}
                  <div className="space-y-6 pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <HiAdjustmentsHorizontal size={16} className="text-emerald-600" /> Specification Schema
                      </label>
                      {isEditing && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => append({ value: '' })}
                          className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-600 hover:text-white transition-all uppercase italic disabled:opacity-50"
                        >
                          <HiPlus size={14} /> Add Schema Key
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {isEditing ? (
                        fields.map((field, index) => (
                          <div key={field.id} className="flex items-center gap-2 group animate-in fade-in slide-in-from-top-2">
                            <input
                              {...register(`specificationsKey.${index}.value` as const)}
                              disabled={isUpdating}
                              placeholder="e.g. Display Size, CPU..."
                              className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 outline-none transition-all disabled:opacity-50 italic"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              disabled={isUpdating}
                              className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                            >
                              <HiTrash size={18} />
                            </button>
                          </div>
                        ))
                      ) : (
                        category.specificationsKey?.length > 0 ? (
                          category.specificationsKey.map((key, i) => (
                            <div key={i} className="px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-[24px] flex items-center gap-3 hover:bg-white hover:border-purple-200 transition-all">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              <span className="text-xs font-black text-gray-900 italic uppercase tracking-tighter">{key}</span>
                            </div>
                          ))
                        ) : (
                          <p className="col-span-2 text-center py-10 bg-gray-50/30 border-2 border-dashed border-gray-50 rounded-[32px] text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
                            No technical schema defined for this category
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-900 px-10 py-4 flex justify-between items-center shrink-0">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  Catalog Sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="flex items-center gap-2">
                  <HiInboxStack className="text-purple-400" size={12} />
                  <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">System Schema Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
      `}</style>
    </div>
  );
}
