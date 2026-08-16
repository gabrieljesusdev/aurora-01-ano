"use client";

import { useRsvp } from "./RsvpProvider";

export default function BotaoParticipar({
  tamanho = "grande",
  className = "",
}: {
  tamanho?: "grande" | "medio";
  className?: string;
}) {
  const { abrir } = useRsvp();

  const dims =
    tamanho === "grande"
      ? "px-10 py-5 text-xl sm:px-14 sm:py-6 sm:text-2xl"
      : "px-8 py-4 text-lg";

  return (
    <button
      type="button"
      onClick={abrir}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-display font-bold text-white shadow-fofo-lg transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97] ${dims} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(100deg, var(--color-roxo-400), var(--color-rosa-400) 45%, var(--color-azul-400))",
      }}
    >
      {/* brilho que atravessa o botão */}
      <span
        aria-hidden="true"
        className="brilho-botao pointer-events-none absolute inset-y-0 left-0 w-16 bg-white/25 blur-md"
      />
      <span className="relative">Quero participar</span>
      <span aria-hidden="true" className="relative text-[0.9em] animate-balancar">
        🎈
      </span>
    </button>
  );
}
