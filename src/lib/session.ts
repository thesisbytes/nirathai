import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";

// Returns the full DB user (has id, email, etc.) or null
export async function currentUser() {
  const s = await getServerSession(authOptions);
  const email = s?.user?.email;
  if (!email) return null;
  const user = await db.user.findUnique({ where: { email } });
  return user; // <-- includes .id
}

// If you still want raw NextAuth session elsewhere:
export async function session() {
  return getServerSession(authOptions);
}
