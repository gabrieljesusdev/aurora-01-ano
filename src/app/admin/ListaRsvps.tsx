"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useTransition } from "react";
import { alternarStatus, excluirRsvp } from "./actions";
import { anfitriaoLabel } from "@/lib/party-config";
import { STATUS } from "@/lib/rsvp-schema";

export type RsvpItem = {
  id: string;
  name: string;
  invitedBy: string;
  invitedByOther: string | null;
  status: string;
  message: string | null;
  createdAt: string;
  companions: { id: string; name: string; age: number | null }[];
};

type Filtro = "todos" | "confirmado" | "pendente";

export default function ListaRsvps({ itens }: { itens: RsvpItem[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [busca, setBusca] = useState("");
  const [pendente, iniciar] = useTransition();
  const [processando, setProcessando] = useState<string | null>(null);

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return itens.filter((r) => {
      if (filtro !== "todos" && r.status !== filtro) return false;
      if (!termo) return true;
      return (
        r.name.toLowerCase().includes(termo) ||
        r.companions.some((c) => c.name.toLowerCase().includes(termo)) ||
        (r.invitedByOther ?? "").toLowerCase().includes(termo) ||
        r.invitedBy.toLowerCase().includes(termo)
      );
    });
  }, [itens, filtro, busca]);

  const contagem = {
    todos: itens.length,
    confirmado: itens.filter((r) => r.status === STATUS.confirmado).length,
    pendente: itens.filter((r) => r.status === STATUS.pendente).length,
  };

  function trocar(r: RsvpItem) {
    setProcessando(r.id);
    iniciar(async () => {
      await alternarStatus(r.id, r.status);
      setProcessando(null);
    });
  }

  function apagar(r: RsvpItem) {
    const nome = r.name;
    if (
      !window.confirm(
        `Remover "${nome}" e ${r.companions.length} acompanhante(s) da lista? Essa ação não pode ser desfeita.`,
      )
    ) {
      return;
    }
    setProcessando(r.id);
    iniciar(async () => {
      await excluirRsvp(r.id);
      setProcessando(null);
    });
  }

  return (
    <div>
      {/* filtros */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          {(["todos", "pendente", "confirmado"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`relative rounded-full px-4 py-2 font-display text-sm font-semibold capitalize transition-colors ${
                filtro === f
                  ? "text-white"
                  : "text-tinta-suave hover:bg-roxo-50 hover:text-roxo-500"
              }`}
            >
              {filtro === f && (
                <motion.span
                  layoutId="pilula-filtro"
                  className="absolute inset-0 rounded-full bg-roxo-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {f} ({contagem[f]})
              </span>
            </button>
          ))}
        </div>

        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome…"
          className="w-full rounded-full border-2 border-roxo-100 bg-white px-5 py-2.5 text-sm text-tinta outline-none transition-all focus:border-roxo-300 sm:ml-auto sm:max-w-xs"
        />
      </div>

      {visiveis.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-roxo-200 py-16 text-center">
          <span className="text-4xl" aria-hidden="true">
            🫥
          </span>
          <p className="mt-3 text-tinta-suave">
            {itens.length === 0
              ? "Ninguém entrou na lista ainda."
              : "Nada por aqui com esse filtro."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {visiveis.map((r) => {
              const confirmado = r.status === STATUS.confirmado;
              const ocupado = pendente && processando === r.id;
              return (
                <motion.li
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: ocupado ? 0.55 : 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                  className={`rounded-[26px] border-2 bg-white p-5 shadow-fofo transition-colors ${
                    confirmado ? "border-verde-200" : "border-roxo-100"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-tinta">
                          {r.name}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-display text-[11px] font-bold tracking-wide uppercase ${
                            confirmado
                              ? "bg-verde-100 text-verde-500"
                              : "bg-rosa-100 text-rosa-500"
                          }`}
                        >
                          {confirmado ? "confirmado" : "pendente"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-tinta-suave">
                        {r.companions.length + 1}{" "}
                        {r.companions.length === 0 ? "pessoa" : "pessoas"} · convite
                        de{" "}
                        <strong className="text-tinta">
                          {r.invitedBy === "Outro"
                            ? (r.invitedByOther ?? "Outro")
                            : (anfitriaoLabel[r.invitedBy] ?? r.invitedBy)}
                        </strong>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => trocar(r)}
                        disabled={ocupado}
                        className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 ${
                          confirmado
                            ? "bg-roxo-50 text-tinta-suave hover:bg-roxo-100"
                            : "bg-verde-200 text-verde-500 hover:bg-verde-300 hover:text-white"
                        }`}
                      >
                        {confirmado ? "↩ Marcar pendente" : "✓ Confirmar"}
                      </button>
                      <button
                        onClick={() => apagar(r)}
                        disabled={ocupado}
                        aria-label={`Remover ${r.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full text-tinta-suave transition-colors hover:bg-rosa-100 hover:text-rosa-500 disabled:opacity-50"
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M4 6h12M8 6V4h4v2m-6 0 1 10h6l1-10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {r.companions.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2 border-t border-roxo-50 pt-3">
                      {r.companions.map((c) => (
                        <li
                          key={c.id}
                          className="rounded-full bg-azul-50 px-3 py-1 text-sm text-tinta"
                        >
                          {c.name}
                          {c.age != null && (
                            <span className="text-tinta-suave"> · {c.age} anos</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {r.message && (
                    <p className="mt-3 rounded-2xl bg-roxo-50 px-4 py-2.5 text-sm text-tinta-suave italic">
                      “{r.message}”
                    </p>
                  )}

                  <p className="mt-3 text-xs text-tinta-suave/60">
                    Entrou em {r.createdAt}
                  </p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
