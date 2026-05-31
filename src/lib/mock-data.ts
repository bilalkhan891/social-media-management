export type Platform = "twitter" | "instagram" | "linkedin" | "facebook"
export type PostStatus = "draft" | "scheduled" | "published" | "failed"
export type Trend = "up" | "down"

export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  plan: "pro" as const,
  initials: "JD",
}

export const mockSocialAccounts = [
  {
    id: "acc_twitter",
    platform: "twitter" as Platform,
    username: "@brandname",
    followers: 24580,
    connectedSince: "2024-11-15",
    connected: true,
  },
  {
    id: "acc_instagram",
    platform: "instagram" as Platform,
    username: "brandname",
    followers: 12340,
    connectedSince: "2024-11-10",
    connected: true,
  },
  {
    id: "acc_linkedin",
    platform: "linkedin" as Platform,
    username: "Brand Name",
    followers: 8920,
    connectedSince: "2024-12-01",
    connected: true,
  },
  {
    id: "acc_facebook",
    platform: "facebook" as Platform,
    username: "",
    followers: 0,
    connectedSince: null,
    connected: false,
  },
]

export const mockDashboardStats = {
  totalFollowers: { value: 24580, change: "+12.5%", trend: "up" as Trend },
  postEngagement: { value: 8240, change: "+5.2%", trend: "up" as Trend },
  scheduledPosts: { value: 12, label: "This Month" },
  avgReach: { value: 3420, change: "+8.1%", trend: "up" as Trend },
}

export const mockEngagementChart = {
  period: "Last 30 days",
  totals: { likes: 2840, comments: 456, shares: 324 },
  data: [
    { date: "1 Dec", likes: 80, comments: 12, shares: 8 },
    { date: "3 Dec", likes: 120, comments: 18, shares: 14 },
    { date: "5 Dec", likes: 95, comments: 10, shares: 6 },
    { date: "7 Dec", likes: 200, comments: 35, shares: 22 },
    { date: "9 Dec", likes: 150, comments: 20, shares: 15 },
    { date: "11 Dec", likes: 180, comments: 28, shares: 18 },
    { date: "13 Dec", likes: 220, comments: 40, shares: 30 },
    { date: "15 Dec", likes: 175, comments: 22, shares: 17 },
    { date: "17 Dec", likes: 300, comments: 50, shares: 35 },
    { date: "19 Dec", likes: 250, comments: 38, shares: 28 },
    { date: "21 Dec", likes: 195, comments: 30, shares: 20 },
    { date: "23 Dec", likes: 280, comments: 45, shares: 32 },
    { date: "25 Dec", likes: 340, comments: 55, shares: 42 },
    { date: "27 Dec", likes: 230, comments: 33, shares: 24 },
    { date: "30 Dec", likes: 205, comments: 20, shares: 13 },
  ],
}

export const mockTopPostsByPlatform: { platform: Platform; engagement: number }[] = [
  { platform: "twitter", engagement: 1240 },
  { platform: "instagram", engagement: 892 },
  { platform: "linkedin", engagement: 567 },
]

export const mockPosts = [
  {
    id: "post_1",
    content: "Check out our new product launch!",
    status: "published" as PostStatus,
    platforms: ["twitter"] as Platform[],
    publishedAt: "2024-12-30T08:00:00Z",
    scheduledAt: null as string | null,
    mediaUrls: [] as string[],
  },
  {
    id: "post_2",
    content: "How Company X increased their productivity by 40% using our platform...",
    status: "published" as PostStatus,
    platforms: ["twitter"] as Platform[],
    publishedAt: "2024-12-29T14:00:00Z",
    scheduledAt: null as string | null,
    mediaUrls: [] as string[],
  },
  {
    id: "post_3",
    content: "Exciting new feature announcement! We're thrilled to introduce our latest feature that will transform your workflow.",
    status: "scheduled" as PostStatus,
    platforms: ["twitter"] as Platform[],
    publishedAt: null as string | null,
    scheduledAt: "2024-10-21T10:00:00Z",
    mediaUrls: [] as string[],
  },
  {
    id: "post_4",
    content: "Weekly newsletter roundup: the top stories and insights from our community this week.",
    status: "scheduled" as PostStatus,
    platforms: ["twitter", "instagram", "linkedin"] as Platform[],
    publishedAt: null as string | null,
    scheduledAt: "2024-10-25T14:00:00Z",
    mediaUrls: [] as string[],
  },
  {
    id: "post_5",
    content: "Holiday special promotion! Get 20% off on all annual plans this holiday season.",
    status: "scheduled" as PostStatus,
    platforms: ["twitter", "instagram"] as Platform[],
    publishedAt: null as string | null,
    scheduledAt: "2024-12-20T12:00:00Z",
    mediaUrls: [] as string[],
  },
  {
    id: "post_6",
    content: "Customer success story: see how our platform helped streamline content across channels.",
    status: "draft" as PostStatus,
    platforms: ["linkedin"] as Platform[],
    publishedAt: null as string | null,
    scheduledAt: null as string | null,
    mediaUrls: [] as string[],
  },
]

export const mockAccountLimits = {
  connectedAccounts: { used: 3, max: 10 },
  scheduledPostsThisMonth: { used: 12, max: 50 },
}
