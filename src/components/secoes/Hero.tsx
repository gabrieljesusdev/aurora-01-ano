"use client";

import { party } from "@/lib/party-config";
import { useOlhar } from "@/hooks/useOlhar";
import BotaoParticipar from "@/components/rsvp/BotaoParticipar";
import {
  MonstroAzul,
  MonstroRosa,
  MonstroRoxo,
  MonstroVerde,
} from "@/components/Monstrinhos";

/** Atraso em cascata, em segundos. */
const atraso = (i: number) => ({ "--atraso": `${0.1 + i * 0.09}s` }) as React.CSSProperties;

export default function Hero() {
  const olhar = useOlhar();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 py-16 text-center">
      {/* monstrinhos decorativos */}
      <div
        className="surgir pointer-events-none absolute top-[7%] left-[3%] w-16 sm:top-[14%] sm:left-[4%] sm:w-28 lg:left-[10%] lg:w-36"
        style={atraso(3)}
      >
        <div className="animate-flutuar">
          <MonstroAzul className="h-auto w-full drop-shadow-lg" olhar={olhar} />
        </div>
      </div>

      <div
        className="surgir pointer-events-none absolute top-[11%] right-[3%] w-14 sm:top-[20%] sm:right-[5%] sm:w-24 lg:right-[12%] lg:w-28"
        style={atraso(4)}
      >
        <div className="animate-flutuar-lento">
          <MonstroVerde className="h-auto w-full drop-shadow-lg" olhar={olhar} />
        </div>
      </div>

      <div
        className="surgir pointer-events-none absolute bottom-[6%] left-[5%] w-12 sm:bottom-[12%] sm:left-[8%] sm:w-20 lg:left-[16%] lg:w-24"
        style={atraso(5)}
      >
        <div className="animate-balancar">
          <MonstroRoxo className="h-auto w-full drop-shadow-lg" olhar={olhar} />
        </div>
      </div>

      <div
        className="surgir pointer-events-none absolute right-[5%] bottom-[6%] w-14 sm:right-[8%] sm:bottom-[16%] sm:w-24 lg:right-[18%] lg:w-28"
        style={atraso(6)}
      >
        <div className="animate-flutuar">
          <MonstroRosa className="h-auto w-full drop-shadow-lg" olhar={olhar} />
        </div>
      </div>

      {/* conteúdo */}
      <div className="relative z-10 mx-auto max-w-2xl">
        <p
          className="surgir mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-5 py-2 font-display text-xs font-semibold tracking-[0.18em] text-roxo-500 uppercase shadow-sm backdrop-blur"
          style={atraso(0)}
        >
          <span className="inline-block h-2 w-2 animate-pulsar-suave rounded-full bg-verde-400" />
          Você foi convidado
        </p>

        <p
          className="surgir font-display text-lg font-medium text-tinta-suave sm:text-xl"
          style={atraso(1)}
        >
          A porta do armário vai se abrir para
        </p>

        <h1
          className="texto-arco-iris surgir font-display text-[4.2rem] leading-[0.92] font-bold tracking-tight sm:text-[6rem] lg:text-[7.5rem]"
          style={atraso(2)}
        >
          {party.aniversariante}
        </h1>

        <div
          className="surgir mt-4 flex items-center justify-center gap-3"
          style={atraso(3)}
        >
          <span className="h-px w-10 bg-roxo-200" />
          <p className="font-display text-xl font-semibold text-tinta sm:text-2xl">
            {party.idade} aninho de muita bagunça
          </p>
          <span className="h-px w-10 bg-roxo-200" />
        </div>

        <p
          className="surgir mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-tinta-suave"
          style={atraso(4)}
        >
          Uma festa cheia de monstrinhos fofos esperando por você. Sem sustos —
          só risada, bolo e abraço apertado.
        </p>

        <div className="surgir mt-9" style={atraso(5)}>
          <BotaoParticipar />
          <p className="mt-3.5 text-sm text-tinta-suave/80">
            Leva menos de 1 minuto ⏱️
          </p>
        </div>
      </div>

      {/* seta de rolagem */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <a
          href="#detalhes"
          aria-label="Ver detalhes da festa"
          className="surgir block text-roxo-300"
          style={{ "--atraso": "1.6s" } as React.CSSProperties}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-cair-suave"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
