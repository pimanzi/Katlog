import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useUpdateProductStatus } from '@/hooks/products'
import type { ProductWithRelations } from '@/types/product.types'
import type { ReadinessResult } from '@/utils/calculateReadiness'

interface Props {
  product: ProductWithRelations
  readiness: ReadinessResult
}

export function ProductActions({ product, readiness }: Props) {
  const navigate = useNavigate()
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
  const updateStatus = useUpdateProductStatus(product.id)

  const handleSubmitForReview = () => updateStatus.mutate('review')
  const handlePublish = () => updateStatus.mutate('published')
  const handleRestoreToDraft = () => updateStatus.mutate('draft')
  const handleArchive = () => {
    updateStatus.mutate('archived', {
      onSuccess: () => navigate('/products'),
    })
  }

  const { status } = product
  const { canSubmitForReview, canPublish } = readiness

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {status === 'draft' && (
            <>
              <div className="space-y-1">
                <Button
                  className="w-full"
                  disabled={!canSubmitForReview || updateStatus.isPending}
                  onClick={handleSubmitForReview}
                >
                  Submit for Review
                </Button>
                {!canSubmitForReview && (
                  <p className="text-[11px] text-text-muted text-center">
                    Reach 75% readiness to submit
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                onClick={() => setArchiveDialogOpen(true)}
                disabled={updateStatus.isPending}
              >
                Archive Product
              </Button>
            </>
          )}

          {status === 'review' && (
            <>
              <div className="space-y-1">
                <Button
                  className="w-full"
                  disabled={!canPublish || updateStatus.isPending}
                  onClick={handlePublish}
                >
                  Publish Product
                </Button>
                {!canPublish && (
                  <p className="text-[11px] text-text-muted text-center">
                    Reach 100% readiness to publish
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                onClick={() => setArchiveDialogOpen(true)}
                disabled={updateStatus.isPending}
              >
                Archive Product
              </Button>
            </>
          )}

          {status === 'published' && (
            <Button
              className="w-full"
              onClick={() => setArchiveDialogOpen(true)}
              disabled={updateStatus.isPending}
            >
              Archive Product
            </Button>
          )}

          {status === 'archived' && (
            <Button
              className="w-full"
              onClick={handleRestoreToDraft}
              disabled={updateStatus.isPending}
            >
              Restore to Draft
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive product?</DialogTitle>
            <DialogDescription>
              This will hide the product from the active catalog. You can restore it later.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setArchiveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleArchive}
              disabled={updateStatus.isPending}
            >
              {updateStatus.isPending ? 'Archiving...' : 'Archive'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
