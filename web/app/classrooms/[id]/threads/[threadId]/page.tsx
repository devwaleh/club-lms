"use client";
import { useState } from "react";
import Link from "next/link";
import type { DiscussionComment, DiscussionThreadWithComments } from "@/lib/types";
import { useClassroom } from "@/lib/hooks/classrooms";
import { useDiscussionThread, useCreateComment } from "@/lib/hooks/discussions";

export default function ThreadDetailPage({ params }: { params: { id: string; threadId: string } }) {
  const { data: classroom } = useClassroom(params.id);
  const { data: thread, isLoading, refetch } = useDiscussionThread(params.threadId);
  const [comments, setComments] = useState<DiscussionComment[]>(thread?.comments ?? []);
  const [body, setBody] = useState("");
  const { mutate: createComment, isPending } = useCreateComment(params.threadId);

  if (isLoading) {
    return <div className="h-24 animate-pulse rounded-lg bg-zinc-100" />;
  }

  if (!classroom || !thread) {
    return <div className="text-sm text-zinc-600">Thread not found.</div>;
  }

  async function addComment() {
    if (!body.trim()) return;
    await createComment({ body });
    setBody("");
    await refetch();
    setComments((thread as DiscussionThreadWithComments).comments);
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
          <button disabled={isPending} onClick={addComment} className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-50">
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