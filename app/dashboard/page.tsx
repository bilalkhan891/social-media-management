import { Users, Heart, CalendarDays, BarChart2 } from "lucide-react"
import StatsCard from "@/components/dashboard/StatsCard"
import EngagementChart from "@/components/dashboard/EngagementChart"
import TopPostsPanel from "@/components/dashboard/TopPostsPanel"
import RecentPostsList from "@/components/dashboard/RecentPostsList"
import { mockDashboardStats } from "@/lib/mock-data"

export default function DashboardPage() {
  const { totalFollowers, postEngagement, scheduledPosts, avgReach } = mockDashboardStats

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your social media overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          label="Total Followers"
          value={totalFollowers.value}
          secondary={totalFollowers.change}
          trend={totalFollowers.trend}
          icon={<Users className="size-4" />}
        />
        <StatsCard
          label="Post Engagement"
          value={postEngagement.value}
          secondary={postEngagement.change}
          trend={postEngagement.trend}
          icon={<Heart className="size-4" />}
        />
        <StatsCard
          label="Scheduled Posts"
          value={scheduledPosts.value}
          secondary={scheduledPosts.label}
          icon={<CalendarDays className="size-4" />}
        />
        <StatsCard
          label="Avg. Reach"
          value={avgReach.value}
          secondary={avgReach.change}
          trend={avgReach.trend}
          icon={<BarChart2 className="size-4" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EngagementChart />
        </div>
        <TopPostsPanel />
      </div>

      <RecentPostsList />
    </div>
  )
}
