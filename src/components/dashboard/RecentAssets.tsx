import { useNavigate } from 'react-router-dom'
import { FileText, Video, Box, ImageIcon, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { timeAgo } from '@/utils/dateUtils'
import type { Asset, AssetStatus, AssetType } from '@/types/asset.types'

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
const ICON_MAP: Record<AssetType, { icon: typeof ImageIcon; color: string; bg: string }> = {
  image:    { icon: ImageIcon, color: '#3C83F7', bg: '#e8f0fe' },
  video:    { icon: Video,     color: '#ef4444', bg: '#fee2e2' },
  document: { icon: FileText,  color: '#22c55e', bg: '#dcfce7' },
  '3d':     { icon: Box,       color: '#f59e0b', bg: '#fef3c7' },
}

interface Props {
  assets:    Asset[]
  isLoading: boolean
}

export default function RecentAssets({ assets, isLoading }: Props) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Card size="sm">
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base!">Recent assets</CardTitle>
        <CardAction>
          <button
            onClick={() => navigate('/assets')}
            className="text-[11px] font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View all
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {assets.length === 0 ? (
          <p className="text-xs text-text-muted text-center py-6">No assets yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {assets.map(asset => {
              const { icon: Icon, color, bg } = ICON_MAP[asset.assetType]
              return (
                <button
                  key={asset.id}
                  onClick={() => navigate(`/assets/${asset.id}`)}
                  className="flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-sm transition-shadow text-left"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                    {asset.assetType === 'image' ? (
                      <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                    )}
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="text-[11px] font-medium text-text truncate">{asset.title}</p>
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_STYLES[asset.status]}`}>
                        {STATUS_LABELS[asset.status]}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Clock size={9} className="text-text-muted shrink-0" />
                        <span className="text-[10px] text-text-muted">{timeAgo(asset.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
