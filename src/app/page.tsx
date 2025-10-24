import Link from "next/link";


export default function Home() {
return (
<section className="grid gap-6">
<h1 className="text-3xl font-bold">Learn Thai. Play. Level Up.</h1>
<p className="text-gray-600 max-w-prose">Your portal for lessons, flashcards, quizzes, and the competitive matching game. Pass quizzes to unlock words; earn XP to climb the leaderboard.</p>
<div className="flex gap-3">
<Link href="/login" className="rounded-xl px-4 py-2 bg-gray-900 text-white">Log in</Link>
<Link href="/lessons" className="rounded-xl px-4 py-2 border">Browse lessons</Link>
</div>
</section>
);
}
