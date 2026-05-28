import type { ProductWithRelations } from '@/types/product.types'
import type { Variant } from '@/types/variant.types'
import type { Asset } from '@/types/asset.types'

export interface ReadinessChecklistItem {
  label: string
  completed: boolean
  points: number
}

export interface ReadinessResult {
  percentage: number
  canSubmitForReview: boolean
  canPublish: boolean
  checklist: ReadinessChecklistItem[]
}

export function calculateReadiness(
  product: ProductWithRelations,
  variants: Variant[],
  assets: Asset[]
): ReadinessResult {
  const approvedAssets = assets.filter(a => a.status === 'approved')
  const allApproved = assets.length > 0 && assets.every(a => a.status === 'approved')

  const checklist: ReadinessChecklistItem[] = [
    { label: 'Has product name',    completed: !!product.name,                   points: 7  },
    { label: 'Has product code',    completed: !!product.productCode,             points: 7  },
    { label: 'Has description',     completed: !!product.description,             points: 7  },
    { label: 'Has brand',           completed: !!product.brand,                   points: 7  },
    { label: 'Has category',        completed: !!product.category,                points: 7  },
    { label: 'Has target market',   completed: product.targetMarket.length > 0,   points: 6  },
    { label: 'Has season',          completed: !!product.season,                  points: 6  },
    { label: 'Has at least 1 variant',        completed: variants.length >= 1,            points: 20 },
    { label: 'Has at least 1 asset uploaded', completed: assets.length >= 1,              points: 10 },
    { label: 'Has at least 1 approved asset', completed: approvedAssets.length >= 1,      points: 15 },
    { label: 'All assets approved',           completed: allApproved,                     points: 10 },
  ]

  const totalPoints  = checklist.reduce((sum, item) => sum + item.points, 0)
  const earnedPoints = checklist.reduce((sum, item) => sum + (item.completed ? item.points : 0), 0)
  const percentage   = Math.round((earnedPoints / totalPoints) * 100)

  return {
    percentage,
    canSubmitForReview: percentage >= 75,
    canPublish: percentage === 100,
    checklist,
  }
}
