import { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useApproveAsset, useRejectAsset } from '@/hooks/assets'
import type { Asset, AssetType, AssetStatus } from '@/types/asset.types'

const TYPE_LABELS: Record<AssetType, string> = {
  image: 'Image', video: 'Video', document: 'Document', '3d': '3D',
}

const STATUS_STYLES: Record<AssetStatus, string> = {
  pending_review: 'bg-pending-light text-primary',
  approved:       'bg-approved-light text-success-text',
  rejected:       'bg-error-light text-error-text',
}

const STATUS_LABELS: Record<AssetStatus, string> = {
  pending_review: 'Pending Review',
  approved:       'Approved',
  rejected:       'Rejected',
}

export function AssetMetaCard({ asset }: { asset: Asset }) {
  const approve = useApproveAsset()
  const reject  = useRejectAsset()
  const [rejectOpen, setRejectOpen] = useState(false)
  const [reason, setReason]         = useState('')

  const handleReject = () => {
    if (!reason.trim()) return
    reject.mutate(
      { id: asset.id, reason: reason.trim() },
      { onSuccess: () => { setRejectOpen(false); setReason('') } }
    )
  }

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="Title">
            <p className="text-sm font-medium text-text">{asset.title}</p>
          </Row>

          {asset.description && (
            <Row label="Description">
              <p className="text-sm text-text leading-relaxed">{asset.description}</p>
            </Row>
          )}

          <Row label="Type">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-text-muted">
              {TYPE_LABELS[asset.assetType]}
            </span>
          </Row>

          {asset.tags && asset.tags.length > 0 && (
            <Row label="Tags">
              <div className="flex flex-wrap gap-1.5">
                {asset.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </Row>
          )}

          <Row label="Uploaded">
            <p className="text-sm text-text">
              {new Date(asset.uploadedAt).toLocaleDateString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric',
              })}{' '}
              <span className="text-text-muted text-xs">
                {new Date(asset.uploadedAt).toLocaleTimeString('en-GB', {
                  hour: '2-digit', minute: '2-digit',
                })}
              </span>
            </p>
          </Row>

          <Row label="Status">
            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[asset.status]}`}>
              {STATUS_LABELS[asset.status]}
            </span>
          </Row>

          {asset.status === 'rejected' && asset.rejectionReason && (
            <div className="flex gap-2.5 p-3 rounded-lg bg-error-light border border-error/20">
              <AlertTriangle size={14} className="text-error shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-error mb-0.5">Rejection Reason</p>
                <p className="text-sm text-error-text">{asset.rejectionReason}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              className="flex-1"
              disabled={asset.status === 'approved' || approve.isPending}
              onClick={() => approve.mutate(asset.id)}
            >
              <CheckCircle size={14} />
              {approve.isPending ? 'Approving...' : 'Approve'}
            </Button>
            <Button
              className="flex-1 bg-error hover:bg-error/90 text-white"
              disabled={asset.status === 'rejected' || reject.isPending}
              onClick={() => setRejectOpen(true)}
            >
              <XCircle size={14} />
              Reject
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={rejectOpen} onOpenChange={open => { if (!open) { setRejectOpen(false); setReason('') } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject asset?</DialogTitle>
            <DialogDescription>
              Provide a reason so the uploader knows what to fix.
            </DialogDescription>
          </DialogHeader>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Rejection reason..."
            rows={3}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/20 resize-none"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => { setRejectOpen(false); setReason('') }}>
              Cancel
            </Button>
            <Button
              disabled={!reason.trim() || reject.isPending}
              onClick={handleReject}
              className="bg-error hover:bg-error/90 text-white"
            >
              {reject.isPending ? 'Rejecting...' : 'Reject'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{label}</p>
      {children}
    </div>
  )
}
