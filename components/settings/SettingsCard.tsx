import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface SettingsCardProps {
  title: string
  description: string
}

export function SettingsCard({ title, description }: SettingsCardProps) {
  return (
    <Card className="cursor-pointer hover:border-border/80 transition-colors">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <ChevronRight className="size-4 text-muted-foreground shrink-0" />
      </CardContent>
    </Card>
  )
}
