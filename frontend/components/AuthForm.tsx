"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAccount, registerAccount, type UserRole } from "../lib/auth";

export default function AuthForm({
  role,
  mode
}: {
  role: UserRole;
  mode: "login" | "register";
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const title = role === "admin" ? "Admin" : "User";
  const redirectTo = role === "admin" ? "/admin" : "/dashboard";

  function submit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        if (!name.trim() || !email.trim() || password.length < 6) {
          throw new Error("Enter your name, valid email, and a password of at least 6 characters.");
        }
        registerAccount({ name: name.trim(), email: email.trim(), password, role });
      }

      loginAccount(email.trim(), password, role);
      router.replace(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-teal-500/20 bg-slate-900 p-7 shadow-2xl">
        <div className="mb-7 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-teal-400">SmartQ</p>
          <h1 className="mt-2 text-3xl font-black">{title} {mode === "login" ? "Login" : "Registration"}</h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login"
              ? `Login with your registered ${role} account.`
              : `Create your ${role} account first, then login.`}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <Field label="Full Name">
              <input className="auth-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </Field>
          )}

          <Field label="Email">
            <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </Field>

          <Field label="Password">
            <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" />
          </Field>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button className="w-full rounded-2xl bg-teal-500 px-5 py-3.5 font-black text-slate-950 hover:bg-teal-400">
            {mode === "login" ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {mode === "login" ? (
            <>
              No account?{" "}
              <a className="font-semibold text-teal-300 hover:text-teal-200" href={`/register/${role}`}>
                Register here
              </a>
            </>
          ) : (
            <>
              Already registered?{" "}
              <a className="font-semibold text-teal-300 hover:text-teal-200" href={`/login/${role}`}>
                Login here
              </a>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <a href="/auth" className="text-xs text-slate-500 hover:text-slate-300">← Choose another account type</a>
        </div>
      </div>

      <style jsx>{`
        .auth-input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgb(51 65 85);
          background: rgb(2 6 23);
          padding: 0.85rem 1rem;
          color: white;
          outline: none;
        }
        .auth-input:focus {
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
