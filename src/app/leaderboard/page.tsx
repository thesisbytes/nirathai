// app/leaderboard/page.tsx
export const dynamic = 'force-dynamic'; // don't prerender at build
export const revalidate = 0;             // no static cache
export const runtime = 'nodejs';         // Prisma needs Node runtime
// (You can drop fetchCache; it only affects fetch(), not Prisma.)

import { prisma } from '@/lib/prisma';
import type { User } from '@prisma/client';

type GroupRow = { userId: string; _sum: { xp: number | null } };

export default async function LeaderboardPage() {
  let rows: GroupRow[] = [];

  try {
    rows = (await prisma.progress.groupBy({
      by: ['userId'],
      _sum: { xp: true },
      orderBy: { _sum: { xp: 'desc' } },
      take: 20,
    })) as unknown as GroupRow[];
  } catch (err) {
    // If tables aren't there yet (first deploy), don't crash the build/runtime
    return (
      <section className="grid gap-4">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-sm text-gray-600">
          No data yet. If this is a fresh Heroku app, run your Prisma migrations:
          <code className="ml-2">heroku run npx prisma migrate deploy</code>
        </p>
      </section>
    );
  }

  if (!rows.length) {
    return (
      <section className="grid gap-4">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-sm text-gray-600">No scores yet — be the first!</p>
      </section>
    );
  }

  const userIds = rows.map((r) => r.userId).filter(Boolean);
  const users: User[] = userIds.length
    ? await prisma.user.findMany({ where: { id: { in: userIds } } })
    : [];
  const map = new Map(users.map((u) => [u.id, u]));

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
                {map.get(r.userId)?.name ?? 'Anonymous'}
              </span>
            </div>
            <div className="tabular-nums">{r._sum.xp ?? 0} XP</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
