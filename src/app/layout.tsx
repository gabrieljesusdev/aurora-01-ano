import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { party } from "@/lib/party-config";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: `${party.aniversariante} faz ${party.idade} ano! 💜`,
  description: `Você está convidado para o aniversário de ${party.idade} ano da ${party.aniversariante}. ${party.dataLabel}, ${party.horaLabel}. Confirme sua presença!`,
  openGraph: {
    title: `${party.aniversariante} faz ${party.idade} ano! 💜`,
    description: `Uma festa de monstrinhos esperando por você — ${party.dataLabel}, ${party.horaLabel}.`,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffaf3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
