# Stage 3 — Prisma Client Singleton ⬜

Create a single shared `PrismaClient` instance safe for Next.js dev mode with HMR.

## Status: Pending

---

## Why a Singleton

Next.js hot module reload recreates modules on every change. Without a singleton, each reload spins up a new `PrismaClient`, exhausting the Neon connection pool quickly in development.

---

## Implementation

**`lib/prisma.ts`**
```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

---

## Usage

In server components and server actions:
```ts
import { prisma } from "@/lib/prisma";

const users = await prisma.user.findMany();
```

Never import `PrismaClient` directly — always use this singleton.
