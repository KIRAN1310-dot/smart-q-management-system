"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw, Activity, UserCheck, SkipForward } from "lucide-react";

export default function HospitalAdmin() {
  const [hospitalName, setHospitalName] = useState("City General Hospital");
  const [speciality, setSpeciality] = useState("Cardiology");
  const [doctorName, setDoctorName] = useState("Dr. Ramesh, MBBS");
  const [currentCall, setCurrentCall] = useState(1);
  const [skippedCount, setSkippedCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hName = window.localStorage.getItem("smartq_hosp_name");
    const spec = window.localStorage.getItem("smartq_hosp_spec");
    const doc = window.localStorage.getItem("smartq_hosp_doctor");
    const call = window.localStorage.getItem("smartq_current_call");

    if (hName) setHospitalName(hName);
    if (spec) setSpeciality(spec);
    if (doc) setDoctorName(doc);
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
      window.localStorage.setItem("smartq_current_call", val.toString());
    }
  };

  const handleSkip = () => {
    setSkippedCount(prev => prev + 1);
    updateCall(currentCall + 1);
  };

  return (
    <main className="min-h-screen bg-sky-950 px-4 py-8 text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900 border border-sky-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/login/admin" className="text-xs text-sky-400 hover:underline flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full uppercase">
            🏥 Hospital Control Room
          </span>
        </div>

        <h1 className="text-2xl font-black mb-1 flex items-center gap-2">
          <Activity className="text-sky-400" /> Patient Queue & Data Feed
        </h1>
        <p className="text-xs text-slate-400 mb-6">Feed organization data and control doctor tokens in real-time.</p>

        {/* DATA FEEDING FORM */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-sky-500/20 mb-6 space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Hospital Name:</label>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => { setHospitalName(e.target.value); saveSettings("smartq_hosp_name", e.target.value); }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-sky-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Speciality / Department:</label>
              <select
                value={speciality}
                onChange={(e) => { setSpeciality(e.target.value); saveSettings("smartq_hosp_spec", e.target.value); }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 outline-none"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Doctor Name:</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => { setDoctorName(e.target.value); saveSettings("smartq_hosp_doctor", e.target.value); }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-sky-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* TOKEN CALLING DISPLAY */}
        <div className="bg-slate-950 border border-sky-500/30 p-6 rounded-2xl text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Now Calling Token</p>
          <p className="text-6xl font-black text-sky-400 my-3">#{currentCall}</p>
          <p className="text-xs text-sky-300 font-semibold mb-4">{hospitalName} — {speciality} ({doctorName})</p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => updateCall(currentCall - 1)}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              Previous
            </button>
            <button
              onClick={() => updateCall(currentCall + 1)}
              className="bg-sky-600 hover:bg-sky-500 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-sky-600/30 transition flex items-center gap-1"
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