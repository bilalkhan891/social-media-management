import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPosts } from "@/lib/mock-data"
import type { Platform, PostStatus } from "@/lib/mock-data"

const platformLabels: Record<Platform, string> = {
  twitter: "Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
}

const statusStyles: Record<PostStatus, string> = {
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  scheduled: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  draft: "bg-muted text-muted-foreground border-border",
  failed: "bg-red-500/15 text-red-400 border-red-500/20",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

const recentPosts = mockPosts
  .filter((p) => p.status === "published" || p.status === "scheduled")
  .sort((a, b) => {
    const dateA = new Date(a.publishedAt ?? a.scheduledAt ?? "").getTime()
    const dateB = new Date(b.publishedAt ?? b.scheduledAt ?? "").getTime()
    return dateB - dateA
  })

export default function RecentPostsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Posts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <p className="text-sm truncate flex-1 min-w-0">{post.content}</p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">
                {formatDate((post.publishedAt ?? post.scheduledAt)!)}
              </span>
              {post.platforms.slice(0, 1).map((p) => (
                <Badge key={p} variant="outline" className="text-xs">
                  {platformLabels[p]}
                </Badge>
              ))}
              <Badge variant="outline" className={`text-xs capitalize ${statusStyles[post.status]}`}>
                {post.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
