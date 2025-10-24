import { db } from "@/lib/db";
import Link from "next/link";

type WeekOnly = { week: number };

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
