import Link from "next/link";
import { categoryIcon } from "@/lib/category-icons";

export function CategoryCard({ slug, name }: { slug: string; name: string }) {
  const Icon = categoryIcon(slug);

  return (
    <Link href={`/categoria?cat=${slug}`} className="block">
      {/* Mobile/tablet (< lg) — estilo compacto: texto à esquerda, ícone à direita */}
      <div className="lg:hidden relative flex items-center justify-between gap-2 bg-bg rounded-2xl px-4 py-5 overflow-hidden active:bg-line-soft transition-colors">
        <span className="font-extrabold text-navy-950 text-[14.5px] leading-snug z-10">{name}</span>
        <Icon size={38} strokeWidth={1.4} className="text-blue-500/60 flex-shrink-0 -mr-1" />
      </div>

      {/* Desktop (lg+) — ícone centralizado acima do texto */}
      <div className="hidden lg:block card px-3.5 py-5.5 text-center hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <span className="w-13 h-13 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
          <Icon size={24} strokeWidth={1.6} />
        </span>
        <span className="font-bold text-[13.5px] text-navy-950">{name}</span>
      </div>
    </Link>
  );
}
