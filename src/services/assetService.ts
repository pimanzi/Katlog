import { mockAssets } from '@/data/mockAssets'
import { generateId } from '@/utils/generateId'
import { uploadFile } from '@/services/cloudinaryService'
import type { Asset, CreateAssetDto, UpdateAssetStatusDto } from '@/types/asset.types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const assetService = {

  findAll: async (): Promise<Asset[]> => {
    await delay(600)
    return [...mockAssets].sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )
  },

  findById: async (id: string): Promise<Asset> => {
    await delay(400)
    const asset = mockAssets.find(a => a.id === id)
    if (!asset) throw new Error('Asset not found')
    return asset
  },

  findByProduct: async (productId: string): Promise<Asset[]> => {
    await delay(600)
    return mockAssets
      .filter(a => a.productId === productId && !a.variantId)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
  },

  findByVariant: async (variantId: string): Promise<Asset[]> => {
    await delay(600)
    return mockAssets
      .filter(a => a.variantId === variantId)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
  },

  findPendingReview: async (): Promise<Asset[]> => {
    await delay(600)
    return mockAssets
      .filter(a => a.status === 'pending_review')
      .sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
  },

  upload: async (data: CreateAssetDto, file: File): Promise<Asset> => {
    const cloudinaryResult = await uploadFile(file, 'assets')
    const newAsset: Asset = {
      id: generateId(),
      productId: data.productId,
      variantId: data.variantId,
      assetType: data.assetType,
      title: data.title,
      description: data.description,
      tags: data.tags ?? [],
      status: 'pending_review',
      url: cloudinaryResult.url,
      uploadedAt: new Date().toISOString(),
      rejectionReason: undefined,
      statusHistory: [
        { status: 'pending_review', changedAt: new Date().toISOString() },
      ],
    }
    mockAssets.push(newAsset)
    return newAsset
  },

  approve: async (id: string): Promise<Asset> => {
    await delay(600)
    const index = mockAssets.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Asset not found')
    mockAssets[index].status = 'approved'
    mockAssets[index].rejectionReason = undefined
    mockAssets[index].statusHistory.push({
      status: 'approved',
      changedAt: new Date().toISOString(),
    })
    return mockAssets[index]
  },

  reject: async (id: string, reason: string): Promise<Asset> => {
    await delay(600)
    const index = mockAssets.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Asset not found')
    mockAssets[index].status = 'rejected'
    mockAssets[index].rejectionReason = reason
    mockAssets[index].statusHistory.push({
      status: 'rejected',
      changedAt: new Date().toISOString(),
      reason,
    })
    return mockAssets[index]
  },

  delete: async (id: string): Promise<void> => {
    await delay(500)
    const index = mockAssets.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Asset not found')
    mockAssets.splice(index, 1)
  },
}

export type { UpdateAssetStatusDto }
