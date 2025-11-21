import Link from "next/link";
import {
  getClassroom,
  getLessonById,
  getAssignmentsForClassroom,
  type Lesson,
} from "@/lib/mockData";

export default function LessonDetailPage({ params }: { params: { id: string; lessonId: string } }) {
  const classroom = getClassroom(params.id);
  const lesson: Lesson | undefined = getLessonById(params.lessonId);

  if (!classroom || !lesson) {
    return <div className="text-sm text-zinc-600">Lesson not found.</div>;
  }

  const relatedAssignments = getAssignmentsForClassroom(classroom.id).filter((a) =>
    lesson.relatedAssignmentIds?.includes(a.id) || a.relatedLessonId === lesson.id
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">{lesson.title}</h2>
        <div className="mt-2 text-sm text-zinc-700">Status: {lesson.status}</div>
        {lesson.videoUrl && (
          <div className="mt-4">
            <div className="aspect-video w-full rounded-lg bg-zinc-200 flex items-center justify-center text-zinc-700">
              Video placeholder
            </div>
          </div>
        )}
        <div className="prose mt-4 max-w-none">
          <div className="whitespace-pre-wrap text-zinc-800">{lesson.content}</div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">Related assignments</h3>
        {relatedAssignments.length === 0 ? (
          <div className="mt-2 text-sm text-zinc-700">No related assignments.</div>
        ) : (
          <ul className="mt-2 list-disc pl-6 text-sm text-zinc-800">
            {relatedAssignments.map((a) => (
              <li key={a.id}>
                <Link href={`/classrooms/${classroom.id}/assignments/${a.id}`} className="hover:underline">
                  {a.title}
                </Link>
                <span className="ml-2 text-xs text-zinc-500">Due {new Date(a.dueDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-2 text-sm text-zinc-700">
        <Link href={`/classrooms/${classroom.id}`} className="hover:underline">
          ← Back to classroom
        </Link>
      </div>
    </div>
  );
}