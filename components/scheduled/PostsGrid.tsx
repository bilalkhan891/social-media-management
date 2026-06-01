"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, CalendarClock, Trash2 } from "lucide-react"
import { PostCard, type MockPost } from "./PostCard"

interface PostsGridProps {
  posts: MockPost[]
}

export function PostsGrid({ posts }: PostsGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedPost = posts.find((p) => p.id === selectedId) ?? posts[0] ?? null

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        No posts found for this filter.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isSelected={selectedPost?.id === post.id}
            onClick={() => setSelectedId(post.id)}
          />
        ))}
      </div>

      <div className="hidden lg:block">
        {selectedPost && (
          <Card className="sticky top-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed">{selectedPost.content}</p>

              <div className="flex flex-wrap gap-1">
                {selectedPost.platforms.map((p) => (
                  <Badge key={p} variant="outline" className="text-xs capitalize">
                    {p}
                  </Badge>
                ))}
              </div>

              {(selectedPost.scheduledAt ?? selectedPost.publishedAt) && (
                <p className="text-xs text-muted-foreground">
                  {new Date(
                    (selectedPost.scheduledAt ?? selectedPost.publishedAt)!
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              )}

              <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                <Button variant="outline" size="sm" className="justify-start gap-2">
                  <Edit2 className="size-3.5" /> Edit Post
                </Button>
                <Button variant="outline" size="sm" className="justify-start gap-2">
                  <CalendarClock className="size-3.5" /> Reschedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start gap-2 text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40"
                >
                  <Trash2 className="size-3.5" /> Delete Post
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
