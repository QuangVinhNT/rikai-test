'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services';
import { Category } from '@/types';
import { toast } from 'sonner';

export const useCategory = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'Failed to create category!';
      toast.error(message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Pick<Category, 'categoryName' | 'specificationsKey'>> }) =>
      categoryService.updateCategory(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', response.data.id] });
      toast.success('Category updated successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'Failed to update category!';
      toast.error(message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'Failed to delete category!';
      toast.error(message);
    }
  });

  return {
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};

export const useGetCategories = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['categories', page, limit],
    queryFn: () => categoryService.getCategories(page || 1, limit || 10),
    placeholderData: (prev) => prev
  });
};

export const useGetCategory = (id: number | null) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getCategory(id!),
    enabled: !!id,
    placeholderData: (prev) => prev
  });
};
