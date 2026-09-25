"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Ticket, User, Phone } from "lucide-react";
import Link from "next/link";
const STORAGE_KEYS = {
  lastIssuedToken: "smartq_last_issued",
  myToken: "smartq_my_token",
} as const;

function readNumber(key: string): number {
  const value = Number.parseInt(localStorage.getItem(key) || "0", 10);
  return Number.isNaN(value) ? 0 : value;
}

function saveNumber(key: string, value: number): void {
  localStorage.setItem(key, String(value));
}

const INDIA_DATA: { [key: string]: string[] } = {
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
    "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", 
    "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", 
    "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", 
    "Tiruvallur", "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", 
    "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", 
    "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],
  "Karnataka": [
    "Bagalkot", "Bengaluru Rural", "Bengaluru Urban", "Belagavi", "Ballari", 
    "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", 
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", 
    "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", 
    "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
  ],
  "Maharashtra": [
    "Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Thane", "Nashik", 
    "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded"
  ],
  "Delhi": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
    "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
  ]
};

function BookingForm() {
  const searchParams = useSearchParams();
  const sector = searchParams.get("sector") || "hospital";

  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [districts, setDistricts] = useState<string[]>(INDIA_DATA["Tamil Nadu"]);
  const [selectedDistrict, setSelectedDistrict] = useState("Chennai");

  const [optionsList, setOptionsList] = useState<string[]>([]);
  const [selection, setSelection] = useState("");
  const [bookedToken, setBookedToken] = useState<number | null>(null);

  const lastIssuedKey = sector === "bank" ? "smartq_bank_last_issued" : STORAGE_KEYS.lastIssuedToken;
  const myTokenKey = sector === "bank" ? "smartq_bank_my_token" : STORAGE_KEYS.myToken;
  const userDetailsKey = `smartq_${sector}_user_details`;

  useEffect(() => {
    if (sector === "bank") {
      const saved = localStorage.getItem("smartq_bank_services");
      if (saved) {
        const parsed = JSON.parse(saved);
        setOptionsList(parsed);
        if (parsed.length > 0) setSelection(parsed[0]);
      } else {
        setOptionsList([]);
      }
    } else {
      const saved = localStorage.getItem("smartq_hospital_specialists");
      if (saved) {
        const parsed = JSON.parse(saved);
        setOptionsList(parsed);
        if (parsed.length > 0) setSelection(parsed[0]);
      } else {
        setOptionsList([]);
      }
    }
  }, [sector]);

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const st = e.target.value;
    setSelectedState(st);
    const distList = INDIA_DATA[st] || [];
    setDistricts(distList);
    if (distList.length > 0) setSelectedDistrict(distList[0]);
  }

  function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !mobile.trim()) {
      alert("Name and Mobile number kandippa podanum!");
      return;
    }

    const currentLast = readNumber(lastIssuedKey);
    const newToken = currentLast + 1;

    saveNumber(lastIssuedKey, newToken);
    saveNumber(myTokenKey, newToken);

    const userInfo = {
      firstName,
      mobile,
      state: selectedState,
      district: selectedDistrict,
      selection: selection || "General",
      sector,
      bookedAt: new Date().toISOString(),
    };

    localStorage.setItem(userDetailsKey, JSON.stringify(userInfo));
    setBookedToken(newToken);
  }

  return (
    <div className="w-full max-w-lg bg-slate-900 border border-teal-500/20 p-6 sm:p-8 rounded-3xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <Link className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1" href="/select-sector">
          <ArrowLeft size={14} /> Back to Sectors
        </Link>
        <span className="text-xs bg-teal-500/10 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full uppercase font-semibold">
          {sector} Booking
        </span>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-black capitalize">Generate {sector} Token</h1>
        <p className="text-xs text-slate-400 mt-1">Select location and details to get your token.</p>
      </div>

      {bookedToken ? (
        <div className="text-center space-y-6 py-4">
          <div className="p-6 bg-slate-950 border border-teal-500/30 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Your Assigned Token</p>
            <p className="text-6xl font-black text-teal-300 my-3">#{bookedToken}</p>
            <p className="text-xs text-teal-400">Booked for {selectedDistrict}, {selectedState}!</p>
          </div>
          
          <Link className="w-full block py-4 rounded-2xl bg-teal-500 text-slate-950 font-black text-center shadow-lg hover:bg-teal-400 transition" href={`/status?sector=${sector}`}>
            View Live Status 🚀
          </Link>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><User size={14} /></span>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Kiran"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:border-teal-400 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Mobile Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><Phone size={14} /></span>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:border-teal-400 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">State</label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-teal-400 text-xs"
              >
                {Object.keys(INDIA_DATA).map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-teal-400 text-xs"
              >
                {districts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">
              {sector === "bank" ? "Select Bank Service" : "Select Doctor / Specialist"}
            </label>
            <select
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-teal-400 text-xs"
            >
              {optionsList.length === 0 ? (
                <option value="General">General Counter (No custom feed added)</option>
              ) : (
                optionsList.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 rounded-2xl bg-teal-500 text-slate-950 font-black text-sm tracking-wide shadow-lg hover:bg-teal-400 transition flex items-center justify-center gap-2"
          >
            <Ticket size={16} /> GENERATE TOKEN NOW
          </button>
        </form>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8 flex items-center justify-center">
      <Suspense fallback={<div className="text-teal-400 text-sm">Loading booking page...</div>}>
        <BookingForm />
      </Suspense>
    </main>
  );
}