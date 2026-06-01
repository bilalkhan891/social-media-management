# Stage 2 — Complete Schema ⬜

Add NextAuth v5 required models, cascade deletes on all relations, and indexes.

## Status: Pending

---

## NextAuth Models to Add

NextAuth v5 with Prisma adapter requires these models in `prisma/schema.prisma`:

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

Also add `accounts` and `sessions` relations to the `User` model:
```prisma
model User {
  // ... existing fields ...
  accounts  Account[]
  sessions  Session[]
}
```

---

## Cascade Deletes

Add `onDelete: Cascade` to all child relations so deleting a parent cleans up children:

| Relation | Action |
|---|---|
| `SocialAccount.user` | `onDelete: Cascade` |
| `Post.user` | `onDelete: Cascade` |
| `PostTarget.post` | `onDelete: Cascade` |
| `PostTarget.socialAccount` | `onDelete: Cascade` |
| `Account.user` | `onDelete: Cascade` |
| `Session.user` | `onDelete: Cascade` |

---

## Indexes

Add indexes for all foreign keys and common query patterns:

```prisma
// SocialAccount
@@index([userId])

// Post
@@index([userId])
@@index([status])
@@index([scheduledAt])

// PostTarget
@@index([postId])
@@index([socialAccountId])
@@index([status])
```

---

## Migration Command

```bash
npx prisma migrate dev --name add-nextauth-models-and-indexes
```
