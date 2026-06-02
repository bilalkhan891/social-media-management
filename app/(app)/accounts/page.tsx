import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AccountCard } from "@/components/accounts/AccountCard"
import { AccountLimits } from "@/components/accounts/AccountLimits"
import { mockSocialAccounts } from "@/lib/mock-data"

const connectedAccounts = mockSocialAccounts.filter((a) => a.connected)

export default function AccountsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Connected Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your social media accounts and integrations
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
          <Plus className="size-4" /> Connect Account
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground font-medium">
          Connected Accounts ({connectedAccounts.length})
        </p>
        <div className="space-y-3">
          {connectedAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      <AccountLimits />
    </div>
  )
}
