# Stage 1 — Base Setup ✅

Neon project initialization, Prisma 7 install, base schema, and first migration.

## Status: Complete

---

## What Was Done

### Neon Init
```bash
npx neonctl@latest init
```
- Neon project created and linked
- `DATABASE_URL` copied from Neon dashboard

### Environment
- `.env` created in project root with `DATABASE_URL` (gitignored via `.gitignore`)

### Prisma 7 Install
```bash
npm install prisma @prisma/client
npm install --save-dev dotenv
```

### Prisma Init
```bash
npx prisma init --datasource-provider postgresql
```
- Generated `prisma/schema.prisma` and `prisma.config.ts`

### Prisma 7 Breaking Change — No `url` in Schema
In Prisma 7, the connection URL is configured in `prisma.config.ts`, not in `schema.prisma`:

**`prisma.config.ts`**
```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});
```

**`prisma/schema.prisma`** — datasource has no `url` field:
```prisma
datasource db {
  provider = "postgresql"
}
```

### Base Schema
Models added: `User`, `SocialAccount`, `Post`, `PostTarget`

### First Migration
```bash
npx prisma migrate dev --name init
```
Migration applied: `prisma/migrations/20260601113910_init/migration.sql`
