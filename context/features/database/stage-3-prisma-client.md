# Stage 3 — Prisma Client Singleton ✅

Create a single shared `PrismaClient` instance safe for Next.js dev mode with HMR.

## Status: Complete

---

## Why a Singleton

Next.js hot module reload recreates modules on every change. Without a singleton, each reload spins up a new `PrismaClient`, exhausting the Neon connection pool quickly in development.

---

## Prisma 7 Note — Adapter Required

Prisma 7's new `prisma-client` generator does **not** read `DATABASE_URL` automatically. A driver adapter must be passed to the constructor. We use `pg` + `@prisma/adapter-pg`.

Import path is from the generated output, not `@prisma/client`:
```ts
import { PrismaClient } from "@/lib/generated/prisma/client";
```

---

## Implementation

**`lib/prisma.ts`**
```ts
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**`package.json`** — add `postinstall` so Vercel regenerates the client after install:
```json
"postinstall": "prisma generate"
```

---

## Usage

In server components and server actions:
```ts
import { prisma } from "@/lib/prisma";

const users = await prisma.user.findMany();
```

Never import `PrismaClient` directly — always use this singleton.
