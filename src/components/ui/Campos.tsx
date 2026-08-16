"use client";

import { AnimatePresence, motion } from "framer-motion";
import { suave } from "@/lib/motion";
import { forwardRef, useId } from "react";

type CampoTextoProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  dica?: string;
  erro?: string;
  emoji?: string;
};

export const CampoTexto = forwardRef<HTMLInputElement, CampoTextoProps>(
  function CampoTexto({ label, dica, erro, emoji, className = "", ...props }, ref) {
    const id = useId();
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-2 block font-display text-sm font-semibold text-tinta-suave"
        >
          {emoji && <span className="mr-1.5">{emoji}</span>}
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            aria-invalid={!!erro}
            aria-describedby={erro ? `${id}-erro` : dica ? `${id}-dica` : undefined}
            className={`w-full rounded-2xl border-2 bg-white/80 px-5 py-4 text-lg text-tinta placeholder:text-tinta-suave/45 transition-all duration-200 outline-none focus:bg-white ${
              erro
                ? "border-rosa-400 focus:border-rosa-400"
                : "border-roxo-100 hover:border-roxo-200 focus:border-roxo-300 focus:shadow-[0_0_0_5px_rgba(198,178,242,0.28)]"
            } ${className}`}
            {...props}
          />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {erro ? (
            <motion.p
              key="erro"
              id={`${id}-erro`}
              role="alert"
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-rosa-500"
            >
              <span aria-hidden="true">🙈</span>
              {erro}
            </motion.p>
          ) : dica ? (
            <motion.p
              key="dica"
              id={`${id}-dica`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-sm text-tinta-suave/80"
            >
              {dica}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

type BotaoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "primario" | "fantasma" | "suave";
  larguraTotal?: boolean;
};

export function Botao({
  variante = "primario",
  larguraTotal,
  className = "",
  children,
  ...props
}: BotaoProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 active:scale-[0.97]";

  const variantes = {
    primario:
      "bg-gradient-to-r from-roxo-400 via-rosa-400 to-azul-400 px-7 py-4 text-lg text-white shadow-fofo hover:shadow-fofo-lg hover:brightness-105",
    suave:
      "bg-roxo-100 px-6 py-3.5 text-base text-roxo-500 hover:bg-roxo-200",
    fantasma:
      "px-5 py-3.5 text-base text-tinta-suave hover:bg-roxo-50 hover:text-roxo-500",
  } as const;

  return (
    <button
      className={`${base} ${variantes[variante]} ${larguraTotal ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/** Barra de progresso segmentada do formulário. */
export function Progresso({
  etapa,
  total,
}: {
  etapa: number;
  total: number;
}) {
  return (
    <div
      className="flex gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={etapa + 1}
      aria-label={`Passo ${etapa + 1} de ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-2 flex-1 overflow-hidden rounded-full bg-roxo-100"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-roxo-300 to-rosa-300"
            initial={false}
            animate={{ width: i <= etapa ? "100%" : "0%" }}
            transition={{ duration: 0.45, ease: suave }}
          />
        </div>
      ))}
    </div>
  );
}
