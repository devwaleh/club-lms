"use client";
import { useState } from "react";
import { useJoinWithInviteCode } from "@/lib/hooks/classrooms";
import Link from "next/link";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { mutate, isPending, error } = useJoinWithInviteCode();

  async function submit() {
    setMessage(null);
    try {
      await mutate(code);
      setMessage("Joined successfully.");
      setCode("");
    } catch {
      setMessage(null);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900">Join with Invite Code</h1>
      <p className="mt-2 text-sm text-zinc-700">Enter the invite code provided by your teacher/admin.</p>
      <div className="mt-4 space-y-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Invite code"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <button
          onClick={submit}
          disabled={isPending}
          className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          Join
        </button>
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            Failed to join. Please check the code and try again.
          </div>
        )}
        {message && (
          <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">{message}</div>
        )}
      </div>

      <div className="mt-6 text-sm">
        <Link href="/classrooms" className="text-zinc-700 hover:underline">
          ← Back to Classrooms
        </Link>
      </div>
    </div>
  );
}