import { db } from "@/lib/db";
import { currentUser } from "@/lib/session";


export default async function Dashboard() {
const user = await currentUser();
const total = await db.word.count();
const unlocked = await db.progress.count({ where: { userId: user!.id, unlocked: true } });
return (
<section className="grid gap-6">
<h1 className="text-2xl font-semibold">Dashboard</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<StatCard label="Unlocked words" value={unlocked} />
<StatCard label="Total words" value={total} />
<StatCard label="Mastery avg" value={await avgMastery(user!.id)} />
</div>
</section>
);
}


async function avgMastery(userId: string) {
const rows = await db.progress.groupBy({ by: ["userId"], _avg: { mastery: true }, where: { userId } });
return Math.round((rows[0]?._avg.mastery || 0) * 10) / 10;
}


function StatCard({ label, value }: { label: string; value: number }) {
return (
<div className="rounded-xl border bg-white p-4">
<div className="text-sm text-gray-500">{label}</div>
<div className="text-2xl font-semibold">{value}</div>
</div>
);
}
