/**
 * Fundo decorativo — só CSS, sem JavaScript e sem estado.
 * Posições fixas de propósito: nada de Math.random para não quebrar
 * a hidratação nem mudar a cada carregamento.
 */

const bolhas = [
  { cor: "var(--color-azul-200)", top: "-8%", left: "-6%", size: 420, dur: 22 },
  { cor: "var(--color-rosa-200)", top: "12%", left: "72%", size: 360, dur: 26 },
  { cor: "var(--color-roxo-200)", top: "48%", left: "-10%", size: 400, dur: 30 },
  { cor: "var(--color-verde-200)", top: "68%", left: "62%", size: 380, dur: 24 },
  { cor: "var(--color-rosa-100)", top: "88%", left: "18%", size: 320, dur: 28 },
];

const confetes = [
  { x: 6, y: 14, s: 10, c: "var(--color-rosa-300)", d: 0 },
  { x: 18, y: 62, s: 7, c: "var(--color-azul-300)", d: 1.2 },
  { x: 27, y: 28, s: 12, c: "var(--color-verde-300)", d: 2.4 },
  { x: 38, y: 78, s: 8, c: "var(--color-roxo-300)", d: 0.6 },
  { x: 47, y: 12, s: 9, c: "var(--color-rosa-300)", d: 3.1 },
  { x: 58, y: 52, s: 11, c: "var(--color-azul-300)", d: 1.8 },
  { x: 67, y: 86, s: 7, c: "var(--color-verde-300)", d: 2.7 },
  { x: 76, y: 22, s: 10, c: "var(--color-roxo-300)", d: 0.9 },
  { x: 85, y: 66, s: 8, c: "var(--color-rosa-300)", d: 3.6 },
  { x: 93, y: 38, s: 12, c: "var(--color-azul-300)", d: 1.5 },
  { x: 12, y: 92, s: 9, c: "var(--color-roxo-300)", d: 2.1 },
  { x: 88, y: 8, s: 7, c: "var(--color-verde-300)", d: 4 },
];

export default function Fundo() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-azul-50 via-creme to-rosa-50" />

      {bolhas.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: b.cor,
            opacity: 0.5,
            animation: `vagar ${b.dur}s ease-in-out infinite`,
          }}
        />
      ))}

      {confetes.map((c, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.s,
            height: c.s,
            backgroundColor: c.c,
            opacity: 0.4,
            animation: `piscar ${7 + (i % 4)}s ease-in-out ${c.d}s infinite`,
          }}
        />
      ))}

      <div className="textura-pelo absolute inset-0 opacity-[0.035] mix-blend-multiply" />
    </div>
  );
}
