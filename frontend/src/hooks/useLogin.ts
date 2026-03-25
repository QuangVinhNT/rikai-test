import axiosInstance from '@/apis/axiosInstance';
import { userStore } from '@/stores';
import { LoginType } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {setAuth} = userStore()

  const loginUser = async (payload: LoginType) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post('/login', payload);
      const { data, message } = res.data;
      toast.success(message);
      setAuth(data.user, data.accessToken);
      router.push('/');
      router.refresh();
      return { success: true, message };
    } catch (err: any) {
      const message = err.data.message || 'An error occured!';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, loginUser };
};
