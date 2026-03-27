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
  },

  updateUser: async(id: number, payload: Pick<User, 'fullName' | 'email'>): Promise<BaseResponse<Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'role'>>> => {
    const response = await axiosInstance.put(`/users/${id}`, payload);
    return response.data;
  },

  lockUser: async(id: number): Promise<BaseResponse<Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'role'>>> => {
    const response = await axiosInstance.patch(`/users/${id}/lock`);
    return response.data;
  },

  unlockUser: async(id: number): Promise<BaseResponse<Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'role'>>> => {
    const response = await axiosInstance.patch(`/users/${id}/unlock`);
    return response.data;
  },

  deleteUser: async(id: number): Promise<BaseResponse<Pick<User, 'id' | 'username'>>> => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  }
}
