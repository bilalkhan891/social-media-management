import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string | number
  secondary: string
  trend?: "up" | "down"
  icon: React.ReactNode
}

export default function StatsCard({ label, value, secondary, trend, icon }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <p className="mt-2 text-3xl font-bold tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <p
          className={cn(
            "mt-1 text-xs",
            trend === "up" && "text-emerald-500",
            trend === "down" && "text-red-500",
            !trend && "text-muted-foreground"
          )}
        >
          {trend === "up" && <TrendingUp className="inline size-3 mr-1" />}
          {secondary}
        </p>
      </CardContent>
    </Card>
  )
}
