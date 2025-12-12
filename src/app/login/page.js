"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const logged = window.localStorage.getItem("fittrackplus-loggedin") === "true";
    if (logged) {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    window.localStorage.setItem("fittrackplus-loggedin", "true");
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            FitTrack+
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to view your fitness & nutrition dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 text-white text-sm font-semibold py-2.5 shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-400">
          Demo login only – enter any email & password to continue.
        </p>
      </div>
    </div>
  );
}
