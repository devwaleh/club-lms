"use client";

type Tab = { key: string; label: string };

export default function TabNav({
  tabs,
  activeKey,
  onChange,
}: {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-2 border-b border-zinc-200">
      {tabs.map((t) => {
        const isActive = t.key === activeKey;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`${
              isActive ? "bg-black text-white" : "bg-zinc-100 text-zinc-800"
            } rounded-md px-3 py-2 text-sm`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}