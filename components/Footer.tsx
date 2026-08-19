"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  // Página de produto tem uma barra de compra fixa extra no mobile, acima da
  // navegação inferior — o rodapé precisa de uma folga a mais para não ficar
  // coberto por ela ao rolar até o final.
  const pathname = usePathname();
  const extraSpace = pathname?.startsWith("/produto");

  return (
    <footer className={`bg-navy-950 text-[#a9c2d6] mt-5 ${extraSpace ? "mb-20 md:mb-0" : ""}`}>
      <div className="wrap pt-12 pb-7">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <Link href="/">
              <Logo light />
            </Link>
            <p className="text-[13px] mt-3 text-[#8fa9be] max-w-[260px]">
              Mais de 35 anos comercializando peças e componentes originais para TVs, ar-condicionados,
              refrigeradores, lavadoras e muito mais.
            </p>
            <div className="flex gap-2.5 mt-4">
              {["f", "ig", "in", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-[34px] h-[34px] rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center text-sm"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-[13.5px] font-bold mb-3.5 tracking-wide">Institucional</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><a href="#" className="hover:text-white">Sobre a Neshop</a></li>
              <li><a href="#" className="hover:text-white">Como comprar</a></li>
              <li><a href="#" className="hover:text-white">Segurança</a></li>
              <li><a href="#" className="hover:text-white">Política de privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[13.5px] font-bold mb-3.5 tracking-wide">Atendimento</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>WhatsApp: (11) 4000-0000</li>
              <li>Telefone: (11) 3000-0000</li>
              <li>contato@neshop.com.br</li>
              <li>Seg. a sáb. · 8h às 18h</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[13.5px] font-bold mb-3.5 tracking-wide">Categorias</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href="/categoria?cat=tv" className="hover:text-white">TV</Link></li>
              <li><Link href="/categoria?cat=ar-condicionado" className="hover:text-white">Ar-condicionado</Link></li>
              <li><Link href="/categoria?cat=lava-e-seca" className="hover:text-white">Lava e seca</Link></li>
              <li><Link href="/categoria?cat=refrigerador" className="hover:text-white">Refrigerador</Link></li>
              <li><Link href="/categorias" className="hover:text-white">Ver todas →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[13.5px] font-bold mb-3.5 tracking-wide">Pagamento e segurança</h4>
            <div className="flex gap-2 flex-wrap">
              {["Pix", "Visa", "Master", "Boleto"].map((p) => (
                <span key={p} className="bg-white/10 px-2.5 py-1 rounded-md text-[11.5px] font-bold text-[#cfe0ee]">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <span className="text-[11.5px] bg-white/10 px-2.5 py-1 rounded-md text-[#cfe0ee] inline-flex items-center gap-1.5">
                <Lock size={13} strokeWidth={2} /> Site seguro
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap border-t border-white/10 py-4.5 flex justify-between items-center text-[12.5px] text-[#7d99b0] flex-wrap gap-3">
        <span>© {new Date().getFullYear()} Neshop — Protótipo de wireframe para validação interna. Não é o site oficial.</span>
        <span>CNPJ fictício para fins de protótipo</span>
      </div>
    </footer>
  );
}
