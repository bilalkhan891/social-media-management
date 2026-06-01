import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { mockUser } from "@/lib/mock-data"

export default function Header() {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-background shrink-0">
      <span className="font-semibold text-sm">Social Media Manager</span>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          Connect Account
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
            {mockUser.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
