import Link from "next/link";
import type { Assignment } from "@/lib/types";

export default function AssignmentList({ assignments, classroomId }: { assignments: Assignment[]; classroomId: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 text-left text-zinc-700">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Due date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="px-4 py-3 font-medium text-zinc-900">{a.title}</td>
              <td className="px-4 py-3 text-zinc-700">{new Date(a.dueDate).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-800">
                  {a.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/classrooms/${classroomId}/assignments/${a.id}`}
                  className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 hover:bg-zinc-50"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}