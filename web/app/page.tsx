import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold tracking-tight">Mini‑LMS</div>
          <nav className="hidden gap-6 text-sm sm:flex">
            <Link href="/" className="text-zinc-700 hover:text-black">Home</Link>
            <Link href="/classrooms" className="text-zinc-700 hover:text-black">Classrooms</Link>
            <Link href="#about" className="text-zinc-700 hover:text-black">About</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-zinc-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">Learn, Collaborate, Lead.</h1>
              <p className="mt-4 text-lg text-zinc-700">Your classroom and club learning space — powered by our mini‑LMS.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/classrooms"
                  className="inline-flex items-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
                >
                  Enter Dashboard
                </Link>
                <Link
                  href="/join"
                  className="inline-flex items-center rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                >
                  Join with Invite Code
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-zinc-900">Everything you need to run a classroom or club</h2>
              <p className="mt-2 text-sm text-zinc-600">Organize content, track progress, and foster collaboration.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-900">Lessons</div>
                <p className="mt-2 text-sm text-zinc-700">Publish structured content and guide learning step by step.</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-900">Assignments</div>
                <p className="mt-2 text-sm text-zinc-700">Set due dates and collect submissions with ease.</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-900">Discussions</div>
                <p className="mt-2 text-sm text-zinc-700">Facilitate threads for Q&A and peer collaboration.</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-900">Announcements</div>
                <p className="mt-2 text-sm text-zinc-700">Share updates and pin important notices.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-zinc-500">© {new Date().getFullYear()} Mini‑LMS</div>
      </footer>
    </div>
  );
}
