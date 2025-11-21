"use client";
export default function CreateClassroomModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-900">Create classroom (mock)</h3>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="Title" />
          <textarea className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" rows={4} placeholder="Description" />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="rounded-md border border-zinc-300 px-3 py-2 text-sm">Cancel</button>
            <button onClick={onClose} className="rounded-md bg-black px-3 py-2 text-sm text-white">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}