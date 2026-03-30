'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import {
  HiAdjustmentsHorizontal,
  HiArrowLeft,
  HiCloudArrowUp,
  HiPhoto,
  HiTag,
  HiTrash
} from 'react-icons/hi2';
import { useGetCategories, useProduct } from '@/hooks';
import { Category } from '@/types';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loading';

interface CreateProductForm {
  productName: string;
  description: string;
  price: number;
  categoryId: string;
  specifications: Record<string, string>;
  file: File | null;
}

export default function CreateProductPage() {
  const router = useRouter();
  const { data: categoriesResponse } = useGetCategories();
  const { createProduct, isCreating } = useProduct();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<CreateProductForm>({
    defaultValues: {
      productName: '',
      description: '',
      price: 0,
      categoryId: '',
      specifications: {},
      file: null,
    },
  });

  const isLoading = isSubmitting || isCreating;
  const selectedCategoryId = watch('categoryId');
  const selectedCategory = categoriesResponse?.data.find(
    (c: Category) => c.id.toString() === selectedCategoryId
  );

  const onSubmit = async (data: CreateProductForm) => {
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('description', data.description || '');
    formData.append('price', data.price.toString());
    formData.append('categoryId', data.categoryId);
    formData.append('specifications', JSON.stringify(data.specifications));
    
    if (data.file) {
      formData.append('images', data.file);
    }

    createProduct(formData, {
      onSuccess: () => {
        router.push('/admin/products');
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('file', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue('file', null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col p-1 overflow-hidden transition-all duration-500">
      {/* 1. Header Section */}
      <div className="shrink-0 mb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-all group"
            >
              <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to list
            </Link>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Create Product</h1>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/products" className={`bg-white text-gray-400 border border-gray-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isLoading}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2 ${
              isLoading 
                ? 'bg-blue-600 text-white shadow-blue-200' 
                : 'bg-gray-900 text-white hover:bg-blue-600 shadow-gray-200'
            }`}
          >
            {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      {/* 2. Main Form Content (Scrollable) */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8 transition-all duration-700 ${isLoading ? 'opacity-40 scale-[0.99] pointer-events-none' : ''}`}>
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px] transition-all duration-300">
            <Loading />
            <div className="-mt-32 text-center pointer-events-none">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Uploading Product</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Uploading images to cloud & processing data...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: General Info, Specifications & Images */}
          <div className="lg:col-span-2 space-y-6">

            {/* General Information Card */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <HiTag size={24} />
                </div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">General Information</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Product Name</label>
                  <input
                    {...register('productName', { required: true })}
                    type="text"
                    disabled={isLoading}
                    placeholder="e.g. iPhone 15 Pro Max"
                    className="w-full bg-gray-50 border-none text-sm font-bold py-4 px-6 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 disabled:opacity-50"
                  />
                  {errors.productName && <p className="text-red-500 text-[10px] mt-1 font-bold">Product name is required</p>}
                </div>

                <div>
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                  <textarea
                    {...register('description')}
                    rows={6}
                    disabled={isLoading}
                    placeholder="Describe your product in detail..."
                    className="w-full bg-gray-50 border-none text-sm font-bold py-4 px-6 rounded-[24px] outline-none focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 resize-none disabled:opacity-50"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Specifications Card (Dynamic Based on Schema) */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <HiAdjustmentsHorizontal size={24} />
                </div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Technical Specifications</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!selectedCategory ? (
                  <div className="col-span-2 py-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50/50">
                    <p className="text-xs font-bold text-gray-400">Select a category to view specifications keys</p>
                  </div>
                ) : (
                  selectedCategory.specificationsKey.map((key: string) => (
                    <div key={key}>
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">{key}</label>
                      <input
                        {...register(`specifications.${key}` as const)}
                        type="text"
                        disabled={isLoading}
                        placeholder={`Enter ${key.toLowerCase()}...`}
                        className="w-full bg-gray-50 border-none text-sm font-bold py-4 px-6 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-200 disabled:opacity-50"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Media/Images Card */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <HiPhoto size={24} />
                </div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Product Media</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                
                {/* Upload Action */}
                {!imagePreview && (
                  <div
                    onClick={() => !isLoading && fileInputRef.current?.click()}
                    className={`aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group ${isLoading ? 'opacity-50' : ''}`}
                  >
                    <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-blue-600">
                      <HiCloudArrowUp size={24} />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Image</span>
                  </div>
                )}

                {/* Image Preview */}
                {imagePreview && (
                  <div className={`aspect-square relative rounded-3xl overflow-hidden group border border-gray-100 ${isLoading ? 'opacity-50' : ''}`}>
                    <Image
                      src={imagePreview}
                      alt="Product Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        type="button"
                        onClick={removeImage}
                        disabled={isLoading}
                        className="p-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-red-500 transition-colors disabled:hidden"
                      >
                        <HiTrash size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-4 text-[10px] font-bold text-gray-400 italic">Recommended size: 1080x1080px. PNG, JPG supported.</p>
            </div>
          </div>

          {/* Right Column: Pricing, Category, Status */}
          <div className="space-y-6">

            {/* Pricing & Inventory Card */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Category & Price</h3>

              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                  <div className="relative">
                    <select
                      {...register('categoryId', { required: true })}
                      disabled={isLoading}
                      className="w-full bg-gray-50 border-none text-sm font-bold py-4 px-6 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select Category</option>
                      {categoriesResponse?.data.map((category) => (
                        <option value={category.id} key={category.id}>{category.categoryName}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 font-bold">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {errors.categoryId && <p className="text-red-500 text-[10px] mt-1 font-bold">Category is required</p>}
                </div>
                <div>
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Price (VND)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₫</span>
                    <input
                      {...register('price', { required: true, min: 0, valueAsNumber: true })}
                      type="number"
                      disabled={isLoading}
                      placeholder="0"
                      className="w-full bg-gray-50 border-none text-sm font-black py-4 pl-10 pr-6 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-mono disabled:opacity-50"
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-[10px] mt-1 font-bold">Price must be 0 or greater</p>}
                </div>
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
    </form>
  );
}
