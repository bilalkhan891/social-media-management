import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTopPostsByPlatform } from "@/lib/mock-data"
import type { Platform } from "@/lib/mock-data"

const platformColors: Record<Platform, string> = {
  twitter: "bg-sky-500",
  instagram: "bg-pink-500",
  linkedin: "bg-blue-600",
  facebook: "bg-blue-500",
}

const platformLabels: Record<Platform, string> = {
  twitter: "Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
}

export default function TopPostsPanel() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-base">Top Posts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {mockTopPostsByPlatform.map(({ platform, engagement }) => (
          <div key={platform} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`size-6 rounded-full ${platformColors[platform]} flex items-center justify-center`}>
                <span className="text-[10px] font-bold text-white">
                  {platformLabels[platform][0]}
                </span>
              </div>
              <span className="text-sm">{platformLabels[platform]}</span>
            </div>
            <span className="text-sm font-semibold tabular-nums">{engagement.toLocaleString()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
