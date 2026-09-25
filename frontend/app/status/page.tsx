"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { readNumber, STORAGE_KEYS } from "../../lib/queue";
import { CheckCircle, Clock, Hash, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const sector = searchParams.get("sector") || "hospital";

  const [currentCall, setCurrentCall] = useState(0);
  const [myToken, setMyToken] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  const currentCallKey = sector === "bank" ? "smartq_bank_current_call" : STORAGE_KEYS.currentCall;
  const myTokenKey = sector === "bank" ? "smartq_bank_my_token" : STORAGE_KEYS.myToken;
  const userDetailsKey = `smartq_${sector}_user_details`;

  useEffect(() => {
    const load = () => {
      setCurrentCall(readNumber(currentCallKey));
      setMyToken(readNumber(myTokenKey));

      const savedUser = localStorage.getItem(userDetailsKey);
      if (savedUser) {
        setUserData(JSON.parse(savedUser));
      }
    };

    load();
    window.addEventListener("storage", load);
    const interval = window.setInterval(load, 500);

    return () => {
      window.removeEventListener("storage", load);
      window.clearInterval(interval);
    };
  }, [sector, currentCallKey, myTokenKey, userDetailsKey]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border border-teal-500/20 p-6 sm:p-8 rounded-3xl shadow-2xl">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href={`/book?sector=${sector}`} className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1 transition">
            <ArrowLeft size={14} /> Back to Booking
          </Link>
          <span className="text-xs bg-teal-500/10 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full uppercase font-semibold">
            {sector} Live Status
          </span>
        </div>

        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 text-teal-400 mb-3">
            <CheckCircle size={28} />
          </div>
          <h1 className="text-2xl font-black">Token Status</h1>
          <p className="text-xs text-slate-400 mt-1">Live updates synced directly from the counter.</p>
        </div>

        {/* User Details Box */}
        {userData && (
          <div className="my-6 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-left space-y-2 text-xs">
            <p><span className="text-slate-500">Name:</span> <span className="font-bold text-slate-200">{userData.firstName}</span></p>
            <p><span className="text-slate-500">Mobile:</span> <span className="font-bold text-slate-200">{userData.mobile}</span></p>
            <p><span className="text-slate-500">Location:</span> <span className="font-bold text-slate-200">{userData.district}, {userData.state}</span></p>
            <p><span className="text-slate-500">{sector === "bank" ? "Service" : "Doctor"}:</span> <span className="font-bold text-teal-300">{userData.selection}</span></p>
          </div>
        )}

        {/* Tokens Display Grid */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Your Token</p>
            <p className="text-4xl font-black text-teal-300 mt-2">{myToken ? `#${myToken}` : "—"}</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Now Calling</p>
            <p className="text-4xl font-black text-amber-400 mt-2">{currentCall ? `#${currentCall}` : "—"}</p>
          </div>
        </div>

        {/* Turn Indicator */}
        {myToken > 0 && (
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-center text-teal-300">
            {currentCall >= myToken ? (
              <span className="font-bold text-teal-400 text-sm">🎉 It's your turn! Please proceed to the counter.</span>
            ) : (
              <span>⏳ People ahead of you in queue: <b className="text-amber-400">{Math.max(0, myToken - currentCall)}</b></span>
            )}
          </div>
        )}

      </div>
    </main>
  );
}