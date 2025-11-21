"use client";
import PageHeader from "@/app/components/PageHeader";
import ClassroomCard from "@/app/components/ClassroomCard";
import CreateClassroomModal from "@/app/components/CreateClassroomModal";
import { useState } from "react";
import { useClassrooms } from "@/lib/hooks/classrooms";
import ProtectedPage from "@/app/components/ProtectedPage";

export default function ClassroomsPage() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useClassrooms();

  return (
    <ProtectedPage>
      <div>
      <PageHeader title="Your Classrooms">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-zinc-800"
        >
          Create classroom
        </button>
      </PageHeader>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-zinc-100" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Failed to load classrooms.
          <button onClick={refetch} className="ml-2 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.length === 0 ? (
            <div className="col-span-full text-sm text-zinc-600">No classrooms yet.</div>
          ) : (
            data.map((c) => <ClassroomCard key={c.id} classroom={c} />)
          )}
        </div>
      )}

      <CreateClassroomModal open={open} onClose={() => setOpen(false)} />
      </div>
    </ProtectedPage>
  );}