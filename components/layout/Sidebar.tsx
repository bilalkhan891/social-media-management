"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  CalendarDays,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/actions/auth";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create Post", href: "/create", icon: PenSquare },
  { label: "Scheduled", href: "/scheduled", icon: CalendarDays },
  { label: "Accounts", href: "/accounts", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  user: SidebarUser;
}

function getInitials(user: SidebarUser): string {
  if (user.name) return user.name.slice(0, 2).toUpperCase();
  if (user.email) return user.email.slice(0, 2).toUpperCase();
  return "??";
}

export default function Sidebar({ collapsed, onToggle, user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 shrink-0 border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-14" : "w-52"
      )}
    >
      <div className="flex items-center gap-2 h-14 px-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onToggle} className="shrink-0">
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
        {!collapsed && (
          <span className="font-semibold text-sm truncate">Social Media Manager</span>
        )}
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto p-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={cn("flex flex-col border-t border-border p-3 gap-2", collapsed && "items-center")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{user.name ?? user.email}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
          )}
        </div>
        <form action={signOutAction}>
          <Button
            type="submit"
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              !collapsed && "w-full justify-start gap-2"
            )}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </Button>
        </form>
      </div>
    </aside>
  );
}
