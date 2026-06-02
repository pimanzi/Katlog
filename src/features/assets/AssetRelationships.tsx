import { useNavigate } from 'react-router-dom'
import { ArrowRight, Package, Layers } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ProductWithRelations } from '@/types/product.types'
import type { Variant } from '@/types/variant.types'

interface Props {
  product?: ProductWithRelations
  variant?: Variant
}

export function AssetRelationships({ product, variant }: Props) {
  const navigate = useNavigate()

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Relationships</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {product ? (
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary-light transition-colors text-left group"
          >
            <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 shrink-0">
              <Package size={15} className="text-text-muted group-hover:text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Product</p>
              <p className="text-sm font-medium text-text truncate">{product.name}</p>
              <p className="text-xs text-text-muted">{product.brand?.name} · {product.category?.name}</p>
            </div>
            <ArrowRight size={14} className="text-text-muted group-hover:text-primary shrink-0" />
          </button>
        ) : (
          <p className="text-sm text-text-muted">Product not found.</p>
        )}

        {variant && (
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
            <div className="p-2 rounded-md bg-muted shrink-0">
              <Layers size={15} className="text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Variant</p>
              <p className="text-sm font-medium text-text truncate">{variant.name}</p>
              <p className="text-xs text-text-muted">
                {variant.variantCode} · {variant.colour} · {variant.size}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
