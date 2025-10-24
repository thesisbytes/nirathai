import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


async function main() {
const words = [
{ english: "hello", thai: "สวัสดี", roman: "sa-wat-dee", week: 1, chunkId: "W1C1" },
{ english: "thank you", thai: "ขอบคุณ", roman: "khop-khun", week: 1, chunkId: "W1C1" },
{ english: "rice", thai: "ข้าว", roman: "khao", week: 2, chunkId: "W2C1" }
];
await db.word.createMany({ data: words });
await db.user.upsert({
where: { email: "student@example.com" },
update: {},
create: { email: "student@example.com", name: "Student One" }
});
}


main().finally(() => db.$disconnect());
