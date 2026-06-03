"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function disconnectAccount(
  accountId: string
): Promise<{ error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await prisma.socialAccount.deleteMany({
      where: { id: accountId, userId: session.user.id },
    });

    revalidatePath("/accounts");
    return {};
  } catch (err) {
    console.error("[disconnectAccount]", err);
    return { error: "Failed to disconnect account. Please try again." };
  }
}
