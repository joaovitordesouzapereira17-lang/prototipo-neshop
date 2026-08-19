"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(page, totalPages);

  return (
    <nav role="navigation" aria-label="Paginação" className="flex flex-wrap justify-center items-center gap-1.5 mt-8">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className="flex items-center gap-1 h-9 px-3 rounded-lg text-[13px] font-semibold text-ink-700 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft size={16} strokeWidth={2} /> Anterior
      </button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e-${i}`} aria-hidden className="flex h-9 w-9 items-center justify-center text-ink-300">
            <MoreHorizontal size={16} strokeWidth={2} />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Página ${p}`}
            className={`h-9 w-9 rounded-lg text-[13px] font-bold transition-colors ${
              p === page ? "bg-blue-600 text-white" : "text-ink-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Próxima página"
        className="flex items-center gap-1 h-9 px-3 rounded-lg text-[13px] font-semibold text-ink-700 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        Próxima <ChevronRight size={16} strokeWidth={2} />
      </button>
    </nav>
  );
}
