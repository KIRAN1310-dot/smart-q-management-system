"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("hospital");
  const [error, setError] = useState("");

  const handleAdminRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill all fields!");
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_admin_user", username);
      window.localStorage.setItem("smartq_admin_sector", sector);
    }
    if (sector === "hospital") {
      router.push("/admin/hospital");
    } else {
      router.push("/admin/bank");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl relative z-10">
        
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <UserCheck size={24} />
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>

        <h1 className="text-2xl font-black mb-1">Register Control Room</h1>
        <p className="text-xs text-slate-400 mb-6">Create an admin account to manage live queues and sectors.</p>

        {error && (
          <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminRegister} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Organization Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-emerald-500 outline-none transition cursor-pointer"
            >
              <option value="hospital">🏥 Hospital Control Room</option>
              <option value="bank">🏦 Bank Control Room</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Admin Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm mt-4"
          >
            Create Control Room <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </main>
  );
}