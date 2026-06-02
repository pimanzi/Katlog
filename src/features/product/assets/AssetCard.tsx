import { useNavigate } from 'react-router-dom'
import { FileText, Video, Box, ImageIcon } from 'lucide-react'
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

export function AssetCard({ asset }: { asset: Asset }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/assets/${asset.id}`)}
      className="cursor-pointer rounded-xl border border-border bg-card overflow-hidden hover:shadow-sm transition-shadow"
    >
      <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {asset.assetType === 'image' ? (
          <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
        ) : (
          <AssetTypeIcon type={asset.assetType} />
        )}
      </div>
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
  )
}
