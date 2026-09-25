"use client";

import { useEffect, useState } from "react";
import { BellRing, RotateCcw, Users, Plus, Trash2, ArrowLeft, Stethoscope } from "lucide-react";
import Link from "next/link";
import { readNumber, STORAGE_KEYS } from "../../../lib/queue";

export default function HospitalAdminPage() {
  const [currentCall, setCurrentCall] = useState(0);
  const [lastIssued, setLastIssued] = useState(0);
  const [doctorInput, setDoctorInput] = useState("");
  const [doctorsList, setDoctorsList] = useState<string[]>([]);

  useEffect(() => {
    loadData();
    window.addEventListener("storage", loadData);
    const interval = window.setInterval(loadData, 500);
    return () => {
      window.removeEventListener("storage", loadData);
      window.clearInterval(interval);
    };
  }, []);

  function loadData() {
    setCurrentCall(readNumber(STORAGE_KEYS.currentCall));
    setLastIssued(readNumber(STORAGE_KEYS.lastIssuedToken));
    const saved = localStorage.getItem("smartq_hospital_specialists");
    if (saved) {
      setDoctorsList(JSON.parse(saved));
    } else {
      setDoctorsList([]);
    }
  }

  function handleAddDoctor(e: React.FormEvent) {
    e.preventDefault();
    if (!doctorInput.trim()) return;
    const updated = [...doctorsList, doctorInput.trim()];
    setDoctorsList(updated);
    localStorage.setItem("smartq_hospital_specialists", JSON.stringify(updated));
    setDoctorInput("");
  }

  function handleDeleteDoctor(index: number) {
    const updated = doctorsList.filter((_, i) => i !== index);
    setDoctorsList(updated);
    localStorage.setItem("smartq_hospital_specialists", JSON.stringify(updated));
  }

  function callNext() {
    const next = currentCall + 1;
    const issued = Math.max(lastIssued, next);
    localStorage.setItem(STORAGE_KEYS.lastIssuedToken, String(issued));
    localStorage.setItem(STORAGE_KEYS.currentCall, String(next));
    setCurrentCall(next);
    setLastIssued(issued);
  }

  function resetQueue() {
    localStorage.setItem(STORAGE_KEYS.currentCall, "0");
    localStorage.setItem(STORAGE_KEYS.lastIssuedToken, "0");
    setCurrentCall(0);
    setLastIssued(0);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1" href="/select-sector">
            <ArrowLeft size={14} /> Back to Sectors
          </Link>
          <span className="text-xs bg-teal-500/10 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full uppercase font-semibold">
            Hospital Admin Portal
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-teal-500/20 bg-slate-900 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 flex items-center justify-center gap-1">
                <Stethoscope className="text-teal-400" size={14} /> Hospital Live Calling
              </p>
              <div className="my-6 text-7xl font-black tracking-tight text-teal-300">
                {currentCall ? `#${currentCall}` : "—"}
              </div>
              <button
                onClick={callNext}
                className="mx-auto flex w-full items-center justify-center gap-3 rounded-2xl bg-teal-500 px-6 py-4 text-lg font-black text-slate-950 shadow-lg hover:bg-teal-400 transition"
              >
                <BellRing size={18} /> CALL NEXT HOSPITAL TOKEN
              </button>
              <button onClick={resetQueue} className="mx-auto mt-4 flex items-center gap-1 text-xs text-slate-500 hover:text-red-300">
                <RotateCcw size={13} /> Reset Hospital Queue
              </button>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-base font-bold text-teal-400 mb-1">Feed Hospital Doctors / Specialists</h2>
              <p className="text-xs text-slate-400 mb-4">Add doctors so users can select them during booking.</p>
              <form onSubmit={handleAddDoctor} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={doctorInput}
                  onChange={(e) => setDoctorInput(e.target.value)}
                  placeholder="e.g. Dr. Arun (Cardiologist)"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400"
                />
                <button type="submit" className="bg-teal-500 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs hover:bg-teal-400 flex items-center gap-1">
                  <Plus size={14} /> Add
                </button>
              </form>
              {doctorsList.length === 0 ? (
                <p className="text-slate-500 text-xs italic">No doctors added yet.</p>
              ) : (
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {doctorsList.map((doc, idx) => (
                    <li key={idx} className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl flex justify-between items-center text-xs">
                      <span>{doc}</span>
                      <button onClick={() => handleDeleteDoctor(idx)} className="text-red-400 hover:text-red-300">
                        <Trash2 size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <Users className="text-teal-400 mb-2" size={20} />
              <p className="text-xs text-slate-500">Last Issued Token</p>
              <p className="mt-1 text-3xl font-black">{lastIssued ? `#${lastIssued}` : "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}