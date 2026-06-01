"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, CalendarClock, Trash2 } from "lucide-react"
import type { Platform, PostStatus } from "@/lib/mock-data"

const PLATFORM_COLORS: Record<Platform, string> = {
  twitter: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  instagram: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  linkedin: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  facebook: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
}

const PLATFORM_BG: Record<Platform, string> = {
  twitter: "from-sky-900/40 to-sky-800/20",
  instagram: "from-pink-900/40 to-pink-800/20",
  linkedin: "from-blue-900/40 to-blue-800/20",
  facebook: "from-indigo-900/40 to-indigo-800/20",
}

const STATUS_STYLES: Record<PostStatus, string> = {
  scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  published: "bg-green-500/10 text-green-400 border-green-500/20",
  draft: "bg-muted text-muted-foreground border-border",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export type MockPost = {
  id: string
  content: string
  status: PostStatus
  platforms: Platform[]
  publishedAt: string | null
  scheduledAt: string | null
  mediaUrls: string[]
}

interface PostCardProps {
  post: MockPost
  isSelected?: boolean
  onClick?: () => void
}

export function PostCard({ post, isSelected, onClick }: PostCardProps) {
  const primaryPlatform = post.platforms[0]
  const dateStr = post.scheduledAt ?? post.publishedAt

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all hover:border-border/80 ${
        isSelected ? "border-primary/50 bg-primary/5" : ""
      }`}
    >
      <div
        className={`h-20 rounded-t-lg bg-gradient-to-br ${
          primaryPlatform ? PLATFORM_BG[primaryPlatform] : "from-muted/60 to-muted"
        } flex items-center justify-center`}
      >
        {post.mediaUrls.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.mediaUrls[0]}
            alt=""
            className="h-full w-full object-cover rounded-t-lg"
          />
        ) : (
          <span className="text-xs text-muted-foreground">No media</span>
        )}
      </div>

      <CardContent className="p-3 space-y-2">
        <p className="text-sm line-clamp-2">{post.content}</p>

        <div className="flex flex-wrap gap-1 items-center">
          {post.platforms.map((p) => (
            <Badge key={p} variant="outline" className={`text-xs capitalize ${PLATFORM_COLORS[p]}`}>
              {p}
            </Badge>
          ))}
          <Badge variant="outline" className={`text-xs capitalize ml-auto ${STATUS_STYLES[post.status]}`}>
            {post.status}
          </Badge>
        </div>

        {dateStr && (
          <p className="text-xs text-muted-foreground">{formatDate(dateStr)}</p>
        )}

        <div className="flex gap-1 pt-1 border-t border-border/50">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs flex-1 gap-1">
            <Edit2 className="size-3" /> Edit
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs flex-1 gap-1">
            <CalendarClock className="size-3" /> Reschedule
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs flex-1 gap-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="size-3" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
