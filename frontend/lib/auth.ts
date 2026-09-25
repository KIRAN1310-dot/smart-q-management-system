export type UserRole = "user" | "admin";

export type Account = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

const ACCOUNTS_KEY = "smartq_accounts";
const SESSION_KEY = "smartq_session";

export function getAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function registerAccount(account: Account) {
  const accounts = getAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === account.email.toLowerCase() && a.role === account.role)) {
    throw new Error("An account with this email already exists.");
  }
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
}

export function loginAccount(email: string, password: string, role: UserRole) {
  const account = getAccounts().find(
    (a) => a.email.toLowerCase() === email.toLowerCase() &&
           a.password === password &&
           a.role === role
  );
  if (!account) throw new Error("Invalid email, password, or account type.");
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    name: account.name,
    email: account.email,
    role: account.role
  }));
  return account;
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as
      | { name: string; email: string; role: UserRole }
      | null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
