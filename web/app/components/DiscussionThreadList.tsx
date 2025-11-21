"use client";
import { useState } from "react";
import Link from "next/link";
import type { DiscussionThread } from "@/lib/types";

export default function DiscussionThreadList({ classroomId, initialThreads, onCreateThread }:{ classroomId: string; initialThreads: DiscussionThread[]; onCreateThread: (payload: { title: string; body: string }) => Promise<DiscussionThread>; }) {
  const [threads, setThreads] = useState<DiscussionThread[]>(initialThreads);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function addThread() {
    if (!title.trim() || !body.trim()) return;
    const created = await onCreateThread({ title, body });
    setThreads([created, ...threads]);
    setTitle("");
    setBody("");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <h4 className="text-md font-semibold text-zinc-900">Start a new thread</h4>
        <div className="mt-3 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Thread body"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            rows={4}
          />
          <button onClick={addThread} className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800">
            Create thread
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {threads.map((t) => (
          <div key={t.id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-semibold text-zinc-900">{t.title}</h4>
              <span className="text-xs text-zinc-500">{new Date(t.createdAt).toLocaleString()}</span>
            </div>
            {t.authorName && <div className="mt-1 text-sm text-zinc-700">By {t.authorName}</div>}
            <div className="mt-3">
              <Link
                href={`/classrooms/${classroomId}/threads/${t.id}`}
                className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50"
              >
                Open thread
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}