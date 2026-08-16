import Fundo from "@/components/Fundo";
import Hero from "@/components/secoes/Hero";
import Detalhes from "@/components/secoes/Detalhes";
import Presentes from "@/components/secoes/Presentes";
import ChamadaFinal from "@/components/secoes/ChamadaFinal";
import RsvpProvider from "@/components/rsvp/RsvpProvider";
import BarraFixa from "@/components/rsvp/BarraFixa";
import { party } from "@/lib/party-config";

export default function Home() {
  return (
    <RsvpProvider>
      <Fundo />
      <main className="relative">
        <Hero />
        <Detalhes />
        <Presentes />
        <ChamadaFinal />
      </main>

      <footer className="relative px-5 pb-28 text-center sm:pb-16">
        <p className="font-display text-sm text-tinta-suave">
          Feito com 💜 para a {party.aniversariante}
        </p>
        <p className="mt-1 text-xs text-tinta-suave/60">
          {party.dataLabel} · {party.horaLabel}
        </p>
      </footer>

      <BarraFixa />
    </RsvpProvider>
  );
}
