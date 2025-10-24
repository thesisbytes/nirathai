import "./globals.css";
import Link from "next/link";


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-gray-50 text-gray-900">
<header className="border-b bg-white">
<nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
<Link href="/" className="font-semibold">NiraThai</Link>
<div className="flex gap-4 text-sm">
<Link href="/dashboard">Dashboard</Link>
<Link href="/lessons">Lessons</Link>
<Link href="/leaderboard">Leaderboard</Link>
</div>
</nav>
</header>
<main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
</body>
</html>
);
}
