import { CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReadinessResult, ReadinessChecklistItem } from '@/utils/calculateReadiness'

function getColor(pct: number): string {
  if (pct === 100) return '#22c55e'
  if (pct >= 75)   return '#3C83F7'
  if (pct >= 45)   return '#f59e0b'
  return '#ef4444'
}

function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 44
  const stroke = 8
  const size   = (radius + stroke) * 2
  const circ   = 2 * Math.PI * radius
  const color  = getColor(percentage)

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#e2eaf7" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - percentage / 100)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text
        x={size / 2} y={size / 2 - 6}
        textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="18" fontWeight="bold"
      >
        {percentage}%
      </text>
      <text
        x={size / 2} y={size / 2 + 12}
        textAnchor="middle" dominantBaseline="central"
        fill="#94a3b8" fontSize="10"
      >
        readiness
      </text>
    </svg>
  )
}

function ChecklistGroup({ label, items }: { label: string; items: ReadinessChecklistItem[] }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">{label}</p>
      {items.map(item => (
        <div key={item.label} className="flex items-start gap-1.5">
          {item.completed
            ? <CheckCircle size={12} className="text-success shrink-0 mt-0.5" />
            : <XCircle    size={12} className="text-error shrink-0 mt-0.5" />
          }
          <span className="text-xs text-text leading-snug">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function ReadinessChecklist({ result }: { result: ReadinessResult }) {
  const { percentage, checklist } = result

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Readiness Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <CircularProgress percentage={percentage} />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <ChecklistGroup label="Basic Info" items={checklist.slice(0, 7)} />
            <ChecklistGroup label="Variants"   items={checklist.slice(7, 8)} />
            <ChecklistGroup label="Assets"     items={checklist.slice(8)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
