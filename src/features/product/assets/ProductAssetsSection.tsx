import { useState } from 'react'
import { Plus, ImageOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetCard } from './AssetCard'
import { UploadAssetModal } from './UploadAssetModal'
import { useProductAssets } from '@/hooks/assets'

const PER_PAGE = 6

export function ProductAssetsSection({ productId }: { productId: string }) {
  const [page, setPage]           = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const { data: assets = [], isLoading } = useProductAssets(productId)

  const totalPages = Math.ceil(assets.length / PER_PAGE)
  const paginated  = assets.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Product Assets</CardTitle>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-text-muted">
                {assets.length}
              </span>
            </div>
            {/* Upload button visible on sm+ only */}
            <Button size="sm" className="hidden sm:flex" onClick={() => setModalOpen(true)}>
              <Plus size={14} /> Upload Asset
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-video rounded-xl" />
              ))}
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
              <ImageOff size={32} className="text-text-muted/50" />
              <p className="text-sm text-text-muted">No product assets yet.</p>
              <Button size="sm" onClick={() => setModalOpen(true)}>
                <Plus size={14} /> Upload Asset
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {paginated.map(asset => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-text-muted">
                    {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, assets.length)} of {assets.length} assets
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
                <Plus size={14} /> Upload Asset
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <UploadAssetModal
        productId={productId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
