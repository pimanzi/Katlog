import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface TopProduct {
  name:     string
  variants: number
  pct:      number
}

interface Props {
  products:  TopProduct[]
  isLoading: boolean
}

export default function TopProducts({ products, isLoading }: Props) {
  if (isLoading) return <Skeleton className="h-48 rounded-xl" />

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base!">Top by variants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {products.map((p, i) => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-primary-light text-primary text-[10px] font-bold shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-text truncate">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${p.pct}%` }} />
                  </div>
                  <span className="text-[10px] text-text-muted shrink-0">{p.variants}</span>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-xs text-text-muted text-center py-3">No products yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
