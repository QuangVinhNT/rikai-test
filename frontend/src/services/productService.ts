import axiosInstance from '@/apis/axiosInstance';
import { BaseResponse, Product } from '@/types';

export const productService = {
  getProducts: async (page?: number, limit?: number): Promise<BaseResponse<Product[]>> => {
    const response = await axiosInstance.get(`/products?page=${page || ''}&limit=${limit || ''}`);
    return response.data;
  },

  getProduct: async (id: number): Promise<BaseResponse<Product>> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (formData: FormData): Promise<BaseResponse<Product>> => {
    const response = await axiosInstance.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProduct: async (id: number, formData: FormData): Promise<BaseResponse<Product>> => {
    const response = await axiosInstance.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id: number): Promise<BaseResponse<Product>> => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },
};
