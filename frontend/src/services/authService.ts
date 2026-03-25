import axiosInstance from '@/apis/axiosInstance';
import { LoginResponse, LoginType, RegisterType } from '@/types';
import { RegisterResponse } from '@/types/auth';

export const authService = {
  register: async (payload: RegisterType): Promise<RegisterResponse> => {
    const response = await axiosInstance.post('/register', payload);
    return response.data;
  },
  login: async (payload: LoginType): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/login', payload);
    return response.data;
  },
  logout: async (refreshToken: string): Promise<{message: string}> => {
    const response = await axiosInstance.post('/logout', refreshToken);
    return response.data;
  }
}
