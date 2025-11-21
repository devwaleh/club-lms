"use client";
import { useState } from "react";
import Link from "next/link";
import type { Assignment } from "@/lib/types";
import { useAssignment } from "@/lib/hooks/assignments";
import { useClassroom } from "@/lib/hooks/classrooms";
import { useCreateSubmission } from "@/lib/hooks/assignments";
import ProtectedPage from "@/app/components/ProtectedPage";

export default function AssignmentDetailPage({ params }: { params: { id: string; assignmentId: string } }) {
  const { data: classroom } = useClassroom(params.id);
  const { data: assignment, isLoading } = useAssignment(params.assignmentId);
  const { mutate: createSubmission, isPending } = useCreateSubmission(params.assignmentId);
  const [textAnswer, setTextAnswer] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) {
    return <div className="h-24 animate-pulse rounded-lg bg-zinc-100" />;
  }

  if (!classroom || !assignment) {
    return <div className="text-sm text-zinc-600">Assignment not found.</div>;
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : null);
  }

  async function submit() {
    const fileInput = (document.querySelector("input[type='file']") as HTMLInputElement) || null;
    const file = fileInput?.files?.[0] || null;
    await createSubmission({ text_answer: textAnswer, file });
    setSubmitted(true);
  }

  return (
    <ProtectedPage>
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">{assignment.title}</h2>
        <div className="mt-1 text-sm text-zinc-700">Due {new Date(assignment.dueDate).toLocaleString()}</div>
        <div className="mt-2 text-sm text-zinc-700">Status: {assignment.status}</div>
        <p className="mt-4 whitespace-pre-wrap text-sm text-zinc-800">{assignment.instructions}</p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">Your submission</h3>
        <div className="mt-3 space-y-3">
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Write your answer..."
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            rows={6}
          />
          <div className="flex items-center gap-2">
            <input type="file" onChange={onFileChange} />
            {fileName && <span className="text-xs text-zinc-600">Selected: {fileName}</span>}
          </div>
          <button disabled={isPending} onClick={submit} className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-50">
            Submit assignment
          </button>
          {submitted && (
            <div className="text-sm text-green-700">Submission recorded (mock). Check console for payload.</div>
          )}
        </div>
      </div>

      {assignment.graded && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h4 className="text-md font-semibold text-green-800">Grade</h4>
          <div className="mt-2 text-sm text-green-800">Score: {assignment.score}</div>
          {assignment.feedback && <div className="mt-1 text-sm text-green-800">Feedback: {assignment.feedback}</div>}
        </div>
      )}

      <div className="pt-2 text-sm text-zinc-700">
        <Link href={`/classrooms/${classroom.id}`} className="hover:underline">
          ← Back to classroom
        </Link>
      </div>
    </div>
    </ProtectedPage>
  );
}