"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { useWhatsApp } from "@/lib/whatsapp-context";

export function WhatsAppFloatButton() {
  const { open } = useWhatsApp();
  // Na página de produto (mobile) existe uma barra de compra fixa extra
  // acima da navegação inferior — o botão precisa subir mais para não ficar por cima dela.
  const pathname = usePathname();
  const produto = pathname?.startsWith("/produto");

  return (
    <button
      type="button"
      onClick={() => open()}
      title="Fale no WhatsApp"
      className={`fixed ${produto ? "whatsapp-fab-produto" : "whatsapp-fab"} right-4 md:bottom-6 md:right-6 z-[80] w-14 h-14 rounded-full bg-green-600 hover:bg-[#1e8a4b] text-white flex items-center justify-center shadow-lg border-none`}
    >
      <MessageCircle size={26} strokeWidth={1.8} />
    </button>
  );
}

export function WhatsAppModal() {
  const { isOpen, message, close } = useWhatsApp();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(11,31,51,.55)] flex items-center justify-center z-[100] p-5"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="bg-white rounded-lg max-w-[420px] w-full p-7 shadow-lg relative">
        <button
          type="button"
          onClick={close}
          className="absolute top-3.5 right-3.5 border-none bg-line-soft w-[30px] h-[30px] rounded-full text-ink-700 flex items-center justify-center"
        >
          <X size={16} strokeWidth={2} />
        </button>
        <h3 className="text-lg font-extrabold text-navy-950 flex items-center gap-2.5">
          <MessageCircle size={20} strokeWidth={1.8} /> Atendimento via WhatsApp
        </h3>
        <p className="mt-2.5 text-sm text-ink-700 leading-relaxed">
          Este é um protótipo — em produção, este botão abriria uma conversa real no WhatsApp com nosso time de
          especialistas.
        </p>
        <div className="mt-4 bg-[#e9f7ee] border border-[#cfeadb] rounded-xl px-4 py-3.5 text-[13.5px] text-[#1e5c39]">
          <strong>Simulação da mensagem:</strong>
          <br />
          &quot;{message}&quot;
        </div>
        <div className="mt-5">
          <button type="button" onClick={close} className="btn btn-whatsapp btn-block">
            Entendi, fechar
          </button>
        </div>
      </div>
    </div>
  );
}
