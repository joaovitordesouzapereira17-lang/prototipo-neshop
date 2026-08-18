import { CircuitBoard } from "lucide-react";

/**
 * Placeholder até recebermos o arquivo definitivo da logo (enviado em chat,
 * mas sem acesso a arquivo neste ambiente). Quando o arquivo estiver em
 * public/logo.png, troque o conteúdo deste componente por:
 *
 *   <img src="/logo.png" alt="Neshop" className="h-9 w-auto" />
 */
export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`flex items-center gap-3 font-extrabold text-2xl ${light ? "text-white" : "text-navy-900"} ${className}`}>
      <span className="w-12 h-12 rounded-[11px] bg-blue-500 text-navy-950 flex items-center justify-center flex-shrink-0">
        <CircuitBoard size={24} strokeWidth={1.8} />
      </span>
      <span>
        Neshop
        <span className={`block -mt-0.5 text-[11.5px] font-semibold tracking-wide uppercase ${light ? "text-[#8fa9be]" : "text-ink-500"}`}>
          Peças &amp; Componentes
        </span>
      </span>
    </span>
  );
}
