"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ShieldCheck, ArrowRight, Lock, Activity, Landmark } from "lucide-react";

export default function CombinedLoginPage() {
  const router = useRouter();

  // User Login States
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userError, setUserError] = useState("");

  // Admin Login States
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [sector, setSector] = useState("hospital");
  const [adminError, setAdminError] = useState("");

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      setUserError("Please fill all user fields!");
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_user", userEmail);
    }
    router.push("/dashboard");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      setAdminError("Please fill all admin fields!");
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_admin_user", adminUsername);
      window.localStorage.setItem("smartq_admin_sector", sector);
    }
    if (sector === "hospital") {
      router.push("/admin/hospital");
    } else {
      router.push("/admin/bank");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-5xl z-10">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/30 px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            SmartQ Enterprise Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">
            Queue Management System
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Choose your login portal to access user booking or admin control rooms.
          </p>
        </div>

        {/* SIDE BY SIDE LOGIN FORMS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. USER LOGIN CARD (Hospital/Bank User) */}
          <div className="bg-slate-900/90 border border-sky-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-sky-400 pointer-events-none">
              <Activity size={90} />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">User Login</h2>
                  <p className="text-xs text-slate-400">Book tokens & track live queues</p>
                </div>
              </div>

              {userError && (
                <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs text-center">
                  {userError}
                </div>
              )}

              <form onSubmit={handleUserLogin} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Email / Username</label>
                  <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Password</label>
                  <input
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 text-sm mt-2"
                >
                  Login as User <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
              Patients & Bank Customers Access
            </div>
          </div>

          {/* 2. ADMIN LOGIN CARD (Hospital/Bank Control Room) */}
          <div className="bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-400 pointer-events-none">
              <Landmark size={90} />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Admin Control Login</h2>
                  <p className="text-xs text-slate-400">Feed data & manage live queues</p>
                </div>
              </div>

              {adminError && (
                <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs text-center">
                  {adminError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Organization Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition"
                  >
                    <option value="hospital">🏥 Hospital Control Room</option>
                    <option value="bank">🏦 Bank Control Room</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Admin Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm mt-2"
                >
                  Access Control Room <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
              Hospital & Bank Admin Access
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}