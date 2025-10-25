// app/lessons/page.tsx
export const dynamic = 'force-dynamic'; // avoid prerender hitting DB at build
export const revalidate = 0;            // no static cache
export const runtime = 'nodejs';        // Prisma needs Node runtime

import Link from "next/link";
import { prisma } from "@/lib/prisma";  // <- use ONE client

type WeekOnly = { week: number };

export default async function LessonsPage() {
  let weeks: WeekOnly[] = [];

  try {
    weeks = (await prisma.word.findMany({
      select: { week: true },
      distinct: ["week"],
      orderBy: { week: "asc" },
    })) as WeekOnly[];
  } catch (err) {
    // Friendly fallback instead of crashing during build/deploy
    return (
      <section className="grid gap-4">
        <h1 className="text-2xl font-semibold">Lessons</h1>
        <p className="text-sm text-gray-600">
          No data yet. If this is the first deploy, run your Prisma migrations on Heroku.
        </p>
      </section>
    );
  }

  if (!weeks.length) {
    return (
      <section className="grid gap-4">
        <h1 className="text-2xl font-semibold">Lessons</h1>
        <p className="text-sm text-gray-600">No lessons yet.</p>
      </section>
    );
  }

  const list = weeks.map(w => w.week);

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Lessons</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {list.map((week) => (
          <Link
            key={week}
            href={`/lessons/${week}`}
            className="rounded-xl border bg-white p-4 hover:shadow"
          >
            <div className="text-sm text-gray-500">Week</div>
            <div className="text-xl font-semibold">{week}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
