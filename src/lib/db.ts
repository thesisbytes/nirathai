import { PrismaClient } from "@prisma/client";
export const db = globalThis.__db || new PrismaClient();
if (process.env.NODE_ENV !== "production") (globalThis as any).__db = db;
