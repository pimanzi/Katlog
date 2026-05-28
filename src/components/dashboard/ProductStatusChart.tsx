import { PieChart, Pie } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface StatusEntry {
  status: string
  value:  number
  fill:   string
}

const chartConfig = {
  value:     { label: 'Products'  },
  published: { label: 'Published', color: '#22c55e' },
  review:    { label: 'Review',    color: '#f59e0b' },
  draft:     { label: 'Draft',     color: '#cbd5e1' },
  archived:  { label: 'Archived',  color: '#94a3b8' },
} satisfies ChartConfig

interface Props {
  data:      StatusEntry[]
  isLoading: boolean
  className?: string
}

export default function ProductStatusChart({ data, isLoading, className }: Props) {
  if (isLoading) return <Skeleton className="h-64 rounded-xl" />

  return (
    <Card size="sm" className={className}>
      <CardHeader>
        <CardTitle className="text-base!">Product status</CardTitle>
        <CardDescription className="text-sm!">Distribution breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="status" label />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-0 pb-4">
        {data.map(item => (
          <div key={item.status} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.fill }} />
            <span className="text-xs text-text-muted capitalize">{item.status}</span>
            <span className="text-xs font-semibold text-text">{item.value}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
