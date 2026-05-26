import { PieChart, Pie } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const statusData = [
  { status: 'published', value: 12, fill: '#22c55e' },
  { status: 'ready',     value: 8,  fill: '#3C83F7' },
  { status: 'review',    value: 7,  fill: '#f59e0b' },
  { status: 'draft',     value: 15, fill: '#cbd5e1' },
  { status: 'archived',  value: 6,  fill: '#94a3b8' },
]

const chartConfig = {
  value:     { label: 'Products'  },
  published: { label: 'Published', color: '#22c55e' },
  ready:     { label: 'Ready',     color: '#3C83F7' },
  review:    { label: 'Review',    color: '#f59e0b' },
  draft:     { label: 'Draft',     color: '#cbd5e1' },
  archived:  { label: 'Archived',  color: '#94a3b8' },
} satisfies ChartConfig

export default function ProductStatusChart() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Product status</CardTitle>
        <CardDescription>Distribution breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">

          <div className="relative shrink-0 w-27.5 h-27.5">
            <ChartContainer config={chartConfig} className="w-27.5 h-27.5 aspect-auto">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={statusData} dataKey="value" nameKey="status" innerRadius={36} outerRadius={50} strokeWidth={0} />
              </PieChart>
            </ChartContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[16px] font-bold text-text leading-none">48</span>
              <span className="text-[10px] text-text-muted mt-0.5">total</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {statusData.map(item => (
              <div key={item.status} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.fill }} />
                <span className="text-[11px] text-text-muted capitalize flex-1">{item.status}</span>
                <div className="w-10 h-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ background: item.fill, width: `${Math.round((item.value / 48) * 100)}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-text w-4 text-right shrink-0">{item.value}</span>
              </div>
            ))}
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
