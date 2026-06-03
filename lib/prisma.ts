import dns from "dns";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

// WSL and some environments resolve to IPv6 by default, which may be unreachable.
// Force IPv4-first so the pg pool connects reliably.
dns.setDefaultResultOrder("ipv4first");

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function buildConnectionString(raw: string): string {
  const [base, query] = raw.split("?");
  if (!query) return raw;
  const params = query.split("&").filter((p) => !p.startsWith("sslmode="));
  return params.length ? `${base}?${params.join("&")}` : base;
}

function createPrismaClient() {
  // pg v8.21+ treats sslmode=require as verify-full, which fails in WSL (cert chain not trusted).
  // Strip sslmode from the URL and pass ssl explicitly to the Pool instead.
  const connectionString = buildConnectionString(process.env.DATABASE_URL ?? "");
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 1,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
