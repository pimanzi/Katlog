import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productService } from '@/services/productServices'
import type { CreateProductDto, UpdateProductDto, ProductStatus } from '@/types/product.types'

const STATUS_TOAST: Partial<Record<ProductStatus, string>> = {
  review:    'Product submitted for review',
  published: 'Product published',
  archived:  'Product archived',
  draft:     'Product restored to draft',
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.find(),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productService.findById(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProductDto) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product created')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
      productService.update(id, data),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products', product.id] })
      toast.success('Product updated')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateProductStatus(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (status: ProductStatus) => productService.update(id, { status }),
    onSuccess: (_, status) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products', id] })
      toast.success(STATUS_TOAST[status] ?? 'Status updated')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
