import { BarChart, Bar, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface MonthlyEntry {
  month: string
  count: number
}

const chartConfig = {
  count: { label: 'Products', color: '#3C83F7' },
} satisfies ChartConfig

interface Props {
  data:      MonthlyEntry[]
  isLoading: boolean
}

export default function ProductsAddedChart({ data, isLoading }: Props) {
  if (isLoading) return <Skeleton className="h-48 rounded-xl" />

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base!">Products added</CardTitle>
        <CardDescription className="text-sm!">Last 7 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-45 w-full aspect-auto">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 5, bottom: 0 }}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              interval={0}
              padding={{ left: 15, right: 15 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#3C83F7" radius={[4, 4, 0, 0]} barSize={36} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
