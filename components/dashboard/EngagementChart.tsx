"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockEngagementChart } from "@/lib/mock-data"

const chartConfig = {
  likes: { label: "Likes", color: "var(--chart-1)" },
  comments: { label: "Comments", color: "var(--chart-2)" },
  shares: { label: "Shares", color: "var(--chart-3)" },
} satisfies ChartConfig

export default function EngagementChart() {
  const { data, totals, period } = mockEngagementChart

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-base">Engagement Over Time</CardTitle>
        <CardDescription>{period}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart data={data} barSize={8} barGap={2}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => v.split(" ")[0]}
              interval={2}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="likes" fill="var(--chart-1)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="comments" fill="var(--chart-2)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="shares" fill="var(--chart-3)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <Separator className="my-4" />
        <div className="flex justify-around text-center">
          {[
            { label: "Likes", value: totals.likes },
            { label: "Comments", value: totals.comments },
            { label: "Shares", value: totals.shares },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xl font-bold">{value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
