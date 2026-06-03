import api from '@/lib/axios'
import type { Asset, CreateAssetDto, UpdateAssetStatusDto } from '@/types/asset.types'

export const assetService = {

  findAll: (): Promise<Asset[]> =>
    api.get<Asset[]>('/assets').then(r => r.data),

  findById: (id: string): Promise<Asset> =>
    api.get<Asset>(`/assets/${id}`).then(r => r.data),

  findByProduct: (productId: string): Promise<Asset[]> =>
    api.get<Asset[]>(`/products/${productId}/assets`).then(r => r.data),

  findByVariant: (variantId: string): Promise<Asset[]> =>
    api.get<Asset[]>(`/variants/${variantId}/assets`).then(r => r.data),

  findPendingReview: (): Promise<Asset[]> =>
    api.get<Asset[]>('/assets/pending').then(r => r.data),

  upload: async (data: CreateAssetDto, file: File): Promise<Asset> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('data', JSON.stringify(data))
    const response = await api.post<Asset>('/assets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  approve: (id: string): Promise<Asset> =>
    api.patch<Asset>(`/assets/${id}/approve`).then(r => r.data),

  reject: (id: string, reason: string): Promise<Asset> =>
    api.patch<Asset>(`/assets/${id}/reject`, { reason }).then(r => r.data),

  delete: (id: string): Promise<void> =>
    api.delete(`/assets/${id}`).then(() => undefined),
}

export type { UpdateAssetStatusDto }
