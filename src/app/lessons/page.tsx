export const dynamic = 'force-dynamic';      // do not prerender
// OR, if you prefer ISR without build-time fetch:
export const revalidate = 0;                 // no static cache
// (App Router also supports:)
export const fetchCache = 'force-no-store';

import { db } from "@/lib/db";
import Link from "next/link";

type WeekOnly = { week: number };

import { prisma } from '@/lib/prisma';

export default async function Page() {
  try {
    const words = await prisma.word.findMany();
    // render with words
  } catch (err) {
    // render an empty state instead of throwing during build
    return <EmptyState message="No data yet. Check back soon!" />;
  }
}

export default async function Lessons() {
  const weeks = (await db.word.findMany({
    select: { week: true },
    distinct: ["week"],
    orderBy: { week: "asc" },
  })) as WeekOnly[];

  const list = weeks.map((w: WeekOnly) => w.week);

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
