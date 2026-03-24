import { useState } from 'react';
import { RegisterType } from '@/types';
import axiosInstance from '@/apis/axiosInstance';
import { toast } from 'sonner';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (payload: RegisterType) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post('/register', payload);
      const result = { success: true, data: res.data };
      toast.success(result.data.message);
      return result;
    } catch (err: any) {
      const message = err.data.message || 'Đã có lỗi xảy ra';
      setError(message);
      toast.error(message)
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, error };
};
