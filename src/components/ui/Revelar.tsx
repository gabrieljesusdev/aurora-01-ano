/**
 * Revela o conteúdo ao entrar na tela — 100% CSS, sem JavaScript.
 * Onde o navegador não suporta scroll-driven animations, a animação toca
 * uma vez no carregamento. Em qualquer cenário o conteúdo termina visível.
 */
export default function Revelar({
  children,
  atraso = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Atraso em segundos (só vale no modo de compatibilidade). */
  atraso?: number;
  className?: string;
}) {
  return (
    <div
      className={`revelar ${className}`}
      style={atraso ? ({ "--atraso": `${atraso}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
