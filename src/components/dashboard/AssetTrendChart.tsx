import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, CartesianGrid } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useAssets } from '@/hooks/assets'
import { groupAssetsByDate, groupAssetsByRange, getHalfYearRange } from '@/utils/dateUtils'

const chartConfig = {
  uploaded: { label: 'Uploaded', color: '#3C83F7' },
  approved: { label: 'Approved', color: '#22c55e' },
} satisfies ChartConfig

export default function AssetTrendChart() {
  const [timeRange, setTimeRange] = useState('h1')
  const { data: assets = [], isLoading } = useAssets()

  const chartData = useMemo(() => {
    if (timeRange === '7d') return groupAssetsByDate(assets, 7)
    const { start, end } = getHalfYearRange(timeRange as 'h1' | 'h2')
    return groupAssetsByRange(assets, start, end)
  }, [assets, timeRange])

  const totalUploaded = chartData.reduce((s, d) => s + d.uploaded, 0)
  const totalApproved = chartData.reduce((s, d) => s + d.approved, 0)
  const approvalRate  = totalUploaded > 0 ? Math.round((totalApproved / totalUploaded) * 100) : 0

  if (isLoading) return <Skeleton className="h-72 rounded-xl" />

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base!">Asset activity</CardTitle>
        <CardDescription className="text-sm!">Uploaded vs approved over time</CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 h-8 text-xs rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="h1">Jan – Jun (H1)</SelectItem>
              <SelectItem value="h2">Jul – Dec (H2)</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-55 w-full aspect-auto">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="fillUploaded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3C83F7" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3C83F7" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="fillApproved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.5} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickFormatter={(v: string) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={v => new Date(v).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                />
              }
            />
            <Area type="natural" dataKey="uploaded" stroke="#3C83F7" strokeWidth={2} fill="url(#fillUploaded)" dot={false} />
            <Area type="natural" dataKey="approved" stroke="#22c55e" strokeWidth={2} fill="url(#fillApproved)" dot={false} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>

        <div className="flex items-center divide-x divide-border mt-4 pt-4 border-t border-border">
          <div className="flex-1 text-center px-3">
            <p className="text-[20px] font-bold leading-none" style={{ color: '#3C83F7' }}>{totalUploaded}</p>
            <p className="text-[11px] text-text-muted mt-1">Total uploaded</p>
          </div>
          <div className="flex-1 text-center px-3">
            <p className="text-[20px] font-bold leading-none" style={{ color: '#22c55e' }}>{totalApproved}</p>
            <p className="text-[11px] text-text-muted mt-1">Total approved</p>
          </div>
          <div className="flex-1 text-center px-3">
            <p className="text-[20px] font-bold leading-none text-text">{approvalRate}%</p>
            <p className="text-[11px] text-text-muted mt-1">Approval rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
