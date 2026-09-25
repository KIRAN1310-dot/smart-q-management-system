export type Domain = "Hospital" | "Bank";

export type Facility = {
  name: string;
  districts: string[];
};

export const states = ["Tamil Nadu", "Kerala", "Karnataka"];

export const districts: Record<string, string[]> = {
  "Tamil Nadu": ["Chennai", "Madurai", "Sivaganga", "Dindigul", "Coimbatore"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"]
};

export const facilities: Record<Domain, Facility[]> = {
  Hospital: [
    { name: "Government HQ Hospital", districts: ["Chennai", "Madurai", "Sivaganga", "Dindigul"] },
    { name: "Specialty Care Hospital", districts: ["Chennai", "Coimbatore", "Madurai"] },
    { name: "Apollo Hospital", districts: ["Chennai", "Madurai", "Bengaluru"] }
  ],
  Bank: [
    { name: "State Bank of India", districts: ["Chennai", "Madurai", "Sivaganga", "Dindigul", "Bengaluru"] },
    { name: "Indian Overseas Bank", districts: ["Chennai", "Madurai", "Sivaganga"] },
    { name: "HDFC Bank", districts: ["Chennai", "Coimbatore", "Kochi", "Bengaluru"] },
    { name: "Canara Bank", districts: ["Madurai", "Dindigul", "Bengaluru", "Mysuru"] }
  ]
};

export const hospitalServices = [
  "General Medicine",
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology"
];

export const bankServices = [
  "Account Opening",
  "Cash Deposit / Withdrawal",
  "Loans",
  "Passbook Printing",
  "FD / DD"
];

export function generateSlots() {
  const slots: string[] = [];
  for (let hour = 9; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === 16 && minute > 0) break;
      const suffix = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      slots.push(`${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`);
    }
  }
  return slots;
}
