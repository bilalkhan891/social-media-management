"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AppShellProps {
  children: React.ReactNode;
  user: AppShellUser;
}

export default function AppShell({ children, user }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} user={user} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
