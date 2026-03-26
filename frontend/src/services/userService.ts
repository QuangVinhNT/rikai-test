import axiosInstance from '@/apis/axiosInstance';
import { BaseResponse, User } from '@/types';

export const userService = {
  getUsers: async (page?: number, limit?: number): Promise<BaseResponse<Omit<User, 'password' | 'updatedAt'>[]>> => {
    const response = await axiosInstance.get(`/users?page=${page || ''}&limit=${limit || ''}`);
    return response.data;
  },

  getUser: async (id: number): Promise<BaseResponse<Omit<User, 'password' | 'createdAt' | 'updatedAt'>>> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  }
}
