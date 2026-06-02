import { CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export interface ChecklistStat {
  label: string
  done:  boolean
}

export interface ReadinessData {
  ready:     number
  notReady:  number
  total:     number
  checklist: ChecklistStat[]
}

interface Props {
  data:      ReadinessData
  isLoading: boolean
}

export default function ReadinessCard({ data, isLoading }: Props) {
  if (isLoading) return <Skeleton className="h-48 rounded-xl" />

  const pct          = data.total > 0 ? Math.round((data.ready / data.total) * 100) : 0
  const circumference = 2 * Math.PI * 30
  const offset        = circumference - (pct / 100) * circumference

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base!">Readiness rate</CardTitle>
        <CardDescription className="text-sm!">Products ready vs total</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="text-center">
            <p className="text-[17px] font-bold text-success">{data.ready}</p>
            <p className="text-[10px] text-text-muted">Ready</p>
          </div>
          <div className="text-center">
            <p className="text-[17px] font-bold text-error">{data.notReady}</p>
            <p className="text-[10px] text-text-muted">Not ready</p>
          </div>
          <div className="text-center">
            <p className="text-[17px] font-bold text-text">{data.total}</p>
            <p className="text-[10px] text-text-muted">Total</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="30" fill="none" stroke="#e2eaf7" strokeWidth="7" />
              <circle
                cx="38" cy="38" r="30"
                fill="none" stroke="#3C83F7"
                strokeWidth="7" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 38 38)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[13px] font-bold text-text leading-none">{pct}%</span>
              <span className="text-[9px] text-text-muted">ready</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 flex-1 pt-1">
            {data.checklist.map(item => (
              <div key={item.label} className="flex items-center gap-1.5 min-w-0">
                {item.done
                  ? <CheckCircle2 size={12} className="text-success shrink-0" />
                  : <XCircle      size={12} className="text-error shrink-0" />
                }
                <span className={`text-[10px] truncate ${item.done ? 'text-text' : 'text-text-muted'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
