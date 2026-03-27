'use client';
import { userService } from '@/services';
import { User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUser = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number, payload: Partial<Pick<User, 'fullName' | 'email' | 'password'>>; }) => userService.updateUser(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', response.data.id] });
      toast.success('Update user successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const lockMutation = useMutation({
    mutationFn: userService.lockUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', response.data.id] });
      toast.success('Lock user successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const unlockMutation = useMutation({
    mutationFn: userService.unlockUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', response.data.id] });
      toast.success('Unlock user successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', response.data.id] });
      toast.success('Delete user successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  return {
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    lockUser: lockMutation.mutate,
    isLocking: lockMutation.isPending,
    unlockUser: unlockMutation.mutate,
    isUnlocking: unlockMutation.isPending,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};

export const useGetUsers = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userService.getUsers(page || 1, limit || 10),
    placeholderData: (prev) => prev
  });
};

export const useGetUser = (id: number | null) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id!),
    enabled: !!id,
    placeholderData: (prev) => prev
  });
};
