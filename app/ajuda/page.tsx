"use client";

import Link from "next/link";
import { useState } from "react";
import { useWhatsApp } from "@/lib/whatsapp-context";

const STEPS = [
  { n: 1, label: "Não sei a peça" },
  { n: 2, label: "Enviar foto/modelo" },
  { n: 3, label: "Formulário" },
  { n: 4, label: "Confirmação" },
];

export default function AjudaPage() {
  const [step, setStep] = useState(1);
  const [uploaded, setUploaded] = useState(false);
  const { open: openWhatsApp } = useWhatsApp();

  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Ajuda para encontrar peça</span>
      </div>

      <div className="max-w-xl mx-auto py-10 pb-17.5">
        <div className="flex justify-center mb-8.5">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-[13.5px] ${
                    s.n < step ? "bg-green-600 text-white" : s.n === step ? "bg-orange-500 text-white" : "bg-line-soft text-ink-500"
                  }`}
                >
                  {s.n}
                </div>
                <span className={`text-[12.5px] font-bold ${s.n <= step ? "text-navy-950" : "text-ink-500"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-11 h-0.5 bg-line mx-2" />}
            </div>
          ))}
        </div>

        <div className="card p-9">
          {step === 1 && (
            <div>
              <h2 className="text-[21px] font-extrabold text-navy-950">Não sabe qual peça comprar?</h2>
              <p className="text-ink-500 mt-2 text-sm">
                Sem problema. Você não precisa saber o nome técnico da peça — nosso time de especialistas te ajuda a
                identificar o componente certo a partir de uma foto ou do modelo do equipamento.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-5.5">
                <div className="flex gap-2.5 items-start text-[12.5px] text-ink-700 bg-bg rounded-lg p-2.5">
                  <span className="text-lg">📷</span>
                  <div><b className="block text-ink-900 text-[12.5px]">Envie uma foto</b>Da peça ou do equipamento</div>
                </div>
                <div className="flex gap-2.5 items-start text-[12.5px] text-ink-700 bg-bg rounded-lg p-2.5">
                  <span className="text-lg">🔎</span>
                  <div><b className="block text-ink-900 text-[12.5px]">Ou o modelo</b>Encontrado na etiqueta do aparelho</div>
                </div>
              </div>
              <div className="flex justify-end mt-6.5">
                <button type="button" onClick={() => setStep(2)} className="btn btn-primary btn-lg">Continuar →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-[21px] font-extrabold text-navy-950">Envie uma foto ou o modelo do equipamento</h2>
              <p className="text-ink-500 mt-2 text-sm">Isso ajuda nosso time a identificar rapidamente a peça correta.</p>
              <div className="mt-5.5 border-2 border-dashed border-line rounded-xl p-9 text-center text-ink-500 bg-bg">
                <div className="text-[34px]">📷</div>
                <p>Arraste uma imagem aqui ou clique para simular o envio</p>
                <button type="button" onClick={() => setUploaded(true)} className="btn btn-secondary mt-3.5">
                  Selecionar foto (simulado)
                </button>
                {uploaded && <p className="mt-2.5 font-bold text-green-600">✅ Foto anexada (simulação)</p>}
              </div>
              <div className="flex items-center gap-2.5 my-5.5 text-ink-300 text-xs font-bold">
                <div className="flex-1 h-px bg-line" />
                ou
                <div className="flex-1 h-px bg-line" />
              </div>
              <div className="field">
                <label>Modelo do equipamento</label>
                <input type="text" placeholder="Ex: LG 55UK6520" />
              </div>
              <div className="flex justify-between mt-6.5">
                <button type="button" onClick={() => setStep(1)} className="btn btn-secondary btn-lg">← Voltar</button>
                <button type="button" onClick={() => setStep(3)} className="btn btn-primary btn-lg">Continuar →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-[21px] font-extrabold text-navy-950">Só mais alguns dados</h2>
              <p className="text-ink-500 mt-2 text-sm">Assim nosso time consegue te responder pelo canal que preferir.</p>
              <div className="grid grid-cols-2 gap-3.5 mt-5.5">
                <div className="field"><label>Nome</label><input type="text" placeholder="Seu nome" /></div>
                <div className="field"><label>Telefone / WhatsApp</label><input type="text" placeholder="(11) 90000-0000" /></div>
              </div>
              <div className="field"><label>E-mail</label><input type="email" placeholder="seuemail@exemplo.com" /></div>
              <div className="field"><label>Descreva o problema (opcional)</label><textarea rows={3} placeholder="Ex: TV não liga o painel de imagem" /></div>
              <div className="flex justify-between mt-6.5">
                <button type="button" onClick={() => setStep(2)} className="btn btn-secondary btn-lg">← Voltar</button>
                <button type="button" onClick={() => setStep(4)} className="btn btn-primary btn-lg">Enviar solicitação →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-5">
              <div className="w-18.5 h-18.5 rounded-full bg-[#e9f7ee] text-green-600 flex items-center justify-center text-4xl mx-auto mb-4.5">
                ✅
              </div>
              <h2 className="text-[21px] font-extrabold text-navy-950">Solicitação enviada com sucesso!</h2>
              <p className="text-ink-500 mt-2">
                Nosso time de especialistas vai analisar as informações enviadas e retornar em breve com a peça
                correta para o seu equipamento.
              </p>
              <div className="mt-4.5 bg-bg rounded-lg p-3.5 text-[13.5px] text-ink-700">
                Protocolo simulado: <b>#NESHOP-2026-08421</b>
                <br />
                Tempo médio de resposta: até 1 dia útil.
              </div>
              <div className="flex justify-center gap-2.5 mt-6.5 flex-wrap">
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp("Olá! Acabei de enviar uma solicitação de identificação de peça (protocolo #NESHOP-2026-08421).")
                  }
                  className="btn btn-whatsapp btn-lg"
                >
                  Continuar no WhatsApp
                </button>
                <Link href="/" className="btn btn-secondary btn-lg">Voltar para a Home</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
