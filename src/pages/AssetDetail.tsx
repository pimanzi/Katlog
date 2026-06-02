import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetPreview } from '@/features/assets/AssetPreview'
import { AssetMetaCard } from '@/features/assets/AssetMetaCard'
import { AssetRelationships } from '@/features/assets/AssetRelationships'
import { AssetStatusHistory } from '@/features/assets/AssetStatusHistory'
import { useAsset } from '@/hooks/assets'
import { useProduct } from '@/hooks/products'
import { mockVariants } from '@/data/mockVariants'

export default function AssetDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: asset, isLoading, error, refetch } = useAsset(id!)

  const { data: product } = useProduct(asset?.productId ?? '')

  const variant = useMemo(
    () => (asset?.variantId ? mockVariants.find(v => v.id === asset.variantId) : undefined),
    [asset]
  )

  if (isLoading) return <AssetDetailSkeleton />

  if (error || !asset) {
    return (
      <div className="p-4 sm:p-6">
        <Card className="rounded-xl">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-sm text-error">Failed to load asset.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost" size="icon-sm"
          onClick={() => navigate(-1)}
          className="shrink-0 text-primary hover:text-primary hover:bg-primary/10"
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold text-text truncate">{asset.title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 lg:items-start">
        <div className="flex-1 min-w-0">
          <AssetPreview asset={asset} />
        </div>
        <div className="flex-1 min-w-0">
          <AssetMetaCard asset={asset} />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5 md:items-start">
        <div className="flex-1 min-w-0">
          <AssetRelationships product={product} variant={variant} />
        </div>
        <div className="flex-1 min-w-0">
          <AssetStatusHistory history={asset.statusHistory} />
        </div>
      </div>
    </div>
  )
}

function AssetDetailSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-56" />
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <Skeleton className="flex-1 aspect-video rounded-xl" />
        <div className="flex-1 space-y-5">
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <Skeleton className="flex-1 h-36 rounded-xl" />
        <Skeleton className="flex-1 h-36 rounded-xl" />
      </div>
    </div>
  )
}
