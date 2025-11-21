import type { Announcement } from "@/lib/mockData";

export default function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="space-y-3">
      {announcements.map((a) => (
        <div key={a.id} className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-semibold text-zinc-900">{a.title}</h4>
            {a.pinned && (
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700">Pinned</span>
            )}
          </div>
          <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{a.body}</p>
          <div className="mt-2 text-xs text-zinc-500">Published {new Date(a.publishedAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}