import { MoreHorizontal } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card'

const topProducts = [
  { name: 'Nike Air Max 2024', variants: 12, pct: 100 },
  { name: 'Adidas Samba OG',   variants: 9,  pct: 75  },
  { name: 'Zara Summer Dress', variants: 7,  pct: 58  },
  { name: 'H&M Linen Shirt',   variants: 5,  pct: 42  },
]

export default function TopProducts() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Top by variants</CardTitle>
        <CardAction>
          <button className="text-text-muted hover:text-text transition-colors">
            <MoreHorizontal size={15} />
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {topProducts.map((p, i) => (
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
        </div>
      </CardContent>
    </Card>
  )
}
