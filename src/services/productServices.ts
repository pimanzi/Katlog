import api from '@/lib/axios'
import type { ProductWithRelations, CreateProductDto, UpdateProductDto } from '@/types/product.types'

export const productService = {

  find: (): Promise<ProductWithRelations[]> =>
    api.get<ProductWithRelations[]>('/products').then(r => r.data),

  findById: (id: string): Promise<ProductWithRelations> =>
    api.get<ProductWithRelations>(`/products/${id}`).then(r => r.data),

  create: (data: CreateProductDto): Promise<ProductWithRelations> =>
    api.post<ProductWithRelations>('/products', data).then(r => r.data),

  update: (id: string, data: UpdateProductDto): Promise<ProductWithRelations> =>
    api.patch<ProductWithRelations>(`/products/${id}`, data).then(r => r.data),

  delete: (id: string): Promise<void> =>
    api.delete(`/products/${id}`).then(() => undefined),
}
