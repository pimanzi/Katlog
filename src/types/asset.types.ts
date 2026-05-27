export type AssetStatus =
  'pending_review' | 'approved' | 'rejected'

export type AssetType =
  'image' | 'video' | 'document' | '3d'

export interface StatusHistory {
  status: AssetStatus
  changedAt: string
  reason?: string       
}

export interface Asset {
  // REQUIRED
  id: string
  productId: string
  assetType: AssetType
  title: string
  description: string
  status: AssetStatus
  url: string
  variantId?: string
  tags?: string[]
  rejectionReason?: string
  uploadedAt: string
  statusHistory: StatusHistory[]
}

export interface CreateAssetDto {
  productId: string
  variantId?: string
  assetType: import('./asset.types').AssetType
  title: string
  description: string
  tags?: string[]
}

export interface UpdateAssetStatusDto {
  status: import('./asset.types').AssetStatus
  reason?: string
}