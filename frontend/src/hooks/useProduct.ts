'use client';
import { productService } from '@/services';
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
    mutationFn: ({ id, formData }: { id: number, formData: FormData }) => productService.updateProduct(id, formData),
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

export const useGetProducts = (
  page?: number,
  limit?: number,
  search?: string,
  categoryId?: number,
) => {
  return useQuery({
    queryKey: ['products', page, limit, search, categoryId],
    queryFn: () => productService.getProducts(page, limit, search, categoryId),
    placeholderData: (prev) => prev,
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
