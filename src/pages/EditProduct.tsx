import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useProduct } from '@/hooks/products'
import { useVariants } from '@/hooks/variants'
import { useProductAssets } from '@/hooks/assets'
import { EditProductForm } from '@/features/product/EditProductForm'

export default function EditProduct() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: product,  isLoading } = useProduct(id!)
  const { data: variants = [] }       = useVariants(id!)
  const { data: assets   = [] }       = useProductAssets(id!)

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-sm text-text-muted">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate('/products')}
          className="shrink-0 text-primary hover:text-primary hover:bg-primary/10"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text">Edit Product</h1>
          <p className="text-sm text-text-muted mt-1">Update product information</p>
        </div>
      </div>

      <EditProductForm product={product} variants={variants} assets={assets} />
    </div>
  )
}
