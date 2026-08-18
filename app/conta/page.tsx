"use client";

import { useState } from "react";
import { useWhatsApp } from "@/lib/whatsapp-context";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContaPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { open: openWhatsApp } = useWhatsApp();

  function handleSignIn() {
    if (!email || !password) {
      setError("Preencha e-mail e senha.");
      setSuccess(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Digite um e-mail válido.");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSignIn();
  }

  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <a href="/" className="text-blue-600 font-semibold">Início</a>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Minha conta</span>
      </div>

      <section className="pt-6">
        <div className="max-w-[400px] mx-auto">
          <span className="badge-proto">Área simulada — sem autenticação real</span>

          <div className="mt-4.5 bg-gradient-to-b from-blue-100 to-white border border-line rounded-lg shadow-md px-7.5 py-9 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-white border border-line flex items-center justify-center text-[26px] shadow-sm mb-4.5">
              🔑
            </div>
            <h1 className="text-[21px] font-extrabold text-navy-950">Entrar na sua conta</h1>
            <p className="text-[13.5px] text-ink-500 mt-2 mb-5.5 leading-relaxed">
              Acompanhe pedidos, salve peças e agilize sua próxima compra na Neshop.
            </p>

            <div className="relative w-full mb-3">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm opacity-70">✉️</span>
              <input
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-line rounded-[10px] bg-bg pl-9.5 pr-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="relative w-full mb-3">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm opacity-70">🔒</span>
              <input
                type="password"
                placeholder="Senha"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-line rounded-[10px] bg-bg pl-9.5 pr-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="w-full flex justify-between items-center mb-4 gap-2.5 min-h-4">
              <span className="text-[#c94b2b] text-[12.5px] font-semibold text-left">{error}</span>
              <button
                type="button"
                onClick={() => openWhatsApp("Olá! Esqueci minha senha e preciso de ajuda para acessar minha conta.")}
                className="text-[12.5px] font-bold text-blue-600 hover:text-orange-600 ml-auto whitespace-nowrap"
              >
                Esqueci a senha
              </button>
            </div>

            <button type="button" onClick={handleSignIn} className="btn btn-primary btn-lg btn-block">
              Entrar
            </button>

            {success && (
              <div className="w-full mt-3.5 bg-[#e9f7ee] border border-[#cfeadb] text-[#1e5c39] rounded-[10px] px-3.5 py-3 text-[13px] text-left leading-relaxed">
                ✅ Login simulado com sucesso. Em uma implementação real, você seria redirecionado para a sua área
                de cliente.
              </div>
            )}

            <div className="flex items-center gap-2.5 w-full my-5.5 text-ink-300 text-xs font-bold">
              <div className="flex-1 h-px bg-line" />
              ou entre com
              <div className="flex-1 h-px bg-line" />
            </div>

            <div className="flex gap-2.5 w-full justify-center">
              {["G", "f", ""].map((label, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => alert("Simulação: login social não é funcional neste protótipo.")}
                  className="flex-1 h-11 rounded-[10px] border border-line bg-white font-extrabold text-[15px] text-ink-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-100"
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="text-[12.5px] text-ink-500 mt-5">
              Ainda não tem conta?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Simulação: cadastro não é funcional neste protótipo.");
                }}
                className="text-blue-600 font-bold"
              >
                Criar conta
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
