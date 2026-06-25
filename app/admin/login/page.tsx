"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/admin";

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const data = (await response.json().catch(() => ({}))) as { error?: string };
                throw new Error(data.error || "Login failed.");
            }

            router.push(next.startsWith("/admin") ? next : "/admin");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed.");
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4 rounded-2xl border border-[#173d36]/15 bg-white p-7 shadow-sm"
        >
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a15c]">Scooptopia</p>
                <h1 className="mt-2 text-2xl font-semibold text-[#173d36]">Admin Sign In</h1>
                <p className="mt-1 text-sm text-[#173d36]/70">Enter the admin password to manage content.</p>
            </div>

            <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#173d36]/70">Password</span>
                <input
                    type="password"
                    autoFocus
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#173d36]/20 bg-white px-3 py-2 text-sm text-[#173d36] outline-none focus:border-[#c9a15c]"
                />
            </label>

            {error ? <p className="text-sm text-red-700">{error}</p> : null}

            <button
                type="submit"
                disabled={submitting || password.length === 0}
                className="w-full rounded bg-[#173d36] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#26564d] disabled:cursor-not-allowed disabled:opacity-70"
            >
                {submitting ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}

export default function AdminLoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f6f4ef] px-4 py-10">
            <Suspense fallback={null}>
                <LoginForm />
            </Suspense>
        </main>
    );
}
