'use client';

import { useCategory } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';
import {
  HiAdjustmentsHorizontal,
  HiCheck,
  HiInformationCircle,
  HiPlus,
  HiSquares2X2,
  HiTag,
  HiTrash
} from 'react-icons/hi2';

interface CategoryFormValues {
  categoryName: string;
  specificationsKey: { value: string }[];
}

export default function CreateCategoryPage() {
  const router = useRouter();
  const { createCategory, isCreating } = useCategory();

  const { register, handleSubmit, control } = useForm<CategoryFormValues>({
    defaultValues: {
      categoryName: '',
      specificationsKey: [{ value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specificationsKey"
  });

  const onSubmit = (values: CategoryFormValues) => {
    const payload = {
      categoryName: values.categoryName,
      specificationsKey: values.specificationsKey.map(k => k.value).filter(v => v.trim() !== '')
    };

    createCategory(payload, {
      onSuccess: () => {
        router.push('/admin/categories');
      }
    });
  };

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        {/* 1. Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <Link
            href="/admin/categories"
            className={`inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-purple-600 transition-all group ${isCreating ? 'pointer-events-none opacity-50' : ''}`}
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to list
          </Link>

          <button 
            type="submit"
            disabled={isCreating}
            className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-purple-600 transition-all shadow-xl shadow-gray-200 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
          >
            {isCreating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiCheck size={18} />
            )}
            {isCreating ? 'Launching...' : 'Launch Category'}
          </button>
        </div>

        {/* 2. Main Content Container */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">

          {/* --- CỘT BÊN TRÁI: PREVIEW --- */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center">
              <div className="mx-auto w-24 h-24 mb-6 bg-purple-50 rounded-[32px] flex items-center justify-center text-purple-600 ring-8 ring-purple-50/50">
                <HiSquares2X2 size={48} />
              </div>
              <h2 className="text-xl font-black text-gray-900 leading-tight tracking-tighter uppercase italic">New Taxonomy</h2>
              <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mt-3 italic animate-pulse">Drafting Stage</p>
            </div>

            <div className="bg-gray-900 p-8 rounded-[40px] text-white space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400">Quick Info</h4>
               <p className="text-xs font-bold leading-relaxed opacity-70 italic">
                 Define high-level classification to organize your products effectively. 
               </p>
            </div>
          </div>

          {/* --- CỘT BÊN PHẢI: FORM --- */}
          <div className="flex-1 h-full overflow-y-auto custom-scrollbar pr-2 pb-6">
            <div className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-full">
              <div className="p-10 lg:p-14 space-y-12 flex-1">

                <div className="flex items-center gap-4 border-b border-gray-50 pb-8">
                  <div className="w-14 h-14 bg-purple-600 rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-purple-100">
                    <HiInformationCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic leading-none">Category Definition</h3>
                    <p className="text-xs font-bold text-gray-400 italic mt-1">Establish new product classification rules</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  {/* Field: Category Name */}
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                       <HiTag size={16} className="text-purple-600" /> Category Identity
                    </label>
                    <input 
                      {...register('categoryName', { required: true })}
                      disabled={isCreating}
                      placeholder="e.g. Smartphones, Enterprise Laptops..."
                      className="w-full px-6 py-5 rounded-[24px] border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-8 focus:ring-purple-50 focus:border-purple-400 outline-none transition-all disabled:opacity-50 italic" 
                    />
                  </div>

                  {/* Section: Specification Template Keys */}
                  <div className="space-y-6 pt-10 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <HiAdjustmentsHorizontal size={16} className="text-emerald-600" /> Technical Schema Keys
                      </label>
                      <button 
                        type="button"
                        disabled={isCreating}
                        onClick={() => append({ value: '' })}
                        className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all uppercase italic disabled:opacity-50"
                      >
                        <HiPlus size={14} /> Add New Key
                      </button>
                    </div>

                    <p className="text-[10px] font-bold text-gray-400 italic px-1">
                      These keys will appear as attribute fields for every product assigned to this category.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 group animate-in fade-in slide-in-from-top-4">
                          <input 
                            {...register(`specificationsKey.${index}.value` as const)}
                            disabled={isCreating}
                            placeholder="e.g. CPU, RAM, Battery Life..."
                            className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black focus:bg-white focus:ring-8 focus:ring-purple-50 outline-none transition-all disabled:opacity-50 italic uppercase tracking-tighter"
                          />
                          <button 
                            type="button" 
                            onClick={() => remove(index)}
                            disabled={isCreating}
                            className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all disabled:opacity-50"
                          >
                            <HiTrash size={20} />
                          </button>
                        </div>
                      ))}
                      {fields.length === 0 && (
                        <div 
                          onClick={() => !isCreating && append({ value: '' })}
                          className="col-span-2 cursor-pointer py-12 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center bg-gray-50/30 hover:bg-purple-50 hover:border-purple-200 transition-all group"
                        >
                           <HiPlus size={24} className="text-gray-300 group-hover:text-purple-400 mb-2 transition-colors" />
                           <p className="text-[10px] font-black text-gray-400 group-hover:text-purple-600 uppercase tracking-widest italic transition-colors">Click to initialize schema</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-10 py-6 border-t border-gray-100 flex justify-between items-center shrink-0">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-purple-500" /> Category Blueprinting
                </span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">v1.0 Standard Taxonomy</span>
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
