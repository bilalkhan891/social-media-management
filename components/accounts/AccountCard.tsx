import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Unlink } from "lucide-react"
import type { Platform } from "@/lib/mock-data"

const PLATFORM_COLORS: Record<Platform, string> = {
  twitter: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  instagram: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  linkedin: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  facebook: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
}

const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: "Twitter / X",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
}

function formatFollowers(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  return n.toString()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

interface AccountCardProps {
  account: {
    id: string
    platform: Platform
    username: string
    followers: number
    connectedSince: string | null
    connected: boolean
  }
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${PLATFORM_COLORS[account.platform]}`}
            >
              {account.platform[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{PLATFORM_LABELS[account.platform]}</span>
                <Badge
                  variant="outline"
                  className="text-xs bg-green-500/10 text-green-400 border-green-500/20"
                >
                  ✓ Connected
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{account.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground shrink-0">
            <span>
              <span className="text-foreground font-medium">{formatFollowers(account.followers)}</span>{" "}
              followers
            </span>
            {account.connectedSince && (
              <span>
                Connected{" "}
                <span className="text-foreground font-medium">{formatDate(account.connectedSince)}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Settings className="size-3.5" /> Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40"
            >
              <Unlink className="size-3.5" /> Disconnect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
