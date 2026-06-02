import { mockVariants } from '@/data/mockVariants'
import { generateId } from '@/utils/generateId'
import type { Variant, CreateVariantDto, UpdateVariantDto } from '@/types/variant.types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const variantService = {

  findAll: async (): Promise<Variant[]> => {
    await delay(400)
    return [...mockVariants]
  },

  findByProduct: async (productId: string): Promise<Variant[]> => {
    await delay(600)
    return mockVariants.filter(v => v.productId === productId)
  },

  create: async (data: CreateVariantDto): Promise<Variant> => {
    await delay(800)
    const newVariant: Variant = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockVariants.push(newVariant)
    return newVariant
  },

  update: async (id: string, data: UpdateVariantDto): Promise<Variant> => {
    await delay(800)
    const index = mockVariants.findIndex(v => v.id === id)
    if (index === -1) throw new Error('Variant not found')
    mockVariants[index] = {
      ...mockVariants[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    return mockVariants[index]
  },

  delete: async (id: string): Promise<void> => {
    await delay(500)
    const index = mockVariants.findIndex(v => v.id === id)
    if (index === -1) throw new Error('Variant not found')
    mockVariants.splice(index, 1)
  },
}
