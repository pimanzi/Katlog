import { AreaChart, Area, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '@/components/ui/card'

const uploadData = [
  { day: 'Mon', uploads: 14 },
  { day: 'Tue', uploads: 18 },
  { day: 'Wed', uploads: 24 },
  { day: 'Thu', uploads: 19 },
  { day: 'Fri', uploads: 22 },
  { day: 'Sat', uploads: 8  },
  { day: 'Sun', uploads: 9  },
]

const chartConfig = {
  uploads: { label: 'Uploads', color: '#3C83F7' },
} satisfies ChartConfig

export default function AssetUploadsChart() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className='text-base!'>Asset uploads</CardTitle>
        <CardDescription className='text-sm!'>Daily activity this week</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-text leading-none">134</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success-light text-success-text text-xs font-semibold">
              +12.4%
            </span>
            <span className="text-sm text-text-muted hidden sm:inline">total assets</span>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-40 w-full aspect-auto">
          <AreaChart data={uploadData} margin={{ top: 5, right: 10, left: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor=" #3C83F7" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3C83F7" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} padding={{ left: 15, right: 15 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="uploads" stroke="#3C83F7" strokeWidth={2} fill="url(#uploadGradient)" dot={false} activeDot={{ r: 4, fill: '#3C83F7' }} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
