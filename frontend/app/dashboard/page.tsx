 "use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, CheckCircle2, Clock3, Hospital, MapPin, RefreshCw, Ticket, Users } from "lucide-react";
import {
  bankServices,
  districts,
  facilities,
  generateSlots,
  hospitalServices,
  states,
  type Domain
} from "../../data/services";
import { getPeopleAhead, getWaitingMinutes, readNumber, STORAGE_KEYS } from "../../lib/queue";
import { getSession, logout } from "../../lib/auth";

export default function DashboardPage() {
  const [domain, setDomain] = useState<Domain>("Hospital");
  const [state, setState] = useState(states[0]);
  const [district, setDistrict] = useState("Chennai");
  const [facility, setFacility] = useState("");
  const [service, setService] = useState("");
  const [slot, setSlot] = useState("");
  const [myToken, setMyToken] = useState(0);
  const [currentCall, setCurrentCall] = useState(0);
  const [lastIssued, setLastIssued] = useState(0);
  const [booked, setBooked] = useState(false);
  const [sessionName, setSessionName] = useState("");

  const availableFacilities = useMemo(
    () => facilities[domain].filter((item) => item.districts.includes(district)),
    [domain, district]
  );

  const serviceOptions = domain === "Hospital" ? hospitalServices : bankServices;

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "user") {
      window.location.replace("/login/user");
      return;
    }
    setSessionName(session.name);

    const load = () => {
      setMyToken(readNumber(STORAGE_KEYS.myToken));
      setCurrentCall(readNumber(STORAGE_KEYS.currentCall));
      setLastIssued(readNumber(STORAGE_KEYS.lastIssuedToken));
    };

    load();
    window.addEventListener("storage", load);
    const interval = window.setInterval(load, 500);
    return () => {
      window.removeEventListener("storage", load);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setDistrict(districts[state][0]);
  }, [state]);

  useEffect(() => {
    setFacility(availableFacilities[0]?.name ?? "");
  }, [availableFacilities]);

  useEffect(() => {
    setService(serviceOptions[0] ?? "");
  }, [domain]);

  const peopleAhead = getPeopleAhead(myToken, currentCall);
  const waitMinutes = getWaitingMinutes(myToken, currentCall);
  const isTurn = myToken > 0 && currentCall >= myToken;

  function bookToken() {
    const next = Math.max(lastIssued + 1, 1);
    localStorage.setItem(STORAGE_KEYS.lastIssuedToken, String(next));
    localStorage.setItem(STORAGE_KEYS.myToken, String(next));
    setLastIssued(next);
    setMyToken(next);
    setBooked(true);
  }

  function clearBooking() {
    localStorage.removeItem(STORAGE_KEYS.myToken);
    setMyToken(0);
    setBooked(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-teal-500/20 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.25em] text-teal-400">SmartQ</p>
            <h1 className="text-3xl font-bold sm:text-4xl">Queue Booking Dashboard</h1>
            <p className="mt-2 text-slate-400">Book a slot and watch your queue move live.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl bg-teal-500/10 px-3 py-2 text-sm text-teal-300">Hi, {sessionName}</span>
            <button onClick={() => { logout(); window.location.replace("/auth"); }} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-red-500/40 hover:text-red-300">Logout</button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-xl font-bold">1. Choose your service</h2>

            <div className="mb-5 grid grid-cols-2 gap-3">
              {(["Hospital", "Bank"] as Domain[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setDomain(item)}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 font-semibold transition ${
                    domain === item
                      ? "border-teal-400 bg-teal-500/10 text-teal-300"
                      : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {item === "Hospital" ? <Hospital size={20} /> : <Building2 size={20} />}
                  {item}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="State">
                <select value={state} onChange={(e) => setState(e.target.value)} className="input">
                  {states.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>

              <Field label="District">
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="input">
                  {districts[state].map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>

              <Field label="Facility">
                <select value={facility} onChange={(e) => setFacility(e.target.value)} className="input">
                  {availableFacilities.length === 0 && <option>No facility available</option>}
                  {availableFacilities.map((item) => <option key={item.name}>{item.name}</option>)}
                </select>
              </Field>

              <Field label="Service">
                <select value={service} onChange={(e) => setService(e.target.value)} className="input">
                  {serviceOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Time Slot">
                <select value={slot} onChange={(e) => setSlot(e.target.value)} className="input">
                  <option value="">Select a slot</option>
                  {generateSlots().map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
            </div>

            <button
              onClick={bookToken}
              disabled={!facility || !service || !slot}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 py-4 font-bold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Ticket size={20} />
              {booked ? "BOOK ANOTHER TOKEN" : "BOOK QUEUE TOKEN"}
            </button>

            {booked && (
              <button onClick={clearBooking} className="mt-3 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-400 hover:text-white">
                Clear my token
              </button>
            )}
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-teal-500/20 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Live Queue Status</h2>
                <RefreshCw size={18} className="text-teal-400" />
              </div>

              {isTurn && (
                <div className="mt-5 animate-pulse rounded-2xl border border-teal-400 bg-teal-500/10 p-5 text-center">
                  <p className="text-2xl font-black text-teal-300">IT&apos;S YOUR TURN!</p>
                  <p className="mt-1 text-sm text-teal-100">Please proceed to the service counter.</p>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat icon={<Ticket />} label="My Token" value={myToken ? `#${myToken}` : "—"} />
                <Stat icon={<Users />} label="Now Calling" value={currentCall ? `#${currentCall}` : "—"} />
                <Stat icon={<Users />} label="People Ahead" value={String(peopleAhead)} />
                <Stat icon={<Clock3 />} label="Est. Wait" value={`${waitMinutes} min`} />
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm text-slate-400">
                <div className="flex items-center gap-2"><MapPin size={16} className="text-teal-400" /> {facility || "Select a facility"}</div>
                <div className="mt-2">{district}, {state} · {service || "Select a service"} · {slot || "No slot selected"}</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 text-teal-400" />
                <div>
                  <h3 className="font-bold">Live synchronization</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Admin updates are synchronized through localStorage events with a 500ms fallback check. Keep this page open in one tab and the admin panel in another.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgb(51 65 85);
          background: rgb(2 6 23);
          padding: 0.85rem 1rem;
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: rgb(20 184 166);
          box-shadow: 0 0 0 2px rgb(20 184 166 / 0.12);
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div className="mb-2 text-teal-400">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
