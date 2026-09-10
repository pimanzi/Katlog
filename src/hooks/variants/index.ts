import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { variantService } from '@/services/variantService'
import type { CreateVariantDto, UpdateVariantDto } from '@/types/variant.types'

export function useAllVariants() {
  return useQuery({
    queryKey: ['variants'],
    queryFn: () => variantService.findAll(),
  })
}

export function useVariants(productId: string) {
  return useQuery({
    queryKey: ['variants', productId],
    queryFn: () => variantService.findByProduct(productId),
    enabled: !!productId,
  })
}

export function useCreateVariant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateVariantDto) => variantService.create(data),
    onSuccess: (variant) => {
      queryClient.invalidateQueries({ queryKey: ['variants'] })
      queryClient.invalidateQueries({ queryKey: ['variants', variant.productId] })
      toast.success('Variant created')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateVariant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVariantDto }) =>
      variantService.update(id, data),
    onSuccess: (variant) => {
      queryClient.invalidateQueries({ queryKey: ['variants'] })
      queryClient.invalidateQueries({ queryKey: ['variants', variant.productId] })
      toast.success('Variant updated')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteVariant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string; productId: string }) => variantService.delete(id),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['variants'] })
      queryClient.invalidateQueries({ queryKey: ['variants', productId] })
      toast.success('Variant deleted')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
