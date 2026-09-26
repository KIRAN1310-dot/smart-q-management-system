"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw, Landmark, CreditCard } from "lucide-react";

export default function BankAdmin() {
  const [currentCall, setCurrentCall] = useState(1);
  const [serviceName, setServiceName] = useState("Cash Deposit / Withdrawal");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("smartq_bank_current_call");
    if (saved) setCurrentCall(parseInt(saved, 10));
    const savedServ = window.localStorage.getItem("smartq_bank_service");
    if (savedServ) setServiceName(savedServ);
  }, []);

  const updateCall = (newVal: number) => {
    const val = newVal < 1 ? 1 : newVal;
    setCurrentCall(val);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_bank_current_call", val.toString());
    }
  };

  const handleServChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(e.target.value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_bank_service", e.target.value);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/admin/select-sector" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Sectors
          </Link>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full uppercase">
            🏦 Bank Control Room
          </span>
        </div>

        <h1 className="text-2xl font-black mb-1 flex items-center gap-2">
          <Landmark className="text-emerald-400" /> Bank Queue Management
        </h1>
        <p className="text-xs text-slate-400 mb-6">Manage live counter tokens and banking services.</p>

        {/* FEED DATA SECTION */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 mb-6 space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Active Counter Service:</label>
            <input 
              type="text" 
              value={serviceName} 
              onChange={handleServChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-emerald-500 outline-none"
              placeholder="Enter Service Name"
            />
          </div>
        </div>

        {/* COUNTER DISPLAY */}
        <div className="bg-slate-900/80 border border-emerald-500/30 p-6 rounded-2xl text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Now Calling Token</p>
          <p className="text-6xl font-black text-emerald-400 my-3">#{currentCall}</p>
          
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => updateCall(currentCall - 1)}
              className="bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition"
            >
              Previous
            </button>
            <button 
              onClick={() => updateCall(currentCall + 1)}
              className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-1"
            >
              <Plus size={16} /> Next Token
            </button>
            <button 
              onClick={() => updateCall(1)}
              className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-4 py-2.5 rounded-xl text-sm transition"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}