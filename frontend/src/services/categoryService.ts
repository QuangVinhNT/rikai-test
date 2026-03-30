import axiosInstance from '@/apis/axiosInstance';
import { BaseResponse, Category } from '@/types';

export const categoryService = {
  getCategories: async (page?: number, limit?: number, search?: string): Promise<BaseResponse<Category[]>> => {
    const params = new URLSearchParams();
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));
    if (search) params.append('search', search);

    const response = await axiosInstance.get(`/categories?${params.toString()}`);
    return response.data;
  },

  getCategory: async (id: number): Promise<BaseResponse<Category>> => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (payload: Partial<Pick<Category, 'categoryName' | 'specificationsKey'>>): Promise<BaseResponse<Category>> => {
    const response = await axiosInstance.post('/categories', payload);
    return response.data;
  },

  updateCategory: async (id: number, payload: Partial<Pick<Category, 'categoryName'
    | 'specificationsKey'>>): Promise<BaseResponse<Category>> => {
    const response = await axiosInstance.put(`/categories/${id}`, payload);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<BaseResponse<{ id: number; name: string; }>> => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  }
};
