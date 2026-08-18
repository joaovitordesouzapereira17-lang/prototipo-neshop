import Link from "next/link";
import { Truck, CreditCard, ShieldCheck, Headphones, CheckCircle2, CircuitBoard, Search } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { BrandMarquee } from "@/components/BrandMarquee";
import { CategoryCard } from "@/components/CategoryCard";
import { CATEGORIES, PRODUCTS, BRANDS } from "@/lib/products";

const BENEFITS = [
  { icon: Truck, label: "Envio rápido" },
  { icon: CreditCard, label: "Até 6x sem juros" },
  { icon: ShieldCheck, label: "Garantia nas peças" },
  { icon: Headphones, label: "Atendimento especializado" },
  { icon: CheckCircle2, label: "Peças originais" },
];

const CONTENT_CARDS = [
  { kicker: "Guia técnico", title: "Como encontrar o código correto da sua peça" },
  { kicker: "Comparativo", title: "Peça original x paralela: qual escolher?" },
  { kicker: "Guia técnico", title: "Como identificar a placa correta do seu equipamento?" },
];

const TESTIMONIALS = [
  { rating: 5, quote: "Encontrei a placa exata para minha TV em poucos minutos. Atendimento explicou tudo antes da compra.", who: "Roberto S. — Técnico em eletrônicos", initial: "R" },
  { rating: 5, quote: "Compro peças para o meu comércio há anos na Neshop. Sempre com peças originais e prazo certo.", who: "Marcia L. — Assistência técnica", initial: "M" },
  { rating: 4, quote: "Não sabia identificar a peça do meu ar-condicionado, o time da Neshop me ajudou pelo WhatsApp.", who: "João P. — Consumidor final", initial: "J" },
];

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <>
      <HeroSearch />

      <section className="py-13">
        <div className="wrap">
          <div className="flex justify-between items-end gap-4 mb-6.5">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Encontre por equipamento</h2>
              <p className="text-ink-500 text-[14.5px] mt-1.5">Selecione o tipo de aparelho para ver as peças compatíveis.</p>
            </div>
            <Link href="/categorias" className="text-[13.5px] font-bold text-blue-600 hover:text-orange-600 whitespace-nowrap">
              Ver todas as categorias →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 lg:gap-4">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.slug} slug={c.slug} name={c.name} />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-navy-950 text-white">
        <div className="wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4.5 py-5.5">
          {BENEFITS.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#dbe8f2]">
              <b.icon size={20} strokeWidth={1.6} className="flex-shrink-0" />
              <span className="whitespace-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-13">
        <div className="wrap">
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-blue-600 text-white p-11 flex items-center justify-between gap-9 relative flex-col md:flex-row text-center md:text-left">
            <div className="max-w-lg">
              <span className="text-[12.5px] font-bold text-orange-500 tracking-widest uppercase">Campanha</span>
              <h2 className="text-[30px] font-extrabold mt-2.5 tracking-tight">PEÇAS ORIGINAIS PARA SEU EQUIPAMENTO</h2>
              <p className="text-[#c6dcee] mt-2.5 text-[15px]">
                Encontre o componente certo para o seu aparelho, com a garantia e o conhecimento técnico de quem
                entende do assunto há mais de 35 anos.
              </p>
              <Link href="/categorias" className="inline-flex mt-5.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6.5 py-3.5 rounded-lg text-[14.5px]">
                Encontrar peças →
              </Link>
            </div>
            <div className="w-[190px] h-[190px] rounded-[20px] bg-white/[.08] border border-white/[.18] flex-shrink-0 flex items-center justify-center">
              <CircuitBoard size={64} strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-13 bg-white border-y border-line-soft">
        <div className="wrap">
          <div className="flex justify-between items-end gap-4 mb-6.5">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Peças mais procuradas</h2>
              <p className="text-ink-500 text-[14.5px] mt-1.5">Uma seleção das peças com maior procura no nosso catálogo.</p>
            </div>
            <Link href="/categorias" className="text-[13.5px] font-bold text-blue-600 hover:text-orange-600 whitespace-nowrap">
              Ver mais peças →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-13">
        <div className="wrap grid md:grid-cols-[1.1fr_.9fr] gap-12 items-center">
          <div>
            <h2 className="text-[28px] font-extrabold text-navy-950 tracking-tight leading-tight">
              Mais de 35 anos ajudando equipamentos a voltar a funcionar.
            </h2>
            <p className="text-ink-500 mt-3.5 text-[15px] max-w-md">
              Conhecimento técnico, peças originais e atendimento especializado para ajudar você a encontrar o
              componente certo — da identificação até a compra.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            <div className="bg-blue-100 rounded-lg px-4 py-5.5 text-center">
              <div className="text-[26px] font-extrabold text-navy-900">35+</div>
              <div className="text-xs text-ink-700 mt-1 font-semibold">Anos de mercado</div>
            </div>
            <div className="bg-blue-100 rounded-lg px-4 py-5.5 text-center">
              <div className="text-[26px] font-extrabold text-navy-900">200mil+</div>
              <div className="text-xs text-ink-700 mt-1 font-semibold">Clientes atendidos</div>
            </div>
            <div className="bg-blue-100 rounded-lg px-4 py-5.5 text-center">
              <div className="text-[26px] font-extrabold text-navy-900">14+</div>
              <div className="text-xs text-ink-700 mt-1 font-semibold">Marcas trabalhadas</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-9">
        <div className="wrap">
          <div className="bg-gradient-to-br from-orange-100 to-white border border-orange-100 rounded-lg flex flex-col md:flex-row items-center justify-between gap-9 px-11 py-11">
            <div className="w-24 h-24 rounded-[22px] bg-white border border-line flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
              <Search size={40} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-navy-950">Não sabe qual peça você precisa?</h2>
              <p className="text-ink-700 mt-2 max-w-lg text-[14.5px]">
                Envie uma foto do componente ou o modelo do equipamento. Nosso time ajuda você a encontrar a peça
                adequada — sem complicação.
              </p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <Link href="/ajuda" className="btn btn-primary btn-lg">Enviar foto ou modelo</Link>
                <Link href="/ajuda" className="btn btn-whatsapp btn-lg">Falar com especialista</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-13 bg-white border-y border-line-soft">
        <div className="wrap">
          <div className="flex justify-between items-end gap-4 mb-6.5">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Marcas parceiras</h2>
              <p className="text-ink-500 text-[14.5px] mt-1.5">Trabalhamos com as principais marcas do mercado de eletroeletrônicos.</p>
            </div>
            <Link href="/marcas" className="text-[13.5px] font-bold text-blue-600 hover:text-orange-600 whitespace-nowrap">
              Ver todas as marcas →
            </Link>
          </div>
        </div>
        <BrandMarquee brands={BRANDS} />
      </section>

      <section className="py-13">
        <div className="wrap">
          <div className="flex justify-between items-end gap-4 mb-6.5">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Conteúdos para ajudar você</h2>
              <p className="text-ink-500 text-[14.5px] mt-1.5">Guias práticos para identificar e escolher a peça certa.</p>
            </div>
            <Link href="/conteudo" className="text-[13.5px] font-bold text-blue-600 hover:text-orange-600 whitespace-nowrap">
              Ver todos os conteúdos →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4.5">
            {CONTENT_CARDS.map((c) => (
              <Link key={c.title} href="/conteudo" className="card p-5.5 hover:border-blue-500 hover:shadow-md transition-shadow">
                <span className="text-[11.5px] font-bold text-blue-600 uppercase tracking-wide">{c.kicker}</span>
                <h3 className="text-[15.5px] font-bold mt-2.5 text-navy-950 leading-snug">{c.title}</h3>
                <span className="block mt-3.5 text-[13px] font-bold text-orange-600">Ler conteúdo →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-13 bg-white border-y border-line-soft">
        <div className="wrap">
          <div className="mb-6.5">
            <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Quem compra, confia.</h2>
            <p className="text-ink-500 text-[14.5px] mt-1.5">Depoimentos de clientes reais da Neshop (texto ilustrativo para o protótipo).</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4.5">
            {TESTIMONIALS.map((t) => (
              <div key={t.who} className="card p-5.5">
                <StarRating rating={t.rating} />
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">&quot;{t.quote}&quot;</p>
                <div className="mt-3.5 text-[13px] font-bold text-navy-950 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-extrabold text-xs">
                    {t.initial}
                  </span>
                  {t.who}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-300 mt-4.5 text-center">
            Textos ilustrativos para fins de protótipo — na versão final, utilizar depoimentos reais da base da Neshop.
          </p>
        </div>
      </section>
    </>
  );
}
