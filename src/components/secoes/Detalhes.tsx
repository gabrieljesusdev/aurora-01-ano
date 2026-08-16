import { party } from "@/lib/party-config";
import Revelar from "@/components/ui/Revelar";
import Contagem from "./Contagem";

const cards = [
  {
    emoji: "📅",
    titulo: "Quando",
    linhas: [party.dataLabel, party.horaLabel],
    cor: "from-azul-50 to-azul-100 border-azul-200",
  },
  {
    emoji: "📍",
    titulo: "Onde",
    linhas: [party.local.nome, party.local.endereco],
    cor: "from-rosa-50 to-rosa-100 border-rosa-200",
    link: party.local.mapsUrl,
  },
  {
    emoji: "👕",
    titulo: "Traje sugerido",
    linhas: [party.dressCode],
    cor: "from-verde-50 to-verde-100 border-verde-200",
  },
];

export default function Detalhes() {
  return (
    <section id="detalhes" className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Revelar className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-roxo-400 uppercase">
            Anota na agenda
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold text-tinta sm:text-5xl">
            Falta pouquinho
          </h2>
        </Revelar>

        <Revelar atraso={0.1} className="mt-9">
          <Contagem />
        </Revelar>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Revelar key={c.titulo} atraso={0.12 + i * 0.08}>
              <div
                className={`h-full rounded-[28px] border-2 bg-gradient-to-br p-6 text-center shadow-fofo transition-transform duration-300 hover:-translate-y-1.5 ${c.cor}`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {c.emoji}
                </span>
                <h3 className="mt-2.5 font-display text-lg font-bold text-tinta">
                  {c.titulo}
                </h3>
                {c.linhas.map((l) => (
                  <p key={l} className="mt-1 text-sm leading-snug text-tinta-suave">
                    {l}
                  </p>
                ))}
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-white/80 px-4 py-1.5 font-display text-xs font-semibold text-rosa-500 transition-colors hover:bg-white"
                  >
                    Abrir no mapa →
                  </a>
                )}
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
