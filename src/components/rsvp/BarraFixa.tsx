"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useRsvp } from "./RsvpProvider";

/** Botão flutuante que aparece depois do hero — o site tem um propósito só. */
export default function BarraFixa() {
  const { abrir, aberto } = useRsvp();
  const { scrollY } = useScroll();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => {
      setVisivel(v > window.innerHeight * 0.85);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visivel && !aberto && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-0 sm:pb-6"
        >
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={abrir}
              className="flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 font-display text-lg font-bold text-white shadow-fofo-lg transition-transform duration-200 active:scale-[0.97]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--color-roxo-400), var(--color-rosa-400) 45%, var(--color-azul-400))",
              }}
            >
              Quero participar
              <span aria-hidden="true">🎈</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
