'use client';

import { useGetCategories, useGetProduct, useProduct } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';
import {
  HiAdjustmentsHorizontal,
  HiArchiveBox,
  HiCheck,
  HiCloudArrowUp,
  HiPencilSquare,
  HiPlus,
  HiTrash
} from 'react-icons/hi2';

interface SpecEntry {
  key: string;
  value: string;
}

interface ProductFormValues {
  productName: string;
  categoryId: number;
  price: number;
  quantity: number;
  description: string;
  specifications: SpecEntry[];
}

export default function ProductDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const productId = Number(params?.id);

  const { data: productResponse, isLoading } = useGetProduct(productId);
  const product = productResponse?.data;

  const { data: categoryResponse } = useGetCategories();
  const categories = categoryResponse?.data || [];

  const { updateProduct, isUpdating } = useProduct();

  // Helper to parse specs from object/string to array
  const parseSpecs = (specs: any): SpecEntry[] => {
    const obj = typeof specs === 'string' ? JSON.parse(specs) : (specs || {});
    return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
  };

  const { register, handleSubmit, reset, control, watch } = useForm<ProductFormValues>({
    values: product ? {
      productName: product.productName,
      categoryId: product.categoryId,
      price: product.price,
      quantity: product.quantity,
      description: product.description || '',
      specifications: parseSpecs(product.specifications),
    } : undefined
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications"
  });

  // Watch category to suggest specifications
  const selectedCategoryId = watch('categoryId');
  const selectedCategory = categories.find(c => c.id === Number(selectedCategoryId));

  const syncWithCategory = () => {
    if (!selectedCategory?.specificationsKey) return;
    
    const currentKeys = fields.map(f => f.key.toLowerCase());
    selectedCategory.specificationsKey.forEach(key => {
      if (!currentKeys.includes(key.toLowerCase())) {
        append({ key, value: '' });
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSave = async (values: ProductFormValues) => {
    const formData = new FormData();

    // Convert specifications back to object and stringify
    const specsObj: Record<string, string> = {};
    values.specifications.forEach(item => {
      if (item.key.trim()) specsObj[item.key] = item.value;
    });

    // Append fields
    formData.append('productName', values.productName);
    formData.append('categoryId', String(values.categoryId));
    formData.append('price', String(values.price));
    formData.append('quantity', String(values.quantity));
    formData.append('description', values.description);
    formData.append('specifications', JSON.stringify(specsObj));

    if (selectedFile) {
      formData.append('images', selectedFile);
    }

    updateProduct(
      { id: productId, formData },
      {
        onSuccess: () => {
          setIsEditing(false);
          setSelectedFile(null);
          setPreviewUrl(null);
        }
      }
    );
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-full gap-4">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-xs font-black uppercase tracking-widest text-gray-400">Loading catalog...</span>
    </div>
  );

  if (!product) return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p className="text-lg font-black text-gray-900 uppercase italic">Product Not Found</p>
      <Link href="/admin/products" className="text-blue-600 font-bold text-sm hover:underline italic">Back to products</Link>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">
      <form onSubmit={handleSubmit(onSave)} className="h-full flex flex-col">
        {/* 1. Header - Cố định */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <Link
            href="/admin/products"
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
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 cursor-pointer"
              >
                <HiPencilSquare size={18} /> Edit Product
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => {
                    setIsEditing(false);
                    setPreviewUrl(null);
                    setSelectedFile(null);
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
          <div className="h-full overflow-y-auto custom-scrollbar pr-1">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center mb-6">
              <div className="relative group mx-auto w-48 h-48 mb-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUpdating}
                  accept="image/*"
                />
                <div
                  className={`w-full h-full rounded-3xl bg-gray-50 border-2 flex flex-col items-center justify-center overflow-hidden relative cursor-pointer group transition-all duration-500 ${isEditing ? 'border-dashed border-blue-200' : 'border-transparent'} ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => isEditing && fileInputRef.current?.click()}
                >
                  <Image
                    src={previewUrl || product.images?.[0] || 'https://placehold.co/400x400?text=No+Image'}
                    alt={product.productName}
                    fill
                    className={`w-full h-full object-cover transition-transform duration-700 ${isEditing ? 'group-hover:scale-110 opacity-50' : 'opacity-90'}`}
                  />
                  {isEditing && !isUpdating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50/20 backdrop-blur-[2px]">
                      <HiCloudArrowUp size={32} className="text-blue-600 mb-2 animate-bounce" />
                      <span className="text-[10px] font-black text-blue-600 uppercase">Change Photo</span>
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-black text-gray-900 leading-tight uppercase italic tracking-tighter">{product.productName}</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 italic text-blue-600">ID: #{product.id.toString().padStart(4, '0')}</p>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4 font-black">
              <h3 className="text-[11px] text-gray-400 uppercase tracking-widest px-1">Quick Stats</h3>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div>
                   <p className="text-[9px] text-gray-400 uppercase">Status</p>
                   <p className={`text-[11px] mt-1 ${product.quantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {product.quantity > 0 ? 'ACTIVE & PUBLISHED' : 'OUT OF STOCK'}
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- CỘT BÊN PHẢI: SCROLL --- */}
          <div className="flex-1 h-full overflow-y-auto custom-scrollbar pr-2 pb-3">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-full">
              <div className="p-10 space-y-10 flex-1">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                    <HiArchiveBox size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter italic">Product Specification</h3>
                    <p className="text-xs font-bold text-gray-400 italic">Technical details and store settings</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                    {isEditing ? (
                      <input {...register('productName')} disabled={isUpdating} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all disabled:opacity-50" />
                    ) : (
                      <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900 uppercase italic">{product.productName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 text-blue-600">Category Selection</label>
                    {isEditing ? (
                      <select {...register('categoryId')} disabled={isUpdating} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-blue-50/30 font-black text-sm outline-none transition-all cursor-pointer focus:ring-4 focus:ring-blue-50 text-blue-600 italic disabled:opacity-50">
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="px-5 py-3.5 bg-blue-50/30 rounded-2xl text-sm font-black text-blue-600 italic">{product.category?.categoryName || 'General'}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Retail Price</label>
                    {isEditing ? (
                      <input type="number" {...register('price')} disabled={isUpdating} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none focus:ring-4 focus:ring-blue-50 disabled:opacity-50" />
                    ) : (
                      <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900">{product.price.toLocaleString()} ₫</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Level</label>
                    {isEditing ? (
                      <input type="number" {...register('quantity')} disabled={isUpdating} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none focus:ring-4 focus:ring-blue-50 disabled:opacity-50" />
                    ) : (
                      <p className="px-5 py-3.5 bg-gray-50 rounded-2xl text-sm font-black text-gray-900">{product.quantity} Units Available</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Description</label>
                    {isEditing ? (
                      <textarea rows={6} {...register('description')} disabled={isUpdating} className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 font-medium text-sm outline-none focus:ring-4 focus:ring-blue-50 resize-none disabled:opacity-50" />
                    ) : (
                      <p className="px-8 py-8 bg-gray-50 rounded-[32px] text-sm text-gray-600 italic whitespace-pre-wrap">{product.description || 'No description.'}</p>
                    )}
                  </div>

                  {/* Specifications Section */}
                  <div className="md:col-span-2 space-y-6 pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                          <HiAdjustmentsHorizontal size={18} />
                        </div>
                        <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] italic">Technical Specifications</h4>
                      </div>
                      
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          {selectedCategory?.specificationsKey && (
                            <button 
                              type="button" 
                              onClick={syncWithCategory}
                              disabled={isUpdating}
                              className="flex items-center gap-2 text-[9px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-tighter disabled:opacity-50"
                            >
                              Sync with Category
                            </button>
                          )}
                          <button 
                            type="button" 
                            onClick={() => append({ key: '', value: '' })} 
                            disabled={isUpdating} 
                            className="flex items-center gap-2 text-[9px] font-black text-gray-900 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all uppercase tracking-tighter disabled:opacity-50"
                          >
                            <HiPlus size={14} /> Add New
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-3 group animate-in fade-in slide-in-from-top-2">
                              <input {...register(`specifications.${index}.key`)} disabled={isUpdating} placeholder="Spec Name (e.g. Battery)" className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-tighter focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all italic disabled:opacity-50" />
                              <input {...register(`specifications.${index}.value`)} disabled={isUpdating} placeholder="Value..." className="flex-[2] px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-black focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all italic disabled:opacity-50" />
                              <button type="button" onClick={() => remove(index)} disabled={isUpdating} className="p-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all disabled:opacity-50">
                                <HiTrash size={20} />
                              </button>
                            </div>
                          ))}
                          {fields.length === 0 && (
                            <div className="py-12 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center bg-gray-50/30">
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">No specifications defined</p>
                               <p className="text-[9px] text-gray-300 mt-1 uppercase">Click sync or add new to begin</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {fields.map((spec, i) => (
                            <div key={i} className="flex justify-between items-center p-5 bg-gray-50/50 rounded-[24px] border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{spec.key}</span>
                              <span className="text-[11px] font-black text-gray-900 italic">{spec.value}</span>
                            </div>
                          ))}
                          {fields.length === 0 && (
                             <p className="col-span-2 text-center py-6 text-xs font-bold text-gray-300 italic">No technical details available.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 px-10 py-4 flex justify-end items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.quantity > 0 ? 'bg-blue-400 animate-pulse' : 'bg-red-500'}`} />
                  <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${product.quantity > 0 ? 'text-white' : 'text-red-400'}`}>
                    {product.quantity > 0 ? 'Public Visibility Active' : 'Restricted from storefront'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
      `}</style>
    </div>
  );
}
