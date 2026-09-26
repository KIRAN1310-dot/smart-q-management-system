"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function StatusPage() {
  const [sector, setSector] = useState("hospital");
  const [currentCall, setCurrentCall] = useState(0);
  const [myToken, setMyToken] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const selectedSector = params.get("sector") || "hospital";
    setSector(selectedSector);

    const currentKey = selectedSector === "bank" ? "smartq_bank_current_call" : "smartq_current_call";
    const tokenKey = selectedSector === "bank" ? "smartq_bank_my_token" : "smartq_my_token";
    const userKey = `smartq_${selectedSector}_user_details`;

    const loadData = () => {
      setCurrentCall(Number(window.localStorage.getItem(currentKey)) || 0);
      setMyToken(Number(window.localStorage.getItem(tokenKey)) || 0);
      const userValue = window.localStorage.getItem(userKey);
      if (userValue) {
        try { setUserData(JSON.parse(userValue)); } catch (e) { setUserData(null); }
      }
    };

    loadData();
    const timer = window.setInterval(loadData, 500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border border-teal-500/20 p-6 sm:p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Link href={`/book?sector=${sector}`} className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Booking
          </Link>
          <span className="text-xs bg-teal-500/10 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full uppercase">
            {sector} Live Status
          </span>
        </div>

        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 text-teal-400 mb-3">
            <CheckCircle size={28} />
          </div>
          <h1 className="text-2xl font-black">Token Status</h1>
        </div>

        {userData && (
          <div className="my-6 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-left space-y-2 text-xs">
            <p><span className="text-slate-500">Name:</span> <b>{userData.firstName || "-"}</b></p>
            <p><span className="text-slate-500">Mobile:</span> <b>{userData.mobile || "-"}</b></p>
            <p><span className="text-slate-500">Location:</span> <b>{userData.district || userData.dist || "-"}</b></p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
            <p className="text-xs text-slate-500 uppercase">Your Token</p>
            <p className="text-4xl font-black text-teal-300 mt-2">{myToken > 0 ? `#${myToken}` : "—"}</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
            <p className="text-xs text-slate-500 uppercase">Now Calling</p>
            <p className="text-4xl font-black text-amber-400 mt-2">{currentCall > 0 ? `#${currentCall}` : "—"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}