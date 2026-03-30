import axiosInstance from '@/apis/axiosInstance';
import { BaseResponse, Category } from '@/types';

export const categoryService = {
  getCategories: async (page?: number, limit?: number): Promise<BaseResponse<Category[]>> => {
    const response = await axiosInstance.get(`/categories?page=${page || ''}&limit=${limit || ''}`);
    return response.data;
  },

  getCategory: async (id: number): Promise<BaseResponse<Category>> => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  // createCategory: async (payload: Partial<Pick<Category, 'name' | 'slug' | 'description'>>): Promise<BaseResponse<Category>> => {
  //   const response = await axiosInstance.post('/categories', payload);
  //   return response.data;
  // },

  // updateCategory: async (id: number, payload: Partial<Pick<Category, 'name' | 'slug' | 'description'>>): Promise<BaseResponse<Category>> => {
  //   const response = await axiosInstance.put(`/categories/${id}`, payload);
  //   return response.data;
  // },

  // deleteCategory: async (id: number): Promise<BaseResponse<{ id: number; name: string }>> => {
  //   const response = await axiosInstance.delete(`/categories/${id}`);
  //   return response.data;
  // }
}
