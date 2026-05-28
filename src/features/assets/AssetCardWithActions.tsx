import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreVertical, FileText, Video, Box, ImageIcon, Eye, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useApproveAsset, useRejectAsset } from '@/hooks/assets'
import type { Asset, AssetStatus } from '@/types/asset.types'

const STATUS_STYLES: Record<AssetStatus, string> = {
  pending_review: 'bg-pending-light text-primary',
  approved:       'bg-approved-light text-success-text',
  rejected:       'bg-error-light text-error-text',
}

const STATUS_LABELS: Record<AssetStatus, string> = {
  pending_review: 'Pending',
  approved:       'Approved',
  rejected:       'Rejected',
}

function AssetTypeIcon({ type }: { type: string }) {
  const cls = 'text-text-muted'
  if (type === 'video')    return <Video    size={28} className={cls} />
  if (type === 'document') return <FileText size={28} className={cls} />
  if (type === '3d')       return <Box      size={28} className={cls} />
  return <ImageIcon size={28} className={cls} />
}

export function AssetCardWithActions({ asset }: { asset: Asset }) {
  const navigate    = useNavigate()
  const approve     = useApproveAsset()
  const reject      = useRejectAsset()
  const [popover, setPopover]     = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [reason, setReason]       = useState('')

  const handleApprove = () => {
    setPopover(false)
    approve.mutate(asset.id)
  }

  const handleReject = () => {
    if (!reason.trim()) return
    reject.mutate(
      { id: asset.id, reason: reason.trim() },
      { onSuccess: () => { setRejectOpen(false); setReason('') } }
    )
  }

  return (
    <>
      <div
        onClick={() => navigate(`/assets/${asset.id}`)}
        className="relative cursor-pointer rounded-xl border border-border bg-card overflow-hidden hover:shadow-sm transition-shadow"
      >
     
        <div className="absolute top-2 right-2 z-10" onClick={e => e.stopPropagation()}>
          <Popover open={popover} onOpenChange={setPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost" size="icon-sm"
                className="bg-card/80 backdrop-blur-sm hover:bg-card shadow-sm"
              >
                <MoreVertical size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-36 p-1">
              <button
                onClick={() => { setPopover(false); navigate(`/assets/${asset.id}`) }}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-text rounded-md hover:bg-primary hover:text-white transition-colors group"
              >
                <Eye size={13} className="text-text-muted group-hover:text-white" /> View
              </button>
              <button
                onClick={handleApprove}
                disabled={approve.isPending || asset.status === 'approved'}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-text rounded-md hover:bg-primary hover:text-white transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle size={13} className="text-success-text group-hover:text-white" /> Approve
              </button>
              <button
                onClick={() => { setPopover(false); setRejectOpen(true) }}
                disabled={asset.status === 'rejected'}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-text rounded-md hover:bg-error hover:text-white transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <XCircle size={13} className="text-error group-hover:text-white" /> Reject
              </button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Thumbnail */}
        <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
          {asset.assetType === 'image' ? (
            <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
          ) : (
            <AssetTypeIcon type={asset.assetType} />
          )}
        </div>

        {/* Info */}
        <div className="p-2.5 space-y-1.5">
          <p className="text-xs font-medium text-text truncate">{asset.title}</p>
          <div className="flex items-center justify-between gap-1">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_STYLES[asset.status]}`}>
              {STATUS_LABELS[asset.status]}
            </span>
            <span className="text-[10px] text-text-muted">
              {new Date(asset.uploadedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Reject dialog */}
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
              onClick={handleReject}
              disabled={!reason.trim() || reject.isPending}
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
