import { useNavigate } from 'react-router-dom'
import { ArrowRight, FileText, Video, Box, ImageIcon, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { AssetType } from '@/types/asset.types'

export interface ReviewQueueItem {
  id:        string
  file:      string
  product:   string
  waiting:   string
  urgent:    boolean
  url:       string
  assetType: AssetType
}

const ICON_MAP: Record<AssetType, { icon: typeof ImageIcon; color: string; bg: string }> = {
  image:    { icon: ImageIcon, color: '#3C83F7', bg: '#e8f0fe' },
  video:    { icon: Video,     color: '#ef4444', bg: '#fee2e2' },
  document: { icon: FileText,  color: '#22c55e', bg: '#dcfce7' },
  '3d':     { icon: Box,       color: '#f59e0b', bg: '#fef3c7' },
}

interface Props {
  items:        ReviewQueueItem[]
  totalPending: number
  isLoading:    boolean
}

export default function ReviewQueue({ items, totalPending, isLoading }: Props) {
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
        <div className="flex items-center gap-2">
          <CardTitle className="text-base!">Review queue</CardTitle>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-warning-light text-warning-text text-[10px] font-semibold">
            {totalPending} pending
          </span>
        </div>
        <CardAction>
          <button
            onClick={() => navigate('/assets?status=pending_review')}
            className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View all <ArrowRight size={12} />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <p className="text-xs text-text-muted text-center py-6">No assets pending review.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.map(item => {
              const { icon: Icon, color, bg } = ICON_MAP[item.assetType]
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/assets/${item.id}`)}
                  className="flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-sm transition-shadow text-left"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                    {item.assetType === 'image' ? (
                      <img src={item.url} alt={item.file} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                    )}
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="text-[11px] font-medium text-text truncate">{item.file}</p>
                    <p className="text-[10px] text-text-muted truncate">{item.product}</p>
                    <div className="flex items-center gap-1">
                      <Clock size={9} className="text-text-muted shrink-0" />
                      <span className="text-[10px] text-text-muted">{item.waiting}</span>
                      {item.urgent && (
                        <span className="ml-auto text-[9px] font-semibold text-error-text bg-error-light px-1.5 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
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
