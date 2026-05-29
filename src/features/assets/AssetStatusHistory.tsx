import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { StatusHistory, AssetStatus } from '@/types/asset.types'

const DOT_COLOR: Record<AssetStatus, string> = {
  pending_review: 'bg-primary',
  approved:       'bg-success',
  rejected:       'bg-error',
}

const EVENT_LABEL: Record<AssetStatus, string> = {
  pending_review: 'Submitted for review',
  approved:       'Approved',
  rejected:       'Rejected',
}

export function AssetStatusHistory({ history }: { history: StatusHistory[] }) {
  const sorted = [...history].sort(
    (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
  )

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Status History</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-text-muted">No history yet.</p>
        ) : (
          <ol className="relative border-l border-border ml-2 space-y-4">
            {sorted.map((entry, i) => (
              <li key={i} className="pl-5 relative">
                <span className={`absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full ${DOT_COLOR[entry.status]} ring-2 ring-card`} />
                <p className="text-sm font-medium text-text">{EVENT_LABEL[entry.status]}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {new Date(entry.changedAt).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric',
                  })}{' '}
                  {new Date(entry.changedAt).toLocaleTimeString('en-GB', {
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
                {entry.reason && (
                  <p className="text-xs text-error-text mt-1 italic">"{entry.reason}"</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
