"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Unlink } from "lucide-react";
import { disconnectAccount } from "@/actions/social-accounts";

export function DisconnectButton({ accountId }: { accountId: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const result = await disconnectAccount(accountId);
      if (result.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40"
        disabled={isPending}
        onClick={handleClick}
      >
        <Unlink className="size-3.5" />
        {isPending ? "Disconnecting..." : "Disconnect"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
