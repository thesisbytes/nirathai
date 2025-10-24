"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function Login() {
const [email, setEmail] = useState("student@example.com");
const [code, setCode] = useState("1234");
const [loading, setLoading] = useState(false);


async function onSubmit(e: React.FormEvent) {
e.preventDefault();
setLoading(true);
await signIn("credentials", { email, code, callbackUrl: "/dashboard" });
}


return (
<div className="max-w-sm mx-auto">
<h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
<form onSubmit={onSubmit} className="grid gap-3">
<label className="grid gap-1 text-sm">
<span>Email</span>
<input className="border rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
</label>
<label className="grid gap-1 text-sm">
<span>Access code</span>
<input className="border rounded px-3 py-2" value={code} onChange={e=>setCode(e.target.value)} />
</label>
<button disabled={loading} className="rounded bg-gray-900 text-white px-3 py-2">{loading?"Logging in…":"Log in"}</button>
</form>
<p className="text-xs text-gray-500 mt-3">MVP uses code <code>1234</code> for dev. Replace with email magic links or OAuth later.</p>
</div>
);
}
