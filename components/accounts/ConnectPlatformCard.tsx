import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"

interface Platform {
  id: string
  label: string
  href: string | null
  available: boolean
}

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  twitter: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  instagram: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  linkedin: "bg-blue-500/10 text-blue-400 border-blue-500/20",
}

const DEFAULT_COLOR = "bg-gray-500/10 text-gray-400 border-gray-500/20"

export function ConnectPlatformCard({ platform }: { platform: Platform }) {
  const color = PLATFORM_COLORS[platform.id] ?? DEFAULT_COLOR

  return (
    <Card className="border-dashed">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${color}`}
          >
            {platform.label[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{platform.label}</span>
              {!platform.available && (
                <Badge variant="outline" className="text-xs">
                  Coming soon
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {platform.available ? "Click to connect your account" : "Not yet available"}
            </p>
          </div>
          {platform.available && platform.href ? (
            <Button asChild size="sm" variant="outline" className="shrink-0 gap-1.5">
              <Link href={platform.href}>
                <Plus className="size-3.5" /> Connect
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="shrink-0" disabled>
              <Plus className="size-3.5" /> Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
