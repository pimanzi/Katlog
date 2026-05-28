import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { assetService } from '@/services/assetService'
import type { CreateAssetDto } from '@/types/asset.types'

export function useAssets() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: () => assetService.findAll(),
  })
}

export function useAsset(id: string) {
  return useQuery({
    queryKey: ['assets', id],
    queryFn: () => assetService.findById(id),
    enabled: !!id,
  })
}

export function useProductAssets(productId: string) {
  return useQuery({
    queryKey: ['assets', 'product', productId],
    queryFn: () => assetService.findByProduct(productId),
    enabled: !!productId,
  })
}

export function useVariantAssets(variantId: string) {
  return useQuery({
    queryKey: ['assets', 'variant', variantId],
    queryFn: () => assetService.findByVariant(variantId),
    enabled: !!variantId,
  })
}

export function usePendingAssets() {
  return useQuery({
    queryKey: ['assets', 'pending'],
    queryFn: () => assetService.findPendingReview(),
  })
}

export function useUploadAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ data, file }: { data: CreateAssetDto; file: File }) =>
      assetService.upload(data, file),
    onSuccess: (asset) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'product', asset.productId] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'pending'] })
      if (asset.variantId) {
        queryClient.invalidateQueries({ queryKey: ['assets', 'variant', asset.variantId] })
      }
      toast.success('Asset uploaded')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useApproveAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => assetService.approve(id),
    onSuccess: (asset) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['assets', asset.id] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'pending'] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'product', asset.productId] })
      toast.success('Asset approved')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useRejectAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      assetService.reject(id, reason),
    onSuccess: (asset) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['assets', asset.id] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'pending'] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'product', asset.productId] })
      toast.success('Asset rejected')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteAsset() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string; productId: string; variantId?: string }) =>
      assetService.delete(id),
    onSuccess: (_, { productId, variantId }) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'product', productId] })
      queryClient.invalidateQueries({ queryKey: ['assets', 'pending'] })
      if (variantId) {
        queryClient.invalidateQueries({ queryKey: ['assets', 'variant', variantId] })
      }
      toast.success('Asset deleted')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
