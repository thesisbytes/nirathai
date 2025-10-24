import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/session";


export async function POST(req: Request) {
const user = await currentUser();
if (!user) return NextResponse.json({ ok: false }, { status: 401 });
const { wordId, delta } = await req.json();
const prog = await db.progress.upsert({
where: { userId_wordId: { userId: user.id, wordId } },
update: { xp: { increment: delta ?? 1 } },
create: { userId: user.id, wordId, xp: delta ?? 1 },
});
// naive mastery: every 20 XP -> +1 level (cap 5)
const mastery = Math.min(5, Math.floor((prog.xp) / 20));
if (mastery !== prog.mastery) {
await db.progress.update({ where: { id: prog.id }, data: { mastery } });
}
return NextResponse.json({ ok: true });
}
