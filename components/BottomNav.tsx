"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const TABS = [
  { href: "/", label: "Início", icon: Home, match: (path: string) => path === "/" },
  { href: "/categorias", label: "Categorias", icon: LayoutGrid, match: (path: string) => path.startsWith("/categoria") },
  { href: "/carrinho", label: "Carrinho", icon: ShoppingCart, match: (path: string) => path === "/carrinho" },
  { href: "/conta", label: "Conta", icon: User, match: (path: string) => path === "/conta" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { totalQty } = useCart();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-line flex items-stretch"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10.5px] font-semibold ${
              active ? "text-blue-600" : "text-ink-500"
            }`}
          >
            <tab.icon size={21} strokeWidth={active ? 2.1 : 1.7} />
            {tab.label}
            {tab.href === "/carrinho" && totalQty > 0 && (
              <span className="absolute top-1 right-[calc(50%-20px)] bg-orange-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
