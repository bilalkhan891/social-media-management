"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { Platform } from "@/lib/mock-data"

const PLATFORM_LIMITS: Partial<Record<Platform, number>> = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
}

const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: "Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
}

interface PostContentEditorProps {
  content: string
  onContentChange: (value: string) => void
  selectedPlatforms: Platform[]
}

export default function PostContentEditor({
  content,
  onContentChange,
  selectedPlatforms,
}: PostContentEditorProps) {
  const limitedPlatforms = selectedPlatforms.filter((p) => PLATFORM_LIMITS[p] !== undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Post Content</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Textarea
          placeholder="What's on your mind? Write your post here..."
          className="min-h-36 resize-none"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {content.length} {content.length === 1 ? "character" : "characters"}
          </span>
          {limitedPlatforms.length > 0 && (
            <div className="flex items-center gap-2">
              {limitedPlatforms.map((p) => {
                const limit = PLATFORM_LIMITS[p]!
                const over = content.length > limit
                return (
                  <Badge
                    key={p}
                    variant="outline"
                    className={over ? "border-red-500/50 text-red-400" : "text-muted-foreground"}
                  >
                    {limit.toLocaleString()} ({PLATFORM_LABELS[p]})
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
