'use client';
import { productService } from '@/services';
import { Product } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useProduct = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Create product successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number, payload: Partial<Product> }) => productService.updateProduct(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', response.data.id] });
      toast.success('Update product successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Delete product successfully!');
    },
    onError: (error: any) => {
      const message = error?.data?.message || 'An error occured!';
      toast.error(message);
    }
  });

  return {
    createProduct: createMutation.mutate,
    createProductAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};

export const useGetProducts = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => productService.getProducts(page || 1, limit || 10),
    placeholderData: (prev) => prev
  });
};

export const useGetProduct = (id: number | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id!),
    enabled: !!id,
    placeholderData: (prev) => prev
  });
};
