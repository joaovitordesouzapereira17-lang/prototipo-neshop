export type Product = {
  id: string;
  name: string;
  brand: string;
  modelo: string;
  codigo: string;
  cat: string;
  price: number;
  installment: string;
  rating: number;
  reviews: number;
  orig: boolean;
  stock: boolean;
  icon: string;
};

export const PRODUCTS: Product[] = [
  { id: "p01", name: "Placa Principal para TV LED", brand: "LG", modelo: "55UK6520", codigo: "EBT64825302", cat: "tv", price: 389.9, installment: "6x de R$ 64,98", rating: 4.8, reviews: 42, orig: true, stock: true, icon: "📺" },
  { id: "p02", name: "Placa Fonte para TV LED", brand: "Samsung", modelo: "UN50T5300", codigo: "BN44-00932A", cat: "tv", price: 229.9, installment: "6x de R$ 38,32", rating: 4.6, reviews: 31, orig: true, stock: true, icon: "📺" },
  { id: "p03", name: "Compressor para Ar-condicionado Split", brand: "Springer", modelo: "9.000 BTUs", codigo: "COMP-9K-SP", cat: "ar-condicionado", price: 749.0, installment: "10x de R$ 74,90", rating: 4.9, reviews: 58, orig: true, stock: true, icon: "❄️" },
  { id: "p04", name: "Placa Eletrônica Evaporadora Ar-condicionado", brand: "LG", modelo: "S4-Q12", codigo: "EBR78530401", cat: "ar-condicionado", price: 319.9, installment: "6x de R$ 53,32", rating: 4.5, reviews: 19, orig: true, stock: true, icon: "❄️" },
  { id: "p05", name: "Placa Potência Lava e Seca", brand: "Samsung", modelo: "WD24DB", codigo: "DC92-01850A", cat: "lava-e-seca", price: 279.0, installment: "6x de R$ 46,50", rating: 4.7, reviews: 27, orig: true, stock: true, icon: "🌀" },
  { id: "p06", name: "Motor para Máquina de Lavar", brand: "Brastemp", modelo: "BWK11", codigo: "W11234567", cat: "lava-e-seca", price: 349.9, installment: "8x de R$ 43,74", rating: 4.4, reviews: 15, orig: false, stock: true, icon: "🌀" },
  { id: "p07", name: "Placa Sensora para Refrigerador Frost Free", brand: "Consul", modelo: "CRM43", codigo: "W10914512", cat: "refrigerador", price: 189.9, installment: "6x de R$ 31,65", rating: 4.6, reviews: 22, orig: true, stock: true, icon: "🧊" },
  { id: "p08", name: "Compressor para Refrigerador", brand: "Electrolux", modelo: "DF44", codigo: "EMBR-DF44", cat: "refrigerador", price: 459.9, installment: "10x de R$ 45,99", rating: 4.8, reviews: 37, orig: true, stock: false, icon: "🧊" },
  { id: "p09", name: "Placa Amplificadora para Rádio e Som", brand: "Philco", modelo: "PB100", codigo: "AMP-PB100", cat: "radio-e-som", price: 159.9, installment: "6x de R$ 26,65", rating: 4.3, reviews: 11, orig: true, stock: true, icon: "🔊" },
  { id: "p10", name: "Alto-falante para Caixa de Som Bluetooth", brand: "AOC", modelo: "SP2000", codigo: "SPK-AOC2000", cat: "radio-e-som", price: 99.9, installment: "3x de R$ 33,30", rating: 4.2, reviews: 9, orig: false, stock: true, icon: "🔊" },
  { id: "p11", name: "Bateria para Parafusadeira Profissional", brand: "Toshiba", modelo: "PF-14V", codigo: "BAT-PF14V", cat: "ferramentas", price: 219.9, installment: "6x de R$ 36,65", rating: 4.7, reviews: 24, orig: true, stock: true, icon: "🛠️" },
  { id: "p12", name: "Placa Principal para TV LED 4K", brand: "LG", modelo: "65NANO75", codigo: "EBT65432901", cat: "tv", price: 459.0, installment: "10x de R$ 45,90", rating: 4.9, reviews: 63, orig: true, stock: true, icon: "📺" },
];

export type Category = { slug: string; name: string; icon: string };

export const CATEGORIES: Category[] = [
  { slug: "tv", name: "TV", icon: "📺" },
  { slug: "ar-condicionado", name: "Ar-condicionado", icon: "❄️" },
  { slug: "lava-e-seca", name: "Lava e seca", icon: "🌀" },
  { slug: "refrigerador", name: "Refrigerador", icon: "🧊" },
  { slug: "radio-e-som", name: "Rádio e som", icon: "🔊" },
  { slug: "ferramentas", name: "Ferramentas", icon: "🛠️" },
];

export const CAT_NAMES: Record<string, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.slug]: c.name }),
  {} as Record<string, string>
);

export const BRANDS = [
  "LG", "Samsung", "Philco", "AOC", "Toshiba", "Brastemp",
  "Consul", "Electrolux", "Springer", "Midea", "Panasonic", "Britânia",
];

export function money(v: number): string {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

export function starsHtml(rating: number): string {
  const full = Math.round(rating);
  return Array.from({ length: 5 }, (_, i) => (i < full ? "★" : "☆")).join("");
}

export function typeOf(p: Product): "placa" | "motor" | "outros" {
  if (/placa/i.test(p.name)) return "placa";
  if (/motor|compressor/i.test(p.name)) return "motor";
  return "outros";
}

export function matchesQuery(p: Product, q: string): boolean {
  const hay = `${p.name} ${p.brand} ${p.modelo} ${p.codigo} ${p.cat}`.toLowerCase();
  return q
    .toLowerCase()
    .split(" ")
    .every((term) => term.length === 0 || hay.includes(term));
}

export type SortMode = "relevance" | "price-asc" | "price-desc" | "rating";

export function sortProducts(list: Product[], mode: SortMode): Product[] {
  const copy = [...list];
  if (mode === "price-asc") copy.sort((a, b) => a.price - b.price);
  else if (mode === "price-desc") copy.sort((a, b) => b.price - a.price);
  else if (mode === "rating") copy.sort((a, b) => b.rating - a.rating);
  return copy;
}
