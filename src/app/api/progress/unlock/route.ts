import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/session";


export async function POST(req: Request) {
const user = await currentUser();
if (!user) return NextResponse.json({ ok: false }, { status: 401 });
const form = await req.formData();
const wordId = String(form.get("wordId"));
await db.progress.upsert({
where: { userId_wordId: { userId: user.id, wordId } },
update: { unlocked: true },
create: { userId: user.id, wordId, unlocked: true },
});
return NextResponse.redirect(`/lessons`);
}
