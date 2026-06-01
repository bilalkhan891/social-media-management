"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { mockSocialAccounts } from "@/lib/mock-data"
import type { Platform } from "@/lib/mock-data"

const PLATFORM_COLORS: Record<Platform, string> = {
  twitter: "bg-sky-500",
  instagram: "bg-pink-500",
  linkedin: "bg-blue-600",
  facebook: "bg-blue-500",
}

const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: "Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
}

interface PlatformSelectorProps {
  selectedPlatforms: Platform[]
  onSelectionChange: (platforms: Platform[]) => void
}

export default function PlatformSelector({ selectedPlatforms, onSelectionChange }: PlatformSelectorProps) {
  function toggle(platform: Platform) {
    onSelectionChange(
      selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter((p) => p !== platform)
        : [...selectedPlatforms, platform]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Post To</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-3 pt-0">
        {mockSocialAccounts.map((account) => {
          const isSelected = selectedPlatforms.includes(account.platform)
          return (
            <div
              key={account.id}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
                account.connected && "cursor-pointer hover:bg-muted/50",
                isSelected && "bg-muted"
              )}
              onClick={() => account.connected && toggle(account.platform)}
            >
              <Checkbox
                checked={isSelected}
                disabled={!account.connected}
                onCheckedChange={() => toggle(account.platform)}
                onClick={(e) => e.stopPropagation()}
              />
              <div
                className={cn(
                  "size-6 rounded-full flex items-center justify-center shrink-0",
                  PLATFORM_COLORS[account.platform]
                )}
              >
                <span className="text-[10px] font-bold text-white">
                  {PLATFORM_LABELS[account.platform][0]}
                </span>
              </div>
              <span className={cn("text-sm flex-1", !account.connected && "text-muted-foreground")}>
                {PLATFORM_LABELS[account.platform]}
              </span>
              {!account.connected && (
                <Link
                  href="/accounts"
                  className="text-xs text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Connect →
                </Link>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
