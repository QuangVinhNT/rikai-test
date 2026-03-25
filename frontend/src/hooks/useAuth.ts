// hooks/useAuth.ts
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
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
      toast.success(response.message);
      router.push('/');
      router.refresh();
    },
    onError: (error: any) => {
      const message = error.data.message || 'An error occured!';
      toast.error(message);
    }
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      toast.success(response.message);
      router.push('/login')
      router.refresh();
    },
    onError: (error: any) => {
      const message = error.data.message || 'An error occured!';
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
  };
};
