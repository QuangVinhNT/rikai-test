'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { userStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuth, logout } = userStore();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { user } = response.data;
      setAuth(user);
      toast.success(response.message);
      queryClient.clear();
      if (user.role === 'ADMIN') {
        router.replace('/admin/users');
      } else if (user.role === 'USER') {
        router.replace('/');
      }
      router.refresh();
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.clear();
      router.refresh();
      router.push('/login');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      logout();
      queryClient.clear();
      router.push('/login');
      router.refresh();
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  return {
    loginUser: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    registerUser: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logoutUser: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error
  };
};
