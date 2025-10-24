import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Word } from "@prisma/client";

export default async function Week({ params }: { params: { week: string } }) {
  const week = Number(params.week);

  const words = (await db.word.findMany({
    where: { week },
    orderBy: { english: "asc" },
  })) as Word[];

  if (!words.length) notFound();

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Week {week}</h1>
      <ul className="grid gap-2">
        {words.map((w: Word) => (
          <li
            key={w.id}
            className="rounded border bg-white p-3 flex justify-between"
          >
            <div>
              <div className="font-medium">{w.english}</div>
              <div className="text-sm text-gray-600">
                {w.thai} · {w.roman}
              </div>
            </div>
            <form action={`/api/progress/unlock`} method="post">
              <input type="hidden" name="wordId" value={w.id} />
              <button className="text-sm rounded px-3 py-1 border">Unlock</button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
