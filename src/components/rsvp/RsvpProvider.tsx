"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import RsvpModal from "./RsvpModal";

type Ctx = { abrir: () => void; fechar: () => void; aberto: boolean };

const RsvpContext = createContext<Ctx | null>(null);

export function useRsvp() {
  const ctx = useContext(RsvpContext);
  if (!ctx) throw new Error("useRsvp precisa estar dentro de <RsvpProvider>");
  return ctx;
}

export default function RsvpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aberto, setAberto] = useState(false);

  const abrir = useCallback(() => setAberto(true), []);
  const fechar = useCallback(() => setAberto(false), []);

  const valor = useMemo(() => ({ abrir, fechar, aberto }), [abrir, fechar, aberto]);

  return (
    <RsvpContext.Provider value={valor}>
      {children}
      <RsvpModal aberto={aberto} aoFechar={fechar} />
    </RsvpContext.Provider>
  );
}
