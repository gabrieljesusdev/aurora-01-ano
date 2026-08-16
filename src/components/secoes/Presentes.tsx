import { sugestoesDePresente, party } from "@/lib/party-config";
import Revelar from "@/components/ui/Revelar";

const paleta = {
  azul: {
    card: "from-azul-50 to-azul-100 border-azul-200",
    bolha: "bg-azul-200 text-azul-500",
    marcador: "bg-azul-300",
  },
  rosa: {
    card: "from-rosa-50 to-rosa-100 border-rosa-200",
    bolha: "bg-rosa-200 text-rosa-500",
    marcador: "bg-rosa-300",
  },
  roxo: {
    card: "from-roxo-50 to-roxo-100 border-roxo-200",
    bolha: "bg-roxo-200 text-roxo-500",
    marcador: "bg-roxo-300",
  },
  verde: {
    card: "from-verde-50 to-verde-100 border-verde-200",
    bolha: "bg-verde-200 text-verde-500",
    marcador: "bg-verde-300",
  },
} as const;

export default function Presentes() {
  return (
    <section id="presentes" className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Revelar className="mx-auto max-w-xl text-center">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-roxo-400 uppercase">
            Se quiser presentear
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold text-tinta sm:text-5xl">
            Ideias de presente
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-tinta-suave">
            Presente é totalmente opcional — o que a gente mais quer é você lá.
            Mas, se bater vontade, aqui vão algumas ideias que a{" "}
            {party.aniversariante} vai amar.
          </p>
        </Revelar>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {sugestoesDePresente.map((cat, i) => {
            const c = paleta[cat.cor];
            return (
              <Revelar key={cat.id} atraso={i * 0.08}>
                <div
                  className={`h-full rounded-[30px] border-2 bg-gradient-to-br p-6 shadow-fofo transition-transform duration-300 hover:-translate-y-1.5 sm:p-7 ${c.card}`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl ${c.bolha}`}
                      aria-hidden="true"
                    >
                      {cat.emoji}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-tinta">
                        {cat.titulo}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-tinta-suave">
                        {cat.descricao}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {cat.ideias.map((ideia) => (
                      <li key={ideia} className="flex items-start gap-3 text-[15px]">
                        <span
                          className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${c.marcador}`}
                          aria-hidden="true"
                        />
                        <span className="text-tinta">{ideia}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Revelar>
            );
          })}
        </div>

        <Revelar atraso={0.2} className="mt-10">
          <p className="mx-auto max-w-lg rounded-3xl bg-white/70 px-6 py-5 text-center text-sm leading-relaxed text-tinta-suave shadow-fofo backdrop-blur">
            <strong className="font-semibold text-tinta">Dica de amigo:</strong> não
            precisa embrulhar com capricho — a {party.aniversariante} vai querer
            rasgar o papel de qualquer jeito. 🎁
          </p>
        </Revelar>
      </div>
    </section>
  );
}
