import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { mockAccountLimits } from "@/lib/mock-data"

export function AccountLimits() {
  const { connectedAccounts, scheduledPostsThisMonth } = mockAccountLimits

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Account Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Connected Accounts</span>
              <span className="font-medium">
                {connectedAccounts.used} / {connectedAccounts.max}
              </span>
            </div>
            <Progress
              value={(connectedAccounts.used / connectedAccounts.max) * 100}
              className="h-2"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Scheduled Posts (This Month)</span>
              <span className="font-medium">
                {scheduledPostsThisMonth.used} / {scheduledPostsThisMonth.max}
              </span>
            </div>
            <Progress
              value={(scheduledPostsThisMonth.used / scheduledPostsThisMonth.max) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-center justify-between gap-4 p-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Zap className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Pro Plan</p>
              <p className="text-xs text-muted-foreground">
                Upgrade to unlock unlimited accounts and scheduled posts
              </p>
            </div>
          </div>
          <Button size="sm" className="shrink-0">
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
