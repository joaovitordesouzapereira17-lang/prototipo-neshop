"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function FilterPill({
  label,
  count = 0,
  children,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold px-3.5 py-2 rounded-full border transition-colors ${
          count > 0 ? "border-blue-500 text-blue-600 bg-blue-100" : "border-line text-ink-700 bg-white"
        }`}
      >
        {label}
        {count > 0 && ` (${count})`}
        <ChevronDown size={14} strokeWidth={2.2} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 max-h-[60vh] overflow-y-auto bg-white border border-line rounded-xl shadow-lg p-4 z-50">
          {children}
        </div>
      )}
    </div>
  );
}
