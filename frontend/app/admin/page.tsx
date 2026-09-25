"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BellRing, RotateCcw, Users, Plus, Trash2, Building2, Stethoscope } from "lucide-react";
import { readNumber, STORAGE_KEYS } from "../../lib/queue";
import { getSession, logout } from "../../lib/auth";

export default function AdminDashboard() {
  // Default active tab is hospital, user can switch to bank anytime inside the admin panel!
  const [activeSector, setActiveSector] = useState<"hospital" | "bank">("hospital");

  const [sessionName, setSessionName] = useState("");

  // Hospital States
  const [hospCurrentCall, setHospCurrentCall] = useState(0);
  const [hospLastIssued, setHospLastIssued] = useState(0);
  const [hospInput, setHospInput] = useState("");
  const [hospSpecialists, setHospSpecialists] = useState<string[]>([]);

  // Bank States
  const [bankCurrentCall, setBankCurrentCall] = useState(0);
  const [bankLastIssued, setBankLastIssued] = useState(0);
  const [bankInput, setBankInput] = useState("");
  const [bankServices, setBankServices] = useState<string[]>([]);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") {
      window.location.replace("/login/admin");
      return;
    }
    setSessionName(session.name);

    loadData();
    window.addEventListener("storage", loadData);
    const interval = window.setInterval(loadData, 500);

    return () => {
      window.removeEventListener("storage", loadData);
      window.clearInterval(interval);
    };
  }, []);

  function loadData() {
    // Hospital Data
    setHospCurrentCall(readNumber(STORAGE_KEYS.currentCall));
    setHospLastIssued(readNumber(STORAGE_KEYS.lastIssuedToken));
    const savedHosp = localStorage.getItem("smartq_hospital_specialists");
    if (savedHosp) setHospSpecialists(JSON.parse(savedHosp));

    // Bank Data
    setBankCurrentCall(readNumber("smartq_bank_current_call"));
    setBankLastIssued(readNumber("smartq_bank_last_issued"));
    const savedBank = localStorage.getItem("smartq_bank_services");
    if (savedBank) setBankServices(JSON.parse(savedBank));
  }

  // Hospital Actions
  function handleAddHospitalItem(e: React.FormEvent) {
    e.preventDefault();
    if (!hospInput.trim()) return;
    const updated = [...hospSpecialists, hospInput.trim()];
    setHospSpecialists(updated);
    localStorage.setItem("smartq_hospital_specialists", JSON.stringify(updated));
    setHospInput("");
  }

  function handleDeleteHospitalItem(index: number) {
    const updated = hospSpecialists.filter((_, i) => i !== index);
    setHospSpecialists(updated);
    localStorage.setItem("smartq_hospital_specialists", JSON.stringify(updated));
  }

  function callNextHospital() {
    const next = hospCurrentCall + 1;
    const issued = Math.max(hospLastIssued, next);
    localStorage.setItem(STORAGE_KEYS.lastIssuedToken, String(issued));
    localStorage.setItem(STORAGE_KEYS.currentCall, String(next));
    setHospCurrentCall(next);
    setHospLastIssued(issued);
  }

  function resetHospital() {
    localStorage.setItem(STORAGE_KEYS.currentCall, "0");
    localStorage.setItem(STORAGE_KEYS.lastIssuedToken, "0");
    setHospCurrentCall(0);
    setHospLastIssued(0);
  }

  // Bank Actions
  function handleAddBankItem(e: React.FormEvent) {
    e.preventDefault();
    if (!bankInput.trim()) return;
    const updated = [...bankServices, bankInput.trim()];
    setBankServices(updated);
    localStorage.setItem("smartq_bank_services", JSON.stringify(updated));
    setBankInput("");
  }

  function handleDeleteBankItem(index: number) {
    const updated = bankServices.filter((_, i) => i !== index);
    setBankServices(updated);
    localStorage.setItem("smartq_bank_services", JSON.stringify(updated));
  }

  function callNextBank() {
    const next = bankCurrentCall + 1;
    const issued = Math.max(bankLastIssued, next);
    localStorage.setItem("smartq_bank_last_issued", String(issued));
    localStorage.setItem("smartq_bank_current_call", String(next));
    setBankCurrentCall(next);
    setBankLastIssued(issued);
  }

  function resetBank() {
    localStorage.setItem("smartq_bank_current_call", "0");
    localStorage.setItem("smartq_bank_last_issued", "0");
    setBankCurrentCall(0);
    setBankLastIssued(0);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-teal-500/20 bg-slate-900 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-400">
              SmartQ Master Admin Panel
            </p>
            <h1 className="mt-1 text-3xl font-black sm:text-4xl">Live Counter & Data Feeding</h1>
            <p className="mt-2 text-slate-400">Manage queue tokens and feed data for both Hospital and Bank seamlessly.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl bg-teal-500/10 px-3 py-2 text-sm text-teal-300">Admin: {sessionName}</span>
            <button onClick={() => { logout(); window.location.replace("/auth"); }} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-red-500/40 hover:text-red-300">Logout</button>
          </div>
        </header>

        {/* Sector Tabs Switcher */}
        <div className="grid grid-cols-2 gap-3 mb-8 bg-slate-900 p-2 rounded-3xl border border-slate-800">
          <button
            onClick={() => setActiveSector("hospital")}
            className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition text-base ${
              activeSector === "hospital"
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-950/40"
                : "text-slate-400 hover:text-white bg-slate-950"
            }`}
          >
            <Stethoscope size={18} /> Hospital Queue & Feed
          </button>
          <button
            onClick={() => setActiveSector("bank")}
            className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition text-base ${
              activeSector === "bank"
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-950/40"
                : "text-slate-400 hover:text-white bg-slate-950"
            }`}
          >
            <Building2 size={18} /> Bank Queue & Feed
          </button>
        </div>

        {/* HOSPITAL SECTION */}
        {activeSector === "hospital" && (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
            <div className="space-y-6">
              {/* Counter Control */}
              <div className="rounded-3xl border border-teal-500/20 bg-slate-900 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Hospital Calling</p>
                <div className="my-6 text-8xl font-black tracking-tight text-teal-300 sm:text-9xl">
                  {hospCurrentCall ? `#${hospCurrentCall}` : "—"}
                </div>
                <button
                  onClick={callNextHospital}
                  className="mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-teal-500 px-6 py-5 text-xl font-black text-slate-950 shadow-lg shadow-teal-950/30 transition hover:bg-teal-400"
                >
                  <BellRing /> CALL NEXT HOSPITAL TOKEN <ArrowRight />
                </button>
                <button onClick={resetHospital} className="mx-auto mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-red-300">
                  <RotateCcw size={15} /> Reset hospital queue
                </button>
              </div>

              {/* Data Feeding */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-lg font-bold text-teal-400 mb-1">Feed Hospital Specialists / Doctors</h2>
                <p className="text-xs text-slate-400 mb-4">Add doctors for user selection.</p>
                <form onSubmit={handleAddHospitalItem} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={hospInput}
                    onChange={(e) => setHospInput(e.target.value)}
                    placeholder="e.g. Dr. Ramesh (Neurologist)"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400"
                  />
                  <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition flex items-center gap-1">
                    <Plus size={16} /> Add
                  </button>
                </form>
                {hospSpecialists.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">No doctors added yet.</p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {hospSpecialists.map((doc, idx) => (
                      <li key={idx} className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl flex justify-between items-center text-sm">
                        <span className="text-slate-200 font-medium">{doc}</span>
                        <button onClick={() => handleDeleteHospitalItem(idx)} className="text-red-400 hover:text-red-300 bg-red-500/10 p-1.5 rounded-lg transition">
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-4">
              <Card icon={<Users />} title="Hospital Last Issued" value={hospLastIssued ? `#${hospLastIssued}` : "—"} />
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="font-bold text-teal-300">Hospital Sector Mode</p>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Tokens called here sync instantly to the hospital user status and booking pages.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BANK SECTION */}
        {activeSector === "bank" && (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
            <div className="space-y-6">
              {/* Counter Control */}
              <div className="rounded-3xl border border-teal-500/20 bg-slate-900 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Bank Calling</p>
                <div className="my-6 text-8xl font-black tracking-tight text-teal-300 sm:text-9xl">
                  {bankCurrentCall ? `#${bankCurrentCall}` : "—"}
                </div>
                <button
                  onClick={callNextBank}
                  className="mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-teal-500 px-6 py-5 text-xl font-black text-slate-950 shadow-lg shadow-teal-950/30 transition hover:bg-teal-400"
                >
                  <BellRing /> CALL NEXT BANK TOKEN <ArrowRight />
                </button>
                <button onClick={resetBank} className="mx-auto mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-red-300">
                  <RotateCcw size={15} /> Reset bank queue
                </button>
              </div>

              {/* Data Feeding */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-lg font-bold text-teal-400 mb-1">Feed Bank Services</h2>
                <p className="text-xs text-slate-400 mb-4">Add services for customer selection.</p>
                <form onSubmit={handleAddBankItem} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={bankInput}
                    onChange={(e) => setBankInput(e.target.value)}
                    placeholder="e.g. Cash Deposit / Account Opening"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400"
                  />
                  <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition flex items-center gap-1">
                    <Plus size={16} /> Add
                  </button>
                </form>
                {bankServices.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">No bank services added yet.</p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {bankServices.map((srv, idx) => (
                      <li key={idx} className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl flex justify-between items-center text-sm">
                        <span className="text-slate-200 font-medium">{srv}</span>
                        <button onClick={() => handleDeleteBankItem(idx)} className="text-red-400 hover:text-red-300 bg-red-500/10 p-1.5 rounded-lg transition">
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-4">
              <Card icon={<Users />} title="Bank Last Issued" value={bankLastIssued ? `#${bankLastIssued}` : "—"} />
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="font-bold text-teal-300">Bank Sector Mode</p>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Tokens and services managed here sync directly with the bank user portal.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

function Card({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-3 text-teal-400">{icon}</div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}