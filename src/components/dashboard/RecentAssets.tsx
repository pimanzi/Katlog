import { Image as ImageIcon, FileText, Video, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'

const recentAssets = [
  { name: 'nike-air-max-red.jpg', icon: ImageIcon, iconColor: '#3C83F7', iconBg: '#e8f0fe', time: '2h ago',  status: 'Pending'  },
  { name: 'spec-sheet-v2.pdf',    icon: FileText,  iconColor: '#22c55e', iconBg: '#dcfce7', time: '5h ago',  status: 'Approved' },
  { name: 'campaign-video.mp4',   icon: Video,     iconColor: '#ef4444', iconBg: '#fee2e2', time: '1d ago',  status: 'Rejected' },
]

export default function RecentAssets() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Recent assets</CardTitle>
        <CardAction>
          <button className="text-[11px] font-medium text-primary hover:text-primary-dark transition-colors">
            View all
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {recentAssets.map(asset => (
            <div key={asset.name} className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: asset.iconBg }}>
                <asset.icon size={14} style={{ color: asset.iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-text truncate">{asset.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={10} className="text-text-muted shrink-0" />
                  <span className="text-[10px] text-text-muted">{asset.time}</span>
                </div>
              </div>
              <StatusBadge status={asset.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
