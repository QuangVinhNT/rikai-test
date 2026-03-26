'use client';
import { userService } from '@/services';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const queryClient = useQueryClient();
};

export const useGetUsers = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['user', page, limit],
    queryFn: () => userService.getUsers(page || 1, limit || 10),
    placeholderData: (prev) => prev
  });
};
