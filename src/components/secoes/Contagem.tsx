"use client";

import { AnimatePresence, motion } from "framer-motion";
import { suave } from "@/lib/motion";
import { useSyncExternalStore } from "react";
import { party } from "@/lib/party-config";

type Restante = { dias: number; horas: number; minutos: number; segundos: number };

/* O relógio é um sistema externo: guardamos o instante atual fora do React e
   avisamos a cada segundo. Assim não há setState dentro de efeito. */
let agora = 0;

function assinarRelogio(avisar: () => void) {
  agora = Date.now();
  const id = window.setInterval(() => {
    agora = Date.now();
    avisar();
  }, 1000);
  return () => window.clearInterval(id);
}

const lerAgora = () => agora;
/** No servidor não há relógio ainda — 0 vira o placeholder. */
const lerAgoraNoServidor = () => 0;

function calcular(alvo: number, momento: number): Restante | null {
  const diff = alvo - momento;
  if (diff <= 0) return null;
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

const CORES = [
  "from-azul-100 to-azul-200 text-azul-500",
  "from-rosa-100 to-rosa-200 text-rosa-500",
  "from-roxo-100 to-roxo-200 text-roxo-500",
  "from-verde-100 to-verde-200 text-verde-500",
];

export default function Contagem() {
  const momento = useSyncExternalStore(
    assinarRelogio,
    lerAgora,
    lerAgoraNoServidor,
  );

  // 0 = ainda não montou no cliente; evita divergência de hidratação
  if (momento === 0) {
    return <div className="h-[132px]" aria-hidden="true" />;
  }

  const restante = calcular(new Date(party.dataISO).getTime(), momento);

  if (restante === null) {
    return (
      <p className="font-display text-2xl font-bold text-roxo-500">
        É hoje! 🎉 Corre pra cá!
      </p>
    );
  }

  const blocos = [
    { valor: restante.dias, rotulo: restante.dias === 1 ? "dia" : "dias" },
    { valor: restante.horas, rotulo: "horas" },
    { valor: restante.minutos, rotulo: "min" },
    { valor: restante.segundos, rotulo: "seg" },
  ];

  return (
    <div className="flex justify-center gap-2.5 sm:gap-4">
      {blocos.map((b, i) => (
        <div
          key={b.rotulo}
          className={`w-[74px] rounded-3xl bg-gradient-to-br px-2 py-4 shadow-fofo sm:w-[92px] sm:py-5 ${CORES[i]}`}
        >
          <div className="relative h-9 overflow-hidden sm:h-11">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={b.valor}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.32, ease: suave }}
                className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold tabular-nums sm:text-4xl"
              >
                {String(b.valor).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-1 text-center font-display text-[11px] font-semibold tracking-wider text-tinta-suave uppercase">
            {b.rotulo}
          </p>
        </div>
      ))}
    </div>
  );
}
