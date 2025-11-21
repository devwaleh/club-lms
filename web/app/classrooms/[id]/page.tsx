"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import TabNav from "@/app/components/TabNav";
import LessonList from "@/app/components/LessonList";
import AssignmentList from "@/app/components/AssignmentList";
import AnnouncementList from "@/app/components/AnnouncementList";
import DiscussionThreadList from "@/app/components/DiscussionThreadList";
import type { Classroom } from "@/lib/types";
import { useClassroom } from "@/lib/hooks/classrooms";
import { useLessons } from "@/lib/hooks/lessons";
import { useAssignments } from "@/lib/hooks/assignments";
import { useAnnouncements } from "@/lib/hooks/announcements";
import { useDiscussionThreads, useCreateThread } from "@/lib/hooks/discussions";

export default function ClassroomDetailPage({ params }: { params: { id: string } }) {
  const { data: classroom, isLoading: classroomLoading } = useClassroom(params.id);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "lessons", label: "Lessons" },
      { key: "assignments", label: "Assignments" },
      { key: "announcements", label: "Announcements" },
      { key: "discussions", label: "Discussions" },
    ],
    []
  );

  if (classroomLoading) {
    return <div className="h-24 animate-pulse rounded-lg bg-zinc-100" />;
  }

  if (!classroom) {
    return <div className="text-sm text-zinc-600">Classroom not found.</div>;
  }

  const { data: lessons = [], isLoading: lessonsLoading } = useLessons(classroom.id);
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments(classroom.id);
  const { data: announcements = [], isLoading: announcementsLoading } = useAnnouncements(classroom.id);
  const { data: threads = [], isLoading: threadsLoading, refetch: refetchThreads } = useDiscussionThreads(classroom.id);
  const { mutate: createThread } = useCreateThread(classroom.id);

  return (
    <div className="space-y-6">
      <header className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">{classroom.title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{classroom.description}</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-zinc-700">
              {classroom.visibility}
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-800">
              {classroom.role}
            </span>
          </div>
        </div>
        <div className="mt-4 text-sm text-zinc-700">Members: {classroom.memberCount}</div>
      </header>

      <TabNav tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-zinc-900">Welcome</h3>
          <p className="mt-2 text-sm text-zinc-700">
            This is the overview section. Use the tabs to navigate lessons, assignments, announcements and discussions.
          </p>
        </div>
      )}

      {activeTab === "lessons" && (
        lessonsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-zinc-100" />
            ))}
          </div>
        ) : (
          <LessonList lessons={lessons} classroomId={classroom.id} />
        )
      )}

      {activeTab === "assignments" && (
        assignmentsLoading ? (
          <div className="h-24 animate-pulse rounded-lg bg-zinc-100" />
        ) : (
          <AssignmentList assignments={assignments} classroomId={classroom.id} />
        )
      )}

      {activeTab === "announcements" && (
        announcementsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-zinc-100" />
            ))}
          </div>
        ) : (
          <AnnouncementList announcements={announcements} />
        )
      )}

      {activeTab === "discussions" && (
        threadsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-zinc-100" />
            ))}
          </div>
        ) : (
          <DiscussionThreadList
            classroomId={classroom.id}
            initialThreads={threads}
            onCreateThread={async (payload) => {
              const created = await createThread(payload);
              await refetchThreads();
              return created as any;
            }}
          />
        )
      )}

      <div className="pt-2 text-sm text-zinc-700">
        <Link href="/classrooms" className="hover:underline">
          ← Back to classrooms
        </Link>
      </div>
    </div>
  );
}