import api from '@/lib/axios'
import type { Variant, CreateVariantDto, UpdateVariantDto } from '@/types/variant.types'

export const variantService = {

  findAll: (): Promise<Variant[]> =>
    api.get<Variant[]>('/variants').then(r => r.data),

  findByProduct: (productId: string): Promise<Variant[]> =>
    api.get<Variant[]>(`/products/${productId}/variants`).then(r => r.data),

  create: (data: CreateVariantDto): Promise<Variant> =>
    api.post<Variant>('/variants', data).then(r => r.data),

  update: (id: string, data: UpdateVariantDto): Promise<Variant> =>
    api.patch<Variant>(`/variants/${id}`, data).then(r => r.data),

  delete: (id: string): Promise<void> =>
    api.delete(`/variants/${id}`).then(() => undefined),
}
