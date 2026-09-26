"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw, Landmark, SkipForward } from "lucide-react";

export default function BankAdmin() {
  const [branchName, setBranchName] = useState("Main City Branch");
  const [serviceName, setServiceName] = useState("Cash Deposit / Withdrawal");
  const [currentCall, setCurrentCall] = useState(1);
  const [skippedCount, setSkippedCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bName = window.localStorage.getItem("smartq_bank_branch");
    const serv = window.localStorage.getItem("smartq_bank_service");
    const call = window.localStorage.getItem("smartq_bank_current_call");

    if (bName) setBranchName(bName);
    if (serv) setServiceName(serv);
    if (call) setCurrentCall(parseInt(call, 10));
  }, []);

  const saveSettings = (key: string, val: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, val);
  };

  const updateCall = (newVal: number) => {
    const val = newVal < 1 ? 1 : newVal;
    setCurrentCall(val);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartq_bank_current_call", val.toString());
    }
  };

  const handleSkip = () => {
    setSkippedCount(prev => prev + 1);
    updateCall(currentCall + 1);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/login/admin" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full uppercase">
            🏦 Bank Control Room
          </span>
        </div>

        <h1 className="text-2xl font-black mb-1 flex items-center gap-2">
          <Landmark className="text-emerald-400" /> Bank Queue & Data Feed
        </h1>
        <p className="text-xs text-slate-400 mb-6">Feed bank branch data and manage counter services.</p>

        {/* DATA FEEDING FORM */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/20 mb-6 space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Bank Branch Name:</label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => { setBranchName(e.target.value); saveSettings("smartq_bank_branch", e.target.value); }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Counter Service:</label>
            <select
              value={serviceName}
              onChange={(e) => { setServiceName(e.target.value); saveSettings("smartq_bank_service", e.target.value); }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
            >
              <option value="Cash Deposit / Withdrawal">Cash Deposit / Withdrawal</option>
              <option value="Account Opening & KYC">Account Opening & KYC</option>
              <option value="Loan & Enquiries">Loan & Enquiries</option>
              <option value="Forex & Cards">Forex & Cards</option>
            </select>
          </div>
        </div>

        {/* TOKEN CALLING DISPLAY */}
        <div className="bg-slate-950 border border-emerald-500/30 p-6 rounded-2xl text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Now Calling Token</p>
          <p className="text-6xl font-black text-emerald-400 my-3">#{currentCall}</p>
          <p className="text-xs text-emerald-300 font-semibold mb-4">{branchName} — {serviceName}</p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => updateCall(currentCall - 1)}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              Previous
            </button>
            <button
              onClick={() => updateCall(currentCall + 1)}
              className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-1"
            >
              <Plus size={14} /> Next Token
            </button>
            <button
              onClick={handleSkip}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-2.5 rounded-xl text-xs transition flex items-center gap-1"
            >
              <SkipForward size={14} /> Skip ({skippedCount})
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}