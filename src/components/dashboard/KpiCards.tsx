import { Package, Rocket, Eye, Ban, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const kpiCards = [
  { label: 'Total products',       icon: Package, value: 48, trend: '+4 this week', trendType: 'up',      iconColor: '#3C83F7', iconBg: '#e8f0fe' },
  { label: 'Published products',   icon: Rocket,  value: 12, trend: '+2 this week', trendType: 'up',      iconColor: '#22c55e', iconBg: '#dcfce7' },
  { label: 'Pending assets review',icon: Eye,     value: 7,  trend: '+2 today',     trendType: 'warning', iconColor: '#f59e0b', iconBg: '#fef3c7' },
  { label: 'Rejected assets',      icon: Ban,   value: 9,  trend: '-1 this week', trendType: 'down',    iconColor: '#ef4444', iconBg: '#fee2e2' },
]

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {kpiCards.map(({ label, icon: Icon, value, trend, trendType, iconColor, iconBg }) => (
        <Card key={label} size="sm">
          <CardContent className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: iconBg }}>
              <Icon size={15} style={{ color: iconColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-text leading-none">{value}</p>
              <p className="text-sm text-text-muted mt-0.5 truncate">{label}</p>
              <div className="flex items-center gap-0.5 mt-1">
                {trendType === 'up'      && <TrendingUp   size={20} className="text-success shrink-0" />}
                {trendType === 'down'    && <TrendingDown size={20} className="text-error shrink-0" />}
                {trendType === 'warning' && <TrendingUp   size={20} className="text-warning shrink-0" />}
                <span className={`text-xs font-medium ${
                  trendType === 'up'      ? 'text-success-text' :
                  trendType === 'down'    ? 'text-error-text'   :
                                            'text-warning-text'
                }`}>
                  {trend}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
