import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { estaAutenticado } from "@/lib/auth";
import { STATUS } from "@/lib/rsvp-schema";
import { party } from "@/lib/party-config";
import LoginAdmin from "./LoginAdmin";
import ListaRsvps, { type RsvpItem } from "./ListaRsvps";
import { sair } from "./actions";

export const metadata: Metadata = {
  title: "Painel · Festa da Aurora",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const formatador = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminPage() {
  if (!(await estaAutenticado())) {
    return <LoginAdmin />;
  }

  const rsvps = await prisma.rsvp.findMany({
    orderBy: { createdAt: "desc" },
    include: { companions: { select: { id: true, name: true, age: true } } },
  });

  const itens: RsvpItem[] = rsvps.map((r) => ({
    id: r.id,
    name: r.name,
    invitedBy: r.invitedBy,
    invitedByOther: r.invitedByOther,
    status: r.status,
    message: r.message,
    createdAt: formatador.format(r.createdAt),
    companions: r.companions,
  }));

  const confirmados = rsvps.filter((r) => r.status === STATUS.confirmado);
  const pendentes = rsvps.filter((r) => r.status === STATUS.pendente);
  const pessoas = (lista: typeof rsvps) =>
    lista.reduce((soma, r) => soma + 1 + r.companions.length, 0);

  const cards = [
    {
      rotulo: "Pessoas confirmadas",
      valor: pessoas(confirmados),
      detalhe: `${confirmados.length} reserva(s)`,
      cor: "from-verde-50 to-verde-100 border-verde-200 text-verde-500",
    },
    {
      rotulo: "Pessoas pendentes",
      valor: pessoas(pendentes),
      detalhe: `${pendentes.length} reserva(s)`,
      cor: "from-rosa-50 to-rosa-100 border-rosa-200 text-rosa-500",
    },
    {
      rotulo: "Total na lista",
      valor: pessoas(rsvps),
      detalhe: `${rsvps.length} reserva(s)`,
      cor: "from-roxo-50 to-roxo-100 border-roxo-200 text-roxo-500",
    },
    {
      rotulo: "Crianças (até 12)",
      valor: rsvps.reduce(
        (soma, r) =>
          soma + r.companions.filter((c) => c.age != null && c.age <= 12).length,
        0,
      ),
      detalhe: "entre os acompanhantes",
      cor: "from-azul-50 to-azul-100 border-azul-200 text-azul-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-50 via-creme to-rosa-50 px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-roxo-400 uppercase">
              Painel da família
            </p>
            <h1 className="font-display text-3xl font-bold text-tinta">
              Lista da {party.aniversariante}
            </h1>
          </div>
          <form action={sair}>
            <button className="rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-tinta-suave shadow-fofo transition-colors hover:text-roxo-500">
              Sair
            </button>
          </form>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.rotulo}
              className={`rounded-3xl border-2 bg-gradient-to-br p-4 shadow-fofo ${c.cor}`}
            >
              <p className="font-display text-3xl font-bold tabular-nums">
                {c.valor}
              </p>
              <p className="mt-0.5 text-xs leading-snug font-semibold text-tinta">
                {c.rotulo}
              </p>
              <p className="text-[11px] text-tinta-suave">{c.detalhe}</p>
            </div>
          ))}
        </div>

        <ListaRsvps itens={itens} />
      </div>
    </div>
  );
}
