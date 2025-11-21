import Link from "next/link";

export default function ClassroomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/classrooms" className="text-zinc-700 hover:underline">
            Classrooms
          </Link>
        </div>
        <Link href="/" className="text-sm text-zinc-700 hover:underline">
          Back to Home
        </Link>
      </div>
      {children}
    </div>
  );
}