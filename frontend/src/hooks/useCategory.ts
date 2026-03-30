'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services';

export const useCategory = () => {
  const queryClient = useQueryClient();
};

export const useGetCategories = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['categories', page, limit],
    queryFn: () => categoryService.getCategories(page || 1, limit || 10),
    placeholderData: (prev) => prev
  });
};
