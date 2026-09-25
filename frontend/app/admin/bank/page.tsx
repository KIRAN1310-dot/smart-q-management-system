"use client";

import { useEffect, useState } from "react";
import { BellRing, RotateCcw, Users, Plus, Trash2, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function BankAdminPage() {
  const [currentCall, setCurrentCall] = useState(0);
  const [lastIssued, setLastIssued] = useState(0);
  const [serviceInput, setServiceInput] = useState("");
  const [servicesList, setServicesList] = useState<string[]>([]);

  const currentCallKey = "smartq_bank_current_call";
  const lastIssuedKey = "smartq_bank_last_issued";
  const servicesStorageKey = "smartq_bank_services";

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
    const savedCall = localStorage.getItem(currentCallKey);
    const savedIssued = localStorage.getItem(lastIssuedKey);
    setCurrentCall(savedCall ? parseInt(savedCall, 10) : 0);
    setLastIssued(savedIssued ? parseInt(savedIssued, 10) : 0);

    const savedServices = localStorage.getItem(servicesStorageKey);
    if (savedServices) {
      setServicesList(JSON.parse(savedServices));
    } else {
      setServicesList([]);
    }
  }

  function handleAddService(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceInput.trim()) return;
    const updated = [...servicesList, serviceInput.trim()];
    setServicesList(updated);
    localStorage.setItem(servicesStorageKey, JSON.stringify(updated));
    setServiceInput("");
  }

  function handleDeleteService(index: number) {
    const updated = servicesList.filter((_, i) => i !== index);
    setServicesList(updated);
    localStorage.setItem(servicesStorageKey, JSON.stringify(updated));
  }

  function callNext() {
    const next = currentCall + 1;
    const issued = Math.max(lastIssued, next);
    localStorage.setItem(lastIssuedKey, String(issued));
    localStorage.setItem(currentCallKey, String(next));
    setCurrentCall(next);
    setLastIssued(issued);
  }

  function resetQueue() {
    localStorage.setItem(currentCallKey, "0");
    localStorage.setItem(lastIssuedKey, "0");
    setCurrentCall(0);
    setLastIssued(0);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1" href="/select-sector">
            <ArrowLeft size={14} /> Back to Sectors
          </Link>
          <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full uppercase font-semibold">
            Bank Admin Portal
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-500/20 bg-slate-900 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 flex items-center justify-center gap-1">
                <Building2 className="text-amber-400" size={14} /> Bank Live Calling
              </p>
              <div className="my-6 text-7xl font-black tracking-tight text-amber-300">
                {currentCall ? `#${currentCall}` : "—"}
              </div>
              <button
                onClick={callNext}
                className="mx-auto flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-500 px-6 py-4 text-lg font-black text-slate-950 shadow-lg hover:bg-amber-400 transition"
              >
                <BellRing size={18} /> CALL NEXT BANK TOKEN
              </button>
              <button onClick={resetQueue} className="mx-auto mt-4 flex items-center gap-1 text-xs text-slate-500 hover:text-red-300">
                <RotateCcw size={13} /> Reset Bank Queue
              </button>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-base font-bold text-amber-400 mb-1">Feed Bank Services</h2>
              <p className="text-xs text-slate-400 mb-4">Add services so customers can select them during booking.</p>
              <form onSubmit={handleAddService} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="e.g. Cash Deposit / Account Opening"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs hover:bg-amber-400 flex items-center gap-1">
                  <Plus size={14} /> Add
                </button>
              </form>
              {servicesList.length === 0 ? (
                <p className="text-slate-500 text-xs italic">No services added yet.</p>
              ) : (
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {servicesList.map((srv, idx) => (
                    <li key={idx} className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl flex justify-between items-center text-xs">
                      <span>{srv}</span>
                      <button onClick={() => handleDeleteService(idx)} className="text-red-400 hover:text-red-300">
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
              <Users className="text-amber-400 mb-2" size={20} />
              <p className="text-xs text-slate-500">Bank Last Issued</p>
              <p className="mt-1 text-3xl font-black">{lastIssued ? `#${lastIssued}` : "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}