"use client";

import Link from "next/link";
import { Building2, Stethoscope, ArrowRight, ShieldCheck } from "lucide-react";

export default function SelectSectorPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-teal-500/10 text-teal-400 border border-teal-500/30 px-4 py-2 rounded-full">
            SmartQ Queue System
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Choose Your Sector</h1>
          <p className="mt-2 text-sm text-slate-400">Select whether you want to access the Hospital or Bank queue portal.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          
          {/* Hospital Card */}
          <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-6 rounded-3xl transition group flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Stethoscope size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Hospital Queue</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Manage doctor consultations, patient token registration, and live counter calling.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/book?sector=hospital"
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                User Booking <ArrowRight size={14} />
              </Link>
              <Link
                href="/admin/hospital"
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
              >
                <ShieldCheck size={12} /> Admin
              </Link>
            </div>
          </div>

          {/* Bank Card */}
          <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-6 rounded-3xl transition group flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Building2 size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Bank Queue</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Manage customer deposit services, cash counters, and queue tokens seamlessly.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/book?sector=bank"
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                User Booking <ArrowRight size={14} />
              </Link>
              <Link
                href="/admin/bank"
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
              >
                <ShieldCheck size={12} /> Admin
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}