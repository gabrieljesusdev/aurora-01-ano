"use client";

import { motion, useReducedMotion } from "framer-motion";
import { estouro } from "@/lib/motion";

const CORES = [
  "var(--color-azul-300)",
  "var(--color-rosa-300)",
  "var(--color-roxo-300)",
  "var(--color-verde-300)",
  "var(--color-rosa-200)",
];

/** 28 pedacinhos com trajetória fixa — determinístico e leve. */
const PECAS = Array.from({ length: 28 }, (_, i) => {
  const angulo = (i / 28) * Math.PI * 2;
  const forca = 120 + ((i * 37) % 90);
  return {
    x: Math.cos(angulo) * forca,
    y: Math.sin(angulo) * forca - 40,
    rot: ((i * 53) % 360) + 180,
    cor: CORES[i % CORES.length],
    quadrado: i % 3 === 0,
    atraso: (i % 7) * 0.035,
  };
});

export default function Confete() {
  const reduzir = useReducedMotion();
  if (reduzir) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {PECAS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            width: p.quadrado ? 9 : 7,
            height: p.quadrado ? 9 : 12,
            backgroundColor: p.cor,
            borderRadius: p.quadrado ? 2 : 999,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 260],
            opacity: [1, 1, 0],
            scale: 1,
            rotate: p.rot,
          }}
          transition={{
            duration: 1.9,
            delay: p.atraso,
            ease: estouro,
            times: [0, 0.35, 1],
          }}
        />
      ))}
    </div>
  );
}
