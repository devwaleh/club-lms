"use client";
import { useState } from "react";
import Link from "next/link";
import { getClassroom, getThreadById, getCommentsForThread, type Thread, type Comment } from "@/lib/mockData";

export default function ThreadDetailPage({ params }: { params: { id: string; threadId: string } }) {
  const classroom = getClassroom(params.id);
  const thread: Thread | undefined = getThreadById(params.threadId);
  const [comments, setComments] = useState<Comment[]>(getCommentsForThread(params.threadId));
  const [body, setBody] = useState("");

  if (!classroom || !thread) {
    return <div className="text-sm text-zinc-600">Thread not found.</div>;
  }

  function addComment() {
    if (!body.trim()) return;
    const newC: Comment = {
      id: `cm-${Date.now()}`,
      threadId: thread.id,
      authorName: "You",
      body,
      createdAt: new Date().toISOString(),
    };
    console.log("Add comment (mock)", newC);
    setComments([...comments, newC]);
    setBody("");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">{thread.title}</h2>
        <div className="mt-1 text-sm text-zinc-700">By {thread.authorName}</div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">Comments</h3>
        <div className="mt-3 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="rounded-md border border-zinc-200 p-3">
              <div className="text-sm font-medium text-zinc-900">{c.authorName}</div>
              <div className="text-sm text-zinc-700">{c.body}</div>
              <div className="text-xs text-zinc-500">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment..."
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            rows={4}
          />
          <button onClick={addComment} className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800">
            Add comment
          </button>
        </div>
      </div>

      <div className="pt-2 text-sm text-zinc-700">
        <Link href={`/classrooms/${classroom.id}`} className="hover:underline">
          ← Back to classroom
        </Link>
      </div>
    </div>
  );
}