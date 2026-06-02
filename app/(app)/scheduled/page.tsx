"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostsGrid } from "@/components/scheduled/PostsGrid"
import { CalendarView } from "@/components/scheduled/CalendarView"
import { mockPosts } from "@/lib/mock-data"

type FilterTab = "all" | "this-week" | "twitter" | "instagram"

function getThisWeekRange() {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

const scheduledPosts = mockPosts.filter((p) => p.status === "scheduled")

export default function ScheduledPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const filteredPosts = useMemo(() => {
    switch (activeTab) {
      case "this-week": {
        const { start, end } = getThisWeekRange()
        return scheduledPosts.filter((p) => {
          if (!p.scheduledAt) return false
          const d = new Date(p.scheduledAt)
          return d >= start && d <= end
        })
      }
      case "twitter":
        return scheduledPosts.filter((p) => p.platforms.includes("twitter"))
      case "instagram":
        return scheduledPosts.filter((p) => p.platforms.includes("instagram"))
      default:
        return scheduledPosts
    }
  }, [activeTab])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Scheduled Posts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and view all your upcoming posts
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
        </TabsList>
      </Tabs>

      <PostsGrid posts={filteredPosts} />

      <CalendarView />
    </div>
  )
}
