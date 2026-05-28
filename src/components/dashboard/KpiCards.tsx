import { Package, Rocket, Eye, Ban } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface KpiData {
  total:     number
  published: number
  pending:   number
  rejected:  number
}

const CONFIG = [
  { key: 'total'     as const, label: 'Total products',        icon: Package, iconColor: '#3C83F7', iconBg: '#e8f0fe' },
  { key: 'published' as const, label: 'Published products',    icon: Rocket,  iconColor: '#22c55e', iconBg: '#dcfce7' },
  { key: 'pending'   as const, label: 'Pending assets review', icon: Eye,     iconColor: '#f59e0b', iconBg: '#fef3c7' },
  { key: 'rejected'  as const, label: 'Rejected assets',       icon: Ban,     iconColor: '#ef4444', iconBg: '#fee2e2' },
]

interface Props {
  kpi:       KpiData
  isLoading: boolean
}

export default function KpiCards({ kpi, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {CONFIG.map(({ key, label, icon: Icon, iconColor, iconBg }) => (
        <Card key={key} size="sm">
          <CardContent className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: iconBg }}>
              <Icon size={15} style={{ color: iconColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-text leading-none">{kpi[key]}</p>
              <p className="text-sm text-text-muted mt-0.5 truncate">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
