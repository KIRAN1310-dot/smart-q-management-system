"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("hospital");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Ella fields-aiyum fill pannunga!");
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
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-teal-500/30 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 text-teal-400 mb-3">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black">Admin Control Login</h1>
          <p className="text-xs text-slate-400 mt-1">Select your organization sector to manage queue</p>
        </div>

        {error && (
          <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Organization Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-teal-500 outline-none"
            >
              <option value="hospital">🏥 Hospital Control Room</option>
              <option value="bank">🏦 Bank Control Room</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Admin Username</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-3.5 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-3.5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 text-sm"
          >
            Access Control Room <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login/user" className="text-xs text-slate-400 hover:text-teal-400">
            Switch to User Login
          </Link>
        </div>
      </div>
    </main>
  );
}