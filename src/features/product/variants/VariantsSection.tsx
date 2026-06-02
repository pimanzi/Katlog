import { useState } from 'react'
import { Plus, Pencil, Trash2, PackageOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { VariantModal } from './VariantModal'
import { useDeleteVariant } from '@/hooks/variants'
import type { Variant } from '@/types/variant.types'

const PER_PAGE = 5

interface Props {
  productId: string
  variants: Variant[]
  isLoading: boolean
}

export function VariantsSection({ productId, variants, isLoading }: Props) {
  const [page, setPage]                     = useState(1)
  const [modalOpen, setModalOpen]           = useState(false)
  const [editVariant, setEditVariant]       = useState<Variant | undefined>()
  const [deleteTarget, setDeleteTarget]     = useState<Variant | null>(null)
  const deleteVariant = useDeleteVariant()

  const totalPages = Math.ceil(variants.length / PER_PAGE)
  const paginated  = variants.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openAdd  = () => { setEditVariant(undefined); setModalOpen(true) }
  const openEdit = (v: Variant) => { setEditVariant(v); setModalOpen(true) }

  const confirmDelete = () => {
    if (!deleteTarget) return
    deleteVariant.mutate(
      { id: deleteTarget.id, productId },
      { onSuccess: () => setDeleteTarget(null) }
    )
  }

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Variants</CardTitle>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-text-muted">
                {variants.length}
              </span>
            </div>
            <Button size="sm" className="hidden sm:flex" onClick={openAdd}>
              <Plus size={14} /> Add Variant
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : variants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center px-4">
              <PackageOpen size={32} className="text-text-muted/50" />
              <p className="text-sm text-text-muted">No variants yet. Add one to get started.</p>
              <Button size="sm" onClick={openAdd}>
                <Plus size={14} /> Add Variant
              </Button>
            </div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left text-xs font-semibold text-text-muted px-4 py-2.5">Name</th>
                    <th className="text-left text-xs font-semibold text-text-muted px-4 py-2.5 hidden sm:table-cell">Code</th>
                    <th className="text-left text-xs font-semibold text-text-muted px-4 py-2.5">Colour</th>
                    <th className="text-left text-xs font-semibold text-text-muted px-4 py-2.5 hidden sm:table-cell">Size</th>
                    <th className="text-left text-xs font-semibold text-text-muted px-4 py-2.5 hidden md:table-cell">Material</th>
                    <th className="text-left text-xs font-semibold text-text-muted px-4 py-2.5 hidden lg:table-cell">Barcode</th>
                    <th className="w-16" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginated.map(v => (
                    <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-text">{v.name}</td>
                      <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{v.variantCode}</td>
                      <td className="px-4 py-3 text-text-muted">{v.colour}</td>
                      <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{v.size}</td>
                      <td className="px-4 py-3 text-text-muted hidden md:table-cell">{v.material}</td>
                      <td className="px-4 py-3 text-text-muted hidden lg:table-cell">{v.barcode ?? '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            variant="ghost" size="icon-sm"
                            onClick={() => openEdit(v)}
                            className="text-text-muted hover:text-text"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            variant="ghost" size="icon-sm"
                            onClick={() => setDeleteTarget(v)}
                            className="text-text-muted hover:text-error"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm">
                  <span className="text-xs text-text-muted">
                    {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, variants.length)} of {variants.length} variants
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

              {/* Full-width Add Variant button on mobile */}
              <div className="px-4 pb-4 pt-3 sm:hidden">
                <Button className="w-full" onClick={openAdd}>
                  <Plus size={14} /> Add Variant
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <VariantModal
        productId={productId}
        variant={editVariant}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <Dialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete variant?</DialogTitle>
            <DialogDescription>
              "{deleteTarget?.name}" will be permanently removed. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button
              onClick={confirmDelete}
              disabled={deleteVariant.isPending}
              className="bg-error hover:bg-error/90 text-white"
            >
              {deleteVariant.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
