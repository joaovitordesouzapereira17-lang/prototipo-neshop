import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WhatsAppProvider } from "@/lib/whatsapp-context";
import { ProtoBar } from "@/components/ProtoBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { WhatsAppFloatButton, WhatsAppModal } from "@/components/WhatsAppModal";

export const metadata: Metadata = {
  title: "Neshop — Encontre a peça que você precisa (Protótipo)",
  description: "Proposta de redesign do e-commerce Neshop — protótipo navegável para validação interna.",
};

// viewportFit "cover" deixa o conteúdo se estender até a borda física da tela
// (necessário em iPhones com barra de indicador embaixo) e habilita
// env(safe-area-inset-bottom), usado para acolchoar a barra de navegação fixa.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <WhatsAppProvider>
          <CartProvider>
            <ProtoBar />
            <Header />
            <div className="pb-24 md:pb-0">
              <main>{children}</main>
              <Footer />
            </div>
            <BottomNav />
            <WhatsAppFloatButton />
            <WhatsAppModal />
          </CartProvider>
        </WhatsAppProvider>
      </body>
    </html>
  );
}
