"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import TabNav from "@/app/components/TabNav";
import LessonList from "@/app/components/LessonList";
import AssignmentList from "@/app/components/AssignmentList";
import AnnouncementList from "@/app/components/AnnouncementList";
import DiscussionThreadList from "@/app/components/DiscussionThreadList";
import {
  getClassroom,
  getLessonsForClassroom,
  getAssignmentsForClassroom,
  getAnnouncementsForClassroom,
  getThreadsForClassroom,
  type Classroom,
} from "@/lib/mockData";

export default function ClassroomDetailPage({ params }: { params: { id: string } }) {
  const classroom: Classroom | undefined = getClassroom(params.id);
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

  if (!classroom) {
    return <div className="text-sm text-zinc-600">Classroom not found.</div>;
  }

  const lessons = getLessonsForClassroom(classroom.id);
  const assignments = getAssignmentsForClassroom(classroom.id);
  const announcements = getAnnouncementsForClassroom(classroom.id);
  const threads = getThreadsForClassroom(classroom.id);

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
        <LessonList lessons={lessons} classroomId={classroom.id} />
      )}

      {activeTab === "assignments" && (
        <AssignmentList assignments={assignments} classroomId={classroom.id} />
      )}

      {activeTab === "announcements" && (
        <AnnouncementList announcements={announcements} />
      )}

      {activeTab === "discussions" && (
        <DiscussionThreadList classroomId={classroom.id} initialThreads={threads} />
      )}

      <div className="pt-2 text-sm text-zinc-700">
        <Link href="/classrooms" className="hover:underline">
          ← Back to classrooms
        </Link>
      </div>
    </div>
  );
}