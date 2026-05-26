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

const chartData = [
  { date: '2024-04-01', uploaded: 14, approved: 10 },
  { date: '2024-04-02', uploaded: 18, approved: 14 },
  { date: '2024-04-03', uploaded: 22, approved: 17 },
  { date: '2024-04-04', uploaded: 19, approved: 15 },
  { date: '2024-04-05', uploaded: 16, approved: 12 },
  { date: '2024-04-06', uploaded: 7,  approved: 5  },
  { date: '2024-04-07', uploaded: 5,  approved: 3  },
  { date: '2024-04-08', uploaded: 20, approved: 16 },
  { date: '2024-04-09', uploaded: 24, approved: 19 },
  { date: '2024-04-10', uploaded: 17, approved: 13 },
  { date: '2024-04-11', uploaded: 21, approved: 17 },
  { date: '2024-04-12', uploaded: 15, approved: 11 },
  { date: '2024-04-13', uploaded: 6,  approved: 4  },
  { date: '2024-04-14', uploaded: 4,  approved: 3  },
  { date: '2024-04-15', uploaded: 23, approved: 18 },
  { date: '2024-04-16', uploaded: 19, approved: 15 },
  { date: '2024-04-17', uploaded: 25, approved: 20 },
  { date: '2024-04-18', uploaded: 18, approved: 14 },
  { date: '2024-04-19', uploaded: 22, approved: 17 },
  { date: '2024-04-20', uploaded: 8,  approved: 6  },
  { date: '2024-04-21', uploaded: 5,  approved: 3  },
  { date: '2024-04-22', uploaded: 16, approved: 12 },
  { date: '2024-04-23', uploaded: 20, approved: 16 },
  { date: '2024-04-24', uploaded: 24, approved: 19 },
  { date: '2024-04-25', uploaded: 17, approved: 13 },
  { date: '2024-04-26', uploaded: 21, approved: 16 },
  { date: '2024-04-27', uploaded: 7,  approved: 5  },
  { date: '2024-04-28', uploaded: 4,  approved: 3  },
  { date: '2024-04-29', uploaded: 19, approved: 15 },
  { date: '2024-04-30', uploaded: 22, approved: 17 },
  { date: '2024-05-01', uploaded: 18, approved: 14 },
  { date: '2024-05-02', uploaded: 25, approved: 20 },
  { date: '2024-05-03', uploaded: 20, approved: 15 },
  { date: '2024-05-04', uploaded: 9,  approved: 7  },
  { date: '2024-05-05', uploaded: 6,  approved: 4  },
  { date: '2024-05-06', uploaded: 22, approved: 17 },
  { date: '2024-05-07', uploaded: 26, approved: 21 },
  { date: '2024-05-08', uploaded: 19, approved: 15 },
  { date: '2024-05-09', uploaded: 23, approved: 18 },
  { date: '2024-05-10', uploaded: 17, approved: 13 },
  { date: '2024-05-11', uploaded: 8,  approved: 6  },
  { date: '2024-05-12', uploaded: 5,  approved: 4  },
  { date: '2024-05-13', uploaded: 24, approved: 19 },
  { date: '2024-05-14', uploaded: 28, approved: 22 },
  { date: '2024-05-15', uploaded: 21, approved: 17 },
  { date: '2024-05-16', uploaded: 19, approved: 15 },
  { date: '2024-05-17', uploaded: 23, approved: 18 },
  { date: '2024-05-18', uploaded: 10, approved: 8  },
  { date: '2024-05-19', uploaded: 6,  approved: 4  },
  { date: '2024-05-20', uploaded: 20, approved: 16 },
  { date: '2024-05-21', uploaded: 25, approved: 20 },
  { date: '2024-05-22', uploaded: 18, approved: 14 },
  { date: '2024-05-23', uploaded: 22, approved: 17 },
  { date: '2024-05-24', uploaded: 16, approved: 12 },
  { date: '2024-05-25', uploaded: 7,  approved: 5  },
  { date: '2024-05-26', uploaded: 4,  approved: 3  },
  { date: '2024-05-27', uploaded: 21, approved: 16 },
  { date: '2024-05-28', uploaded: 27, approved: 22 },
  { date: '2024-05-29', uploaded: 23, approved: 18 },
  { date: '2024-05-30', uploaded: 19, approved: 15 },
  { date: '2024-05-31', uploaded: 24, approved: 19 },
  { date: '2024-06-01', uploaded: 9,  approved: 7  },
  { date: '2024-06-02', uploaded: 5,  approved: 4  },
  { date: '2024-06-03', uploaded: 22, approved: 18 },
  { date: '2024-06-04', uploaded: 26, approved: 21 },
  { date: '2024-06-05', uploaded: 20, approved: 16 },
  { date: '2024-06-06', uploaded: 24, approved: 19 },
  { date: '2024-06-07', uploaded: 18, approved: 14 },
  { date: '2024-06-08', uploaded: 8,  approved: 6  },
  { date: '2024-06-09', uploaded: 5,  approved: 4  },
  { date: '2024-06-10', uploaded: 23, approved: 18 },
  { date: '2024-06-11', uploaded: 27, approved: 22 },
  { date: '2024-06-12', uploaded: 21, approved: 17 },
  { date: '2024-06-13', uploaded: 19, approved: 15 },
  { date: '2024-06-14', uploaded: 25, approved: 20 },
  { date: '2024-06-15', uploaded: 10, approved: 8  },
  { date: '2024-06-16', uploaded: 6,  approved: 5  },
  { date: '2024-06-17', uploaded: 22, approved: 17 },
  { date: '2024-06-18', uploaded: 28, approved: 22 },
  { date: '2024-06-19', uploaded: 24, approved: 19 },
  { date: '2024-06-20', uploaded: 20, approved: 16 },
  { date: '2024-06-21', uploaded: 26, approved: 21 },
  { date: '2024-06-22', uploaded: 9,  approved: 7  },
  { date: '2024-06-23', uploaded: 5,  approved: 4  },
  { date: '2024-06-24', uploaded: 23, approved: 18 },
  { date: '2024-06-25', uploaded: 29, approved: 23 },
  { date: '2024-06-26', uploaded: 22, approved: 17 },
  { date: '2024-06-27', uploaded: 18, approved: 14 },
  { date: '2024-06-28', uploaded: 25, approved: 20 },
  { date: '2024-06-29', uploaded: 11, approved: 9  },
]

const chartConfig = {
  uploaded: { label: 'Uploaded', color: '#3C83F7' },
  approved: { label: 'Approved', color: '#22c55e' },
} satisfies ChartConfig

export default function AssetTrendChart() {
  const [timeRange, setTimeRange] = useState('90d')

  const filteredData = useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    return chartData.slice(-days)
  }, [timeRange])

  const totalUploaded = filteredData.reduce((sum, d) => sum + d.uploaded, 0)
  const totalApproved = filteredData.reduce((sum, d) => sum + d.approved, 0)
  const approvalRate = Math.round((totalApproved / totalUploaded) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset activity</CardTitle>
        <CardDescription>Uploaded vs approved over time</CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 h-8 text-xs rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-55 w-full aspect-auto">
          <AreaChart data={filteredData} margin={{ top: 5, right: 10, left: 5, bottom: 0 }}>
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
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                  }
                />
              }
            />
            <Area
              type="natural"
              dataKey="uploaded"
              stroke="#3C83F7"
              strokeWidth={2}
              fill="url(#fillUploaded)"
              dot={false}
            />
            <Area
              type="natural"
              dataKey="approved"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#fillApproved)"
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>

        {/* Summary stats */}
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
