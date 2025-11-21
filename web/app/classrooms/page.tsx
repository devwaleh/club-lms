"use client";
import PageHeader from "@/app/components/PageHeader";
import ClassroomCard from "@/app/components/ClassroomCard";
import CreateClassroomModal from "@/app/components/CreateClassroomModal";
import { mockClassrooms } from "@/lib/mockData";
import { useState } from "react";

export default function ClassroomsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Your Classrooms">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800"
        >
          Create classroom
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockClassrooms.map((c) => (
          <ClassroomCard key={c.id} classroom={c} />
        ))}
      </div>

      <CreateClassroomModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}