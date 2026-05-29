import { mockProducts } from '@/data/mockProducts'
import { mockBrands } from '@/data/mockBrands'
import { mockCategories } from '@/data/mockCategories'
import type { CreateProductDto, Product, ProductWithRelations, UpdateProductDto } from '@/types/product.types'
import { generateId } from '@/utils/generateId'

// Simulate API delay
const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

const withRelations = (product:  Product): ProductWithRelations => ({
  ...product,
  brand: mockBrands.find(b => b.id === product.brandId)!,
  category: mockCategories.find(c => c.id === product.categoryId)!
})

export const productService = {


  find: async (): Promise<ProductWithRelations[]> => {
    await delay(800)
    return mockProducts.map(withRelations)
  },


  findById: async (id: string): Promise<ProductWithRelations> => {
    await delay(500)
    const product = mockProducts.find(p => p.id === id)
    if (!product) throw new Error('Product not found')
    return withRelations(product)
  },


  create: async (data: CreateProductDto): Promise<ProductWithRelations> => {
    await delay(800)
    const newProduct: Product = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockProducts.push(newProduct) 
    return withRelations(newProduct)
  },

 
  update: async (id: string, data: UpdateProductDto): Promise<ProductWithRelations> => {
    await delay(800)
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Product not found')
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    return withRelations(mockProducts[index])
  },


  delete: async (id: string): Promise<void> => {
    await delay(500)
    const index = mockProducts.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Product not found')
    mockProducts.splice(index, 1) 
  }
}