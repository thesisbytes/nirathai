import { db } from "@/lib/db";
import type { User } from "@prisma/client";

type GroupRow = { userId: string; _sum: { xp: number | null } };

export default async function Leaderboard() {
  const rows = (await db.progress.groupBy({
    by: ["userId"],
    _sum: { xp: true },
    orderBy: { _sum: { xp: "desc" } },
    take: 20,
  })) as GroupRow[];

  const userIds = rows.map((r) => r.userId);
  const users: User[] = await db.user.findMany({ where: { id: { in: userIds } } });
  const map = new Map(users.map((u: User) => [u.id, u]));

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <ol className="bg-white rounded-xl border">
        {rows.map((r, i) => (
          <li
            key={r.userId}
            className="flex items-center justify-between p-3 border-b last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-right">{i + 1}</span>
              <span className="font-medium">
                {map.get(r.userId)?.name ?? "Anonymous"}
              </span>
            </div>
            <div className="tabular-nums">{r._sum.xp ?? 0} XP</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
