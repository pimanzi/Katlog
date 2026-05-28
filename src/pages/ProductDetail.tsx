import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { ProductStatusBadge } from '@/features/product/ProductStatusBadge'
import { ProductInfo } from '@/features/product/detail/ProductInfo'
import { ReadinessChecklist } from '@/features/product/detail/ReadinessChecklist'
import { ProductActions } from '@/features/product/detail/ProductActions'
import { VariantsSection } from '@/features/product/variants/VariantsSection'
import { ProductAssetsSection } from '@/features/product/assets/ProductAssetsSection'
import { VariantAssetsSection } from '@/features/product/assets/VariantAssetsSection'
import { useProduct } from '@/hooks/products'
import { useVariants } from '@/hooks/variants'
import { useAssets } from '@/hooks/assets'
import { calculateReadiness } from '@/utils/calculateReadiness'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading: isLoadingProduct,
    error: productError,
    refetch,
  } = useProduct(id!)

  const { data: variants = [], isLoading: isLoadingVariants } = useVariants(id!)
  const { data: allAssets = [] } = useAssets()

  const allProductAssets = useMemo(
    () => allAssets.filter(a => a.productId === id),
    [allAssets, id]
  )

  const readiness = useMemo(
    () => (product ? calculateReadiness(product, variants, allProductAssets) : null),
    [product, variants, allProductAssets]
  )

  if (isLoadingProduct) {
    return (
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-56" />
        </div>
        <Skeleton className="h-52 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="flex gap-5">
          <Skeleton className="flex-1 h-56 rounded-xl" />
          <Skeleton className="w-64 h-56 rounded-xl" />
        </div>
      </div>
    )
  }

  if (productError || !product) {
    return (
      <div className="p-4 sm:p-6">
        <Card className="rounded-xl">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-sm text-error">Failed to load product.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate('/products')}
            className="shrink-0 text-primary hover:text-primary hover:bg-primary/10"
          >
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-xl font-bold text-text truncate">{product.name}</h1>
            <ProductStatusBadge status={product.status} />
          </div>
        </div>
        <Button size="sm" onClick={() => navigate(`/products/${id}/edit`)} className="shrink-0">
          <Pencil size={14} />
          Edit
        </Button>
      </div>

      {/* Full-width content */}
      <ProductInfo product={product} />

      <VariantsSection
        productId={id!}
        variants={variants}
        isLoading={isLoadingVariants}
      />

      <ProductAssetsSection productId={id!} />

      <VariantAssetsSection productId={id!} variants={variants} />

      {/* Readiness + Actions at bottom */}
      {readiness && (
        <div className="flex flex-col md:flex-row gap-5 md:items-start">
          <div className="flex-1 min-w-0">
            <ReadinessChecklist result={readiness} />
          </div>
          <div className="w-full md:w-64 shrink-0">
            <ProductActions product={product} readiness={readiness} />
          </div>
        </div>
      )}
    </div>
  )
}
