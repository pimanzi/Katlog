import { useState } from 'react'
import { Plus, ImageOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetCard } from './AssetCard'
import { UploadAssetModal } from './UploadAssetModal'
import { useVariantAssets } from '@/hooks/assets'
import type { Variant } from '@/types/variant.types'

const PER_PAGE = 6

interface GroupProps {
  productId: string
  variant: Variant
}

function VariantAssetGroup({ productId, variant }: GroupProps) {
  const [page, setPage]           = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const { data: assets = [], isLoading } = useVariantAssets(variant.id)

  const totalPages = Math.ceil(assets.length / PER_PAGE)
  const paginated  = assets.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <div className="space-y-3">
        {/* Row: variant name + upload button (desktop only) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              {variant.name}
            </p>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-text-muted">
              {assets.length}
            </span>
          </div>
          {/* Upload button visible on sm+ */}
          <Button size="sm" className="hidden sm:flex" onClick={() => setModalOpen(true)}>
            <Plus size={13} /> Upload
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-xl" />
            ))}
          </div>
        ) : assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 gap-2 rounded-xl border border-dashed border-border text-center">
            <ImageOff size={22} className="text-text-muted/50" />
            <p className="text-xs text-text-muted">No assets for this variant yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {paginated.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-text-muted">
              {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, assets.length)} of {assets.length}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Full-width upload button on mobile */}
        <Button className="w-full sm:hidden" onClick={() => setModalOpen(true)}>
          <Plus size={13} /> Upload Asset
        </Button>
      </div>

      <UploadAssetModal
        productId={productId}
        variantId={variant.id}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

interface Props {
  productId: string
  variants: Variant[]
}

export function VariantAssetsSection({ productId, variants }: Props) {
  const count = variants.length

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">Variant Assets</CardTitle>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-text-muted">
            {count} variant{count !== 1 ? 's' : ''}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {variants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
            <p className="text-sm text-text-muted">Add variants to manage their assets here.</p>
          </div>
        ) : (
          <div className="space-y-6 divide-y divide-border">
            {variants.map((variant, i) => (
              <div key={variant.id} className={i > 0 ? 'pt-6' : ''}>
                <VariantAssetGroup productId={productId} variant={variant} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
