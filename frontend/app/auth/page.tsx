import Link from "next/link";

export default function AuthChoice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-teal-400">SmartQ</p>
          <h1 className="mt-2 text-4xl font-black">Choose Login</h1>
          <p className="mt-2 text-slate-400">Users and administrators have separate accounts.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Card title="User" description="Book a queue token and track your live status." login="/login/user" register="/register/user" />
          <Card title="Admin" description="Manage counters and call the next queue token." login="/login/admin" register="/register/admin" />
        </div>
      </div>
    </main>
  );
}

function Card({ title, description, login, register }: { title: string; description: string; login: string; register: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-6 grid gap-3">
        <Link href={login} className="rounded-2xl bg-teal-500 px-4 py-3 text-center font-bold text-slate-950 hover:bg-teal-400">LOGIN</Link>
        <Link href={register} className="rounded-2xl border border-slate-700 px-4 py-3 text-center font-semibold hover:border-teal-500/50">CREATE ACCOUNT</Link>
      </div>
    </div>
  );
}
