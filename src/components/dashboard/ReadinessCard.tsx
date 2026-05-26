import { CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const checklist = [
  { label: 'Has name & code',     done: true  },
  { label: 'Has variants',        done: true  },
  { label: 'All assets approved', done: false },
  { label: 'Description complete',done: false },
]

export default function ReadinessCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Readiness rate</CardTitle>
        <CardDescription>Products ready vs total</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 divide-x divide-border mb-4">
          <div className="text-center">
            <p className="text-[17px] font-bold text-success">20</p>
            <p className="text-[10px] text-text-muted">Ready</p>
          </div>
          <div className="text-center">
            <p className="text-[17px] font-bold text-error">28</p>
            <p className="text-[10px] text-text-muted">Not ready</p>
          </div>
          <div className="text-center">
            <p className="text-[17px] font-bold text-text">48</p>
            <p className="text-[10px] text-text-muted">Total</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="30" fill="none" stroke="#e2eaf7" strokeWidth="7" />
              <circle
                cx="38" cy="38" r="30"
                fill="none" stroke="#3C83F7"
                strokeWidth="7" strokeLinecap="round"
                strokeDasharray="188.5"
                strokeDashoffset="111.2"
                transform="rotate(-90 38 38)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[13px] font-bold text-text leading-none">41%</span>
              <span className="text-[9px] text-text-muted">ready</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            {checklist.map(item => (
              <div key={item.label} className="flex items-center gap-2">
                {item.done
                  ? <CheckCircle2 size={14} className="text-success shrink-0" />
                  : <XCircle     size={14} className="text-error shrink-0" />
                }
                <span className={`text-[11px] ${item.done ? 'text-text' : 'text-text-muted'}`}>
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
