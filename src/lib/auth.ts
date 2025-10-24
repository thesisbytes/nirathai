import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  code: z.string().min(4),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "database" },
  providers: [
    Credentials({
      name: "Dev Login",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Access Code", type: "password" },
      },
      async authorize(credentials) {
        const parsed = schema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, code } = parsed.data;
        const user = await db.user.findUnique({ where: { email } });
        if (user && code === "1234") return user;
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
};
