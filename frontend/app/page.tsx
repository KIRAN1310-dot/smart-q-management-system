"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ShieldCheck, ArrowRight, Activity, Landmark, UserPlus, UserCheck } from "lucide-react";

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
      
      {/* BACKGROUND GRAPHICS & SECTOR THEME GLOWS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-5xl z-10">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold shadow-sm">
            SmartQ Enterprise Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Multi-Tenant Queue Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time token booking & control rooms for Healthcare and Banking sectors.
          </p>
        </div>

        {/* SIDE BY SIDE LOGIN FORMS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. USER LOGIN CARD */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-sky-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/60 transition">
            
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-sky-400 group-hover:scale-105 transition duration-500">
              <Activity size={220} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-inner">
                    <User size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">User Login</h2>
                    <p className="text-xs text-sky-400/80">🏥 Hospital & Bank Client Access</p>
                  </div>
                </div>
              </div>

              {userError && (
                <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs text-center">
                  {userError}
                </div>
              )}

              <form onSubmit={handleUserLogin} className="space-y-4 relative z-10">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Email / Username</label>
                  <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-sky-500 outline-none transition"
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

            {/* REGISTER ACCOUNT LINK */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
              <span className="text-slate-400">New user? Create an account</span>
              <a 
                href="/register" 
                className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-lg transition"
              >
                <UserPlus size={14} /> Register Here
              </a>
            </div>
          </div>

          {/* 2. ADMIN LOGIN CARD */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/60 transition">
            
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-emerald-400 group-hover:scale-105 transition duration-500">
              <Landmark size={220} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Admin Control Login</h2>
                    <p className="text-xs text-emerald-400/80">🏦 Hospital & Bank Control Rooms</p>
                  </div>
                </div>
              </div>

              {adminError && (
                <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-xl text-xs text-center">
                  {adminError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-3 relative z-10">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Organization Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition cursor-pointer"
                  >
                    <option value="hospital" className="bg-slate-900">🏥 Hospital Control Room</option>
                    <option value="bank" className="bg-slate-900">🏦 Bank Control Room</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Admin Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none transition"
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

            {/* ADMIN REGISTER / SIGNUP LINK */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
              <span className="text-slate-400">New organization? Register admin</span>
              <a 
                href="/admin/register" 
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition"
              >
                <UserCheck size={14} /> Admin Register
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}