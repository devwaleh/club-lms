export default function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      {children}
    </div>
  );
}