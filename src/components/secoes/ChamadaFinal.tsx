"use client";

import { party } from "@/lib/party-config";
import { useOlhar } from "@/hooks/useOlhar";
import BotaoParticipar from "@/components/rsvp/BotaoParticipar";
import { MonstroAzul, MonstroRoxo } from "@/components/Monstrinhos";

export default function ChamadaFinal() {
  const olhar = useOlhar();

  return (
    <section className="relative px-5 py-20 sm:py-28">
      <div className="revelar relative mx-auto max-w-3xl overflow-hidden rounded-[40px] bg-white/80 px-6 py-14 text-center shadow-fofo-lg backdrop-blur-sm sm:px-14 sm:py-16">
        <div className="faixa-portas absolute inset-x-0 top-0 h-2.5" />

        <div className="pointer-events-none absolute bottom-2 left-3 w-24 opacity-80 sm:w-32">
          <div className="animate-flutuar-lento">
            <MonstroAzul className="h-auto w-full" olhar={olhar} />
          </div>
        </div>
        <div className="pointer-events-none absolute right-3 bottom-2 w-20 opacity-80 sm:w-28">
          <div className="animate-flutuar">
            <MonstroRoxo className="h-auto w-full" olhar={olhar} />
          </div>
        </div>

        <div className="relative z-10">
          <span className="text-4xl" aria-hidden="true">
            🚪
          </span>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold text-tinta sm:text-[3.25rem]">
            Vem com a gente?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-tinta-suave">
            Confirmar sua presença ajuda a família a preparar tudo com carinho:
            bolo, lugar na mesa e lembrancinha para cada pessoa.
          </p>

          <div className="mt-9">
            <BotaoParticipar />
          </div>

          {party.contato.whatsapp && (
            <p className="mt-6 text-sm text-tinta-suave">
              Dúvidas? Fala com{" "}
              <a
                href={`https://wa.me/${party.contato.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-roxo-500 underline decoration-roxo-200 decoration-2 underline-offset-4 hover:decoration-roxo-400"
              >
                {party.contato.nome}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
