export const STORAGE_KEYS = {
  currentCall: "smartq_current_call",
  myToken: "smartq_my_token",
  lastIssuedToken: "smartq_last_issued_token"
} as const;

export function readNumber(key: string, fallback = 0): number {
  if (typeof window === "undefined") return fallback;
  const value = Number(window.localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
}

export function getPeopleAhead(myToken: number, currentCall: number) {
  return Math.max(myToken - currentCall, 0);
}

export function getWaitingMinutes(myToken: number, currentCall: number) {
  return getPeopleAhead(myToken, currentCall) * 5;
}
