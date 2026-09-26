"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowRight, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UserRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all fields!");
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_user", email);
    }
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900 border border-sky-500/30 p-8 rounded-3xl shadow-2xl relative z-10">
        
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <UserPlus size={24} />
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>

        <h1 className="text-2xl font-black mb-1">Create User Account</h1>
        <p className="text-xs text-slate-400 mb-6">Register to book and track hospital & bank tokens.</p>

        {error && (
          <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 text-sm mt-4"
          >
            Register & Continue <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </main>
  );
}