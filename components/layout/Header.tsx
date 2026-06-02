import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function getInitials(user: HeaderProps["user"]): string {
  if (user.name) return user.name.slice(0, 2).toUpperCase();
  if (user.email) return user.email.slice(0, 2).toUpperCase();
  return "??";
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-background shrink-0">
      <span className="font-semibold text-sm">Social Media Manager</span>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          Connect Account
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
