import Link from "next/link";
import type { Lesson } from "@/lib/mockData";

export default function LessonList({ lessons, classroomId }: { lessons: Lesson[]; classroomId: string }) {
  return (
    <div className="space-y-3">
      {lessons.map((l) => (
        <div key={l.id} className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-semibold text-zinc-900">{l.title}</h4>
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
              l.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"
            }`}>
              {l.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-600">{l.contentSnippet}</p>
          <div className="mt-3">
            <Link
              href={`/classrooms/${classroomId}/lessons/${l.id}`}
              className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50"
            >
              View lesson
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}