"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Activity, Landmark, Calendar, Clock, ArrowRight, LogOut, User, Stethoscope, Building2 } from "lucide-react";

// India States & Sample Districts Data
const statesAndDistricts: { [key: string]: string[] } = {
  "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli", "Salem", "Ramanathapuram", "Tirunelveli"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool"]
};

// Hospital Specialities & Doctors Mapping
const hospitalData: { [key: string]: string[] } = {
  "Cardiology": ["Dr. Ramesh Kumar (MD, DM)", "Dr. Priya Sharma (Senior Consultant)"],
  "Orthopedics": ["Dr. Arun V (MS Ortho)", "Dr. Karthik R (Joint Replacement Specialist)"],
  "Pediatrics": ["Dr. Sneha Gupta (Child Specialist)", "Dr. Vijay Anand (Neonatologist)"],
  "General Medicine": ["Dr. Suresh Babu (MBBS, General Physician)", "Dr. Anitha Mohan (Consultant)"],
  "Neurology": ["Dr. Rajesh Verma (DM Neuro)", "Dr. Meena Iyer (Neurologist)"]
};

// Bank Services & Counters Mapping
const bankData: { [key: string]: string[] } = {
  "Cash Deposit / Withdrawal": ["Counter 01 - Fast Cash", "Counter 02 - Teller Express"],
  "Account Opening & KYC": ["Counter 03 - Customer Desk", "Counter 04 - Relationship Manager"],
  "Loan Enquiries & Processing": ["Counter 05 - Retail Loans", "Counter 06 - Home Loan Desk"],
  "Forex & Demand Draft": ["Counter 07 - Forex Desk"],
  "Passbook Printing & General": ["Counter 08 - Self Service / Kiosk"]
};

export default function UserDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  
  // Selection States
  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [selectedDistrict, setSelectedDistrict] = useState("Madurai");
  const [sector, setSector] = useState("hospital");
  
  // Dynamic Sub-categories
  const [hospitalCategory, setHospitalCategory] = useState("Cardiology");
  const [selectedDoctor, setSelectedDoctor] = useState(hospitalData["Cardiology"][0]);

  const [bankCategory, setBankCategory] = useState("Cash Deposit / Withdrawal");
  const [selectedCounter, setSelectedCounter] = useState(bankData["Cash Deposit / Withdrawal"][0]);

  const [timeSlot, setTimeSlot] = useState("10:00 AM - 10:30 AM");
  const [booked, setBooked] = useState(false);
  const [tokenNo, setTokenNo] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = window.localStorage.getItem("smartq_user");
    if (user) setUserName(user);
  }, []);

  // Update districts when state changes
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (statesAndDistricts[state] && statesAndDistricts[state].length > 0) {
      setSelectedDistrict(statesAndDistricts[state][0]);
    }
  };

  // Update doctors when hospital category changes
  const handleHospitalCategoryChange = (cat: string) => {
    setHospitalCategory(cat);
    if (hospitalData[cat] && hospitalData[cat].length > 0) {
      setSelectedDoctor(hospitalData[cat][0]);
    }
  };

  // Update counters when bank category changes
  const handleBankCategoryChange = (cat: string) => {
    setBankCategory(cat);
    if (bankData[cat] && bankData[cat].length > 0) {
      setSelectedCounter(bankData[cat][0]);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("smartq_user");
    }
    router.push("/");
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomToken = Math.floor(Math.random() * 100) + 1;
    setTokenNo(randomToken);
    setBooked(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full uppercase">
              SmartQ User Portal
            </span>
            <h1 className="text-xl font-black mt-2">Welcome, {userName}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-2 rounded-xl hover:bg-rose-500/20 transition flex items-center gap-1"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {!booked ? (
          <form onSubmit={handleBooking} className="space-y-5">
            <h2 className="text-lg font-bold">Book Your Sector Token</h2>

            {/* 1. SECTOR CHOICE */}
            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">1. Choose Organization Sector</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSector("hospital")}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    sector === "hospital"
                      ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg shadow-sky-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  <Activity size={16} /> Hospital Token Flow
                </button>
                <button
                  type="button"
                  onClick={() => setSector("bank")}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    sector === "bank"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  <Landmark size={16} /> Bank Token Flow
                </button>
              </div>
            </div>

            {/* 2. STATE & DISTRICT (36 States Dynamic support) */}
            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">2. Select State & District Location</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-sky-500 outline-none"
                >
                  {Object.keys(statesAndDistricts).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-sky-500 outline-none"
                >
                  {statesAndDistricts[selectedState]?.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. CONDITIONAL SECTOR DETAILS: HOSPITAL (Speciality & Doctor) OR BANK (Services & Counters) */}
            {sector === "hospital" ? (
              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/20 space-y-4">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
                  <Stethoscope size={16} /> Hospital Speciality & Doctor Allocation
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Medical Speciality</label>
                    <select
                      value={hospitalCategory}
                      onChange={(e) => handleHospitalCategoryChange(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-sky-500 outline-none"
                    >
                      {Object.keys(hospitalData).map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Available Doctor</label>
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-sky-500 outline-none"
                    >
                      {hospitalData[hospitalCategory]?.map((doc) => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Building2 size={16} /> Banking Service & Counter Allocation
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Banking Service</label>
                    <select
                      value={bankCategory}
                      onChange={(e) => handleBankCategoryChange(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                    >
                      {Object.keys(bankData).map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Counter Selection</label>
                    <select
                      value={selectedCounter}
                      onChange={(e) => setSelectedCounter(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                    >
                      {bankData[bankCategory]?.map((cnt) => (
                        <option key={cnt} value={cnt}>{cnt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 4. TIME SLOT */}
            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">3. Choose Appointment Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-sky-500 outline-none"
              >
                <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
                <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 text-sm mt-4"
            >
              Generate Queue Token <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full uppercase font-bold">
              Token Successfully Generated
            </span>
            <p className="text-xs text-slate-400">Your Assigned Token Number</p>
            <p className="text-7xl font-black text-sky-400 my-2">#{tokenNo}</p>
            
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
              <p className="text-slate-300 flex justify-between">
                <span className="text-slate-500">Sector:</span> 
                <span className="font-bold uppercase text-white">{sector}</span>
              </p>
              <p className="text-slate-300 flex justify-between">
                <span className="text-slate-500">Location:</span> 
                <span className="font-bold text-white">{selectedDistrict}, {selectedState}</span>
              </p>
              {sector === "hospital" ? (
                <>
                  <p className="text-slate-300 flex justify-between">
                    <span className="text-slate-500">Speciality:</span> 
                    <span className="font-bold text-sky-400">{hospitalCategory}</span>
                  </p>
                  <p className="text-slate-300 flex justify-between">
                    <span className="text-slate-500">Doctor:</span> 
                    <span className="font-bold text-white">{selectedDoctor}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-slate-300 flex justify-between">
                    <span className="text-slate-500">Banking Service:</span> 
                    <span className="font-bold text-emerald-400">{bankCategory}</span>
                  </p>
                  <p className="text-slate-300 flex justify-between">
                    <span className="text-slate-500">Counter:</span> 
                    <span className="font-bold text-white">{selectedCounter}</span>
                  </p>
                </>
              )}
              <p className="text-slate-300 flex justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-500">Time Slot:</span> 
                <span className="font-bold text-teal-400">{timeSlot}</span>
              </p>
            </div>

            <button
              onClick={() => setBooked(false)}
              className="mt-6 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
            >
              Book Another Token
            </button>
          </div>
        )}

      </div>
    </main>
  );
}