"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  /** Onde a pupila deve olhar, de -1 a 1 nos dois eixos. */
  olhar?: { x: number; y: number };
};

const PUPILA_ALCANCE = 5;

function usePupila(olhar?: { x: number; y: number }) {
  const reduzir = useReducedMotion();
  if (reduzir || !olhar) return { x: 0, y: 0 };
  return {
    x: olhar.x * PUPILA_ALCANCE,
    y: olhar.y * PUPILA_ALCANCE,
  };
}

/** Monstrinho peludo azul — o grandão carinhoso. */
export function MonstroAzul({ className, olhar }: Props) {
  const p = usePupila(olhar);
  return (
    <svg viewBox="0 0 200 210" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ma-corpo" cx="35%" cy="25%">
          <stop offset="0%" stopColor="#d3f0fd" />
          <stop offset="100%" stopColor="#93d9f4" />
        </radialGradient>
      </defs>
      {/* chifres */}
      <path
        d="M56 46c-6-16-2-30 6-34 5 8 8 20 6 32z"
        fill="#ffc9de"
        stroke="#f987b2"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M144 46c6-16 2-30-6-34-5 8-8 20-6 32z"
        fill="#ffc9de"
        stroke="#f987b2"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* corpo peludo */}
      <path
        d="M100 26c40 0 70 30 70 70 0 14-4 26-11 36l9 12-16 2-2 14-15-8-9 12-11-9-15 10-11-11-14 8-5-13-16 1 6-13c-9-11-14-25-14-41 0-40 30-70 54-70z"
        fill="url(#ma-corpo)"
        stroke="#6ec6e8"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* pintinhas */}
      <circle cx="60" cy="118" r="5" fill="#ded1fb" opacity=".8" />
      <circle cx="140" cy="126" r="4" fill="#ded1fb" opacity=".8" />
      <circle cx="126" cy="150" r="5" fill="#ded1fb" opacity=".7" />
      {/* olhos */}
      <ellipse cx="78" cy="86" rx="19" ry="21" fill="#fff" />
      <ellipse cx="122" cy="86" rx="19" ry="21" fill="#fff" />
      <motion.g animate={p} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
        <circle cx="78" cy="88" r="8.5" fill="#3d3154" />
        <circle cx="122" cy="88" r="8.5" fill="#3d3154" />
        <circle cx="81" cy="85" r="3" fill="#fff" />
        <circle cx="125" cy="85" r="3" fill="#fff" />
      </motion.g>
      {/* sorriso */}
      <path
        d="M80 122q20 20 40 0"
        fill="none"
        stroke="#3d3154"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="56" cy="116" r="8" fill="#ffa8c9" opacity=".55" />
      <circle cx="144" cy="116" r="8" fill="#ffa8c9" opacity=".55" />
    </svg>
  );
}

/** Monstrinho verde de um olho só — o piadista. */
export function MonstroVerde({ className, olhar }: Props) {
  const p = usePupila(olhar);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mv-corpo" cx="35%" cy="28%">
          <stop offset="0%" stopColor="#dcf8e4" />
          <stop offset="100%" stopColor="#94e2ab" />
        </radialGradient>
      </defs>
      {/* antenas */}
      <path d="M74 34 62 12" stroke="#6ed08c" strokeWidth="6" strokeLinecap="round" />
      <path d="M126 34 138 12" stroke="#6ed08c" strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="9" r="7" fill="#ffc9de" />
      <circle cx="140" cy="9" r="7" fill="#ded1fb" />
      {/* corpo */}
      <circle
        cx="100"
        cy="105"
        r="72"
        fill="url(#mv-corpo)"
        stroke="#6ed08c"
        strokeWidth="4"
      />
      {/* olho único */}
      <circle cx="100" cy="94" r="42" fill="#fff" stroke="#6ed08c" strokeWidth="3" />
      <motion.g
        animate={{ x: p.x * 1.6, y: p.y * 1.6 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <circle cx="100" cy="96" r="19" fill="#4aacd4" />
        <circle cx="100" cy="96" r="10" fill="#3d3154" />
        <circle cx="106" cy="89" r="5.5" fill="#fff" />
      </motion.g>
      {/* sorriso */}
      <path
        d="M76 148q24 20 48 0"
        fill="none"
        stroke="#3d3154"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="58" cy="140" r="9" fill="#ffa8c9" opacity=".5" />
      <circle cx="142" cy="140" r="9" fill="#ffa8c9" opacity=".5" />
    </svg>
  );
}

/** Monstrinho roxo de três olhos — o curioso. */
export function MonstroRoxo({ className, olhar }: Props) {
  const p = usePupila(olhar);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mr-corpo" cx="38%" cy="26%">
          <stop offset="0%" stopColor="#efe8ff" />
          <stop offset="100%" stopColor="#c6b2f2" />
        </radialGradient>
      </defs>
      <path
        d="M100 20c38 0 62 28 62 66 0 30-14 52-34 68l4 18-20-8-12 14-12-14-20 8 4-18c-20-16-34-38-34-68 0-38 24-66 62-66z"
        fill="url(#mr-corpo)"
        stroke="#ab92e4"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* listras */}
      <path
        d="M62 108q38 14 76 0"
        stroke="#ded1fb"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M66 128q34 12 68 0"
        stroke="#ded1fb"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* três olhos */}
      <circle cx="72" cy="74" r="15" fill="#fff" />
      <circle cx="100" cy="60" r="17" fill="#fff" />
      <circle cx="128" cy="74" r="15" fill="#fff" />
      <motion.g animate={p} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
        <circle cx="72" cy="76" r="6.5" fill="#3d3154" />
        <circle cx="100" cy="62" r="7.5" fill="#3d3154" />
        <circle cx="128" cy="76" r="6.5" fill="#3d3154" />
      </motion.g>
      <path
        d="M84 96q16 14 32 0"
        fill="none"
        stroke="#3d3154"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Monstrinho rosa fofinho — a menorzinha. */
export function MonstroRosa({ className, olhar }: Props) {
  const p = usePupila(olhar);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mrs-corpo" cx="35%" cy="28%">
          <stop offset="0%" stopColor="#ffe4ef" />
          <stop offset="100%" stopColor="#ffa8c9" />
        </radialGradient>
      </defs>
      {/* orelhinhas */}
      <ellipse cx="52" cy="72" rx="16" ry="24" fill="#ffc9de" stroke="#f987b2" strokeWidth="3" transform="rotate(-20 52 72)" />
      <ellipse cx="148" cy="72" rx="16" ry="24" fill="#ffc9de" stroke="#f987b2" strokeWidth="3" transform="rotate(20 148 72)" />
      <ellipse
        cx="100"
        cy="106"
        rx="62"
        ry="66"
        fill="url(#mrs-corpo)"
        stroke="#f987b2"
        strokeWidth="4"
      />
      {/* laço */}
      <path
        d="M100 40c-12-14-30-10-28 4 2 10 18 12 28 6 10 6 26 4 28-6 2-14-16-18-28-4z"
        fill="#ded1fb"
        stroke="#ab92e4"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="47" r="6" fill="#c6b2f2" />
      {/* olhos */}
      <ellipse cx="80" cy="98" rx="15" ry="17" fill="#fff" />
      <ellipse cx="120" cy="98" rx="15" ry="17" fill="#fff" />
      <motion.g animate={p} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
        <circle cx="80" cy="100" r="7" fill="#3d3154" />
        <circle cx="120" cy="100" r="7" fill="#3d3154" />
        <circle cx="83" cy="97" r="2.5" fill="#fff" />
        <circle cx="123" cy="97" r="2.5" fill="#fff" />
      </motion.g>
      <path
        d="M88 128q12 12 24 0"
        fill="none"
        stroke="#3d3154"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="62" cy="122" r="8" fill="#ec6398" opacity=".35" />
      <circle cx="138" cy="122" r="8" fill="#ec6398" opacity=".35" />
    </svg>
  );
}

/** Portinha do armário — usada como ícone decorativo. */
export function PortaMonstro({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 170" className={className} aria-hidden="true">
      <rect
        x="8"
        y="8"
        width="104"
        height="154"
        rx="14"
        fill="#ffe4ef"
        stroke="#f987b2"
        strokeWidth="5"
      />
      <rect
        x="24"
        y="24"
        width="72"
        height="60"
        rx="8"
        fill="#fff"
        opacity=".55"
      />
      <rect
        x="24"
        y="96"
        width="72"
        height="50"
        rx="8"
        fill="#fff"
        opacity=".55"
      />
      <circle cx="96" cy="92" r="6" fill="#ab92e4" />
    </svg>
  );
}
