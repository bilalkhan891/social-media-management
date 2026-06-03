import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { AccountCard } from "@/components/accounts/AccountCard"
import { AccountLimits } from "@/components/accounts/AccountLimits"
import { ConnectPlatformCard } from "@/components/accounts/ConnectPlatformCard"

const ALL_PLATFORMS = [
  { id: "facebook", label: "Facebook", href: "/api/auth/facebook", available: true },
  { id: "twitter", label: "X (Twitter)", href: null, available: false },
  { id: "instagram", label: "Instagram", href: null, available: false },
  { id: "linkedin", label: "LinkedIn", href: null, available: false },
]

export default async function AccountsPage() {
  const session = await auth()
  const accounts = await prisma.socialAccount.findMany({
    where: { userId: session!.user!.id },
    orderBy: { createdAt: "asc" },
  })

  const connectedPlatformIds = new Set(accounts.map((a) => a.platform))
  const unconnectedPlatforms = ALL_PLATFORMS.filter(
    (p) => !connectedPlatformIds.has(p.id)
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Connected Accounts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your social media accounts and integrations
        </p>
      </div>

      {accounts.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Connected ({accounts.length})
          </p>
          <div className="space-y-3">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      )}

      {unconnectedPlatforms.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            {accounts.length === 0 ? "Connect a Platform" : "Connect More"}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {unconnectedPlatforms.map((platform) => (
              <ConnectPlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      )}

      <AccountLimits />
    </div>
  )
}
