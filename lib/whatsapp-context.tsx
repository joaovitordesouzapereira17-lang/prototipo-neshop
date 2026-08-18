"use client";

import { createContext, useCallback, useContext, useState } from "react";

type WhatsAppContextValue = {
  isOpen: boolean;
  message: string;
  open: (message?: string) => void;
  close: () => void;
};

const DEFAULT_MESSAGE = "Olá! Preciso de ajuda para encontrar uma peça.";
const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const open = useCallback((msg?: string) => {
    setMessage(msg || DEFAULT_MESSAGE);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WhatsAppContext.Provider value={{ isOpen, message, open, close }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp(): WhatsAppContextValue {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error("useWhatsApp deve ser usado dentro de <WhatsAppProvider>");
  return ctx;
}
