import Link from "next/link";
import type { Classroom } from "@/lib/types";

export default function ClassroomCard({ classroom }: { classroom: Classroom }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">{classroom.title}</h3>
        <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-zinc-700">
          {classroom.visibility}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{classroom.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-zinc-700">
        <span>{classroom.memberCount} members</span>
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs">{classroom.role}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          href={`/classrooms/${classroom.id}`}
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800"
        >
          Go to classroom
        </Link>
      </div>
    </div>
  );
}