import Link from "next/link";

type BrandMarqueeProps = {
  brands: string[];
  speed?: "normal" | "slow" | "fast";
};

const DURATION_MAP: Record<NonNullable<BrandMarqueeProps["speed"]>, string> = {
  normal: "40s",
  slow: "80s",
  fast: "22s",
};

/**
 * Vitrine de marcas parceiras com rolagem automática infinita.
 * Pausa no hover. Sem imagens externas (evita depender de logos de
 * terceiros não verificados) — usa o nome da marca em destaque, com o
 * gradiente da marca Neshop revelado no hover, e cada item é clicável
 * levando para a página da marca correspondente.
 */
export function BrandMarquee({ brands, speed = "normal" }: BrandMarqueeProps) {
  const duration = DURATION_MAP[speed];
  const doubled = [...brands, ...brands];

  return (
    <div
      className="w-full overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
    >
      <div
        className="flex w-max items-center gap-4 py-1 hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {doubled.map((brand, i) => (
          <Link
            key={`${brand}-${i}`}
            href={`/marca?marca=${encodeURIComponent(brand)}`}
            className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-lg bg-blue-100 overflow-hidden border border-line"
          >
            <div className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-br from-navy-900 via-navy-700 to-blue-500" />
            <span className="relative font-extrabold text-[15px] text-navy-900 group-hover:text-white transition-colors">
              {brand}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
