import { Wrench } from "lucide-react";

export function ProtoBar() {
  return (
    <div className="bg-ink-900 text-[#cfe0ee] text-[12.5px] text-center py-1.5 px-4 tracking-[.2px] flex items-center justify-center gap-1.5 flex-wrap">
      <Wrench size={13} strokeWidth={2} />
      <strong className="text-white">PROTÓTIPO / WIREFRAME</strong> — proposta de redesign para validação
      interna. Não é o site oficial da Neshop.
      <span className="opacity-50 mx-2">•</span>
      Todas as interações são simuladas.
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="bg-navy-950 text-[#a9c2d6] text-[12.5px]">
      <div className="wrap flex justify-center gap-2.5 py-1.5 flex-wrap">
        <span>35+ anos de mercado</span>
        <span className="opacity-40">|</span>
        <span>Peças originais</span>
        <span className="opacity-40">|</span>
        <span>Atendimento especializado</span>
      </div>
    </div>
  );
}
