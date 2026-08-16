"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { suave } from "@/lib/motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { criarRsvp, type RsvpResult } from "@/app/actions";
import { anfitrioes, anfitriaoLabel, party } from "@/lib/party-config";
import { Botao, CampoTexto, Progresso } from "@/components/ui/Campos";
import Confete from "@/components/ui/Confete";
import { MonstroRosa, MonstroVerde } from "@/components/Monstrinhos";

type Acompanhante = { key: string; nome: string; idade: string };

const TOTAL_ETAPAS = 3;
const TITULOS = [
  "Como podemos te chamar?",
  "Quem vem com você?",
  "Quem te convidou?",
];
const SUBTITULOS = [
  "É só o seu nome — leva 5 segundos 💜",
  "Adicione o nome e a idade de cada acompanhante.",
  "Assim sabemos por onde o convite chegou até você.",
];

let contador = 0;
const novaChave = () => `a${++contador}`;

export default function RsvpModal({
  aberto,
  aoFechar,
}: {
  aberto: boolean;
  aoFechar: () => void;
}) {
  const reduzir = useReducedMotion();
  const tituloId = useId();

  const [etapa, setEtapa] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [nome, setNome] = useState("");
  const [acompanhantes, setAcompanhantes] = useState<Acompanhante[]>([]);
  const [convidadoPor, setConvidadoPor] = useState<string | null>(null);
  const [outro, setOutro] = useState("");
  const [recado, setRecado] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  /** chave do acompanhante recém-criado, para receber o foco */
  const [chaveNova, setChaveNova] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<RsvpResult | null>(null);

  const painelRef = useRef<HTMLDivElement>(null);
  const primeiroCampoRef = useRef<HTMLInputElement>(null);
  const concluido = resultado?.ok === true;

  const totalPessoas = 1 + acompanhantes.filter((a) => a.nome.trim()).length;

  /* ------------------------------- reset ------------------------------- */
  const reiniciar = useCallback(() => {
    setEtapa(0);
    setDirecao(1);
    setNome("");
    setAcompanhantes([]);
    setConvidadoPor(null);
    setOutro("");
    setRecado("");
    setErros({});
    setChaveNova(null);
    setEnviando(false);
    setResultado(null);
  }, []);

  const fechar = useCallback(() => {
    aoFechar();
    // espera a animação de saída antes de zerar o formulário
    window.setTimeout(reiniciar, 350);
  }, [aoFechar, reiniciar]);

  /* --------------------- teclado + trava de rolagem -------------------- */
  useEffect(() => {
    if (!aberto) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", onKey);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflowAnterior;
    };
  }, [aberto, fechar]);

  /* ------------------- foco automático a cada etapa -------------------- */
  useEffect(() => {
    if (!aberto || concluido) return;
    const t = window.setTimeout(() => primeiroCampoRef.current?.focus(), 380);
    return () => window.clearTimeout(t);
  }, [aberto, etapa, concluido]);

  /* ----------------------------- validação ----------------------------- */
  function validarEtapa(indice: number): boolean {
    const novos: Record<string, string> = {};

    if (indice === 0 && nome.trim().length < 2) {
      novos.nome = "Escreve seu nome pra gente 🙂";
    }

    if (indice === 1) {
      acompanhantes.forEach((a, i) => {
        const nome = a.nome.trim();
        const idade = a.idade.trim();
        // linha totalmente em branco é descartada, não é erro
        if (!nome && !idade) return;

        if (!nome) novos[`ac-${i}`] = "Faltou o nome dessa pessoa";
        else if (nome.length < 2) novos[`ac-${i}`] = "Nome muito curtinho";
        else if (!idade) novos[`ac-${i}`] = "Falta a idade dessa pessoa";
      });
    }

    if (indice === 2) {
      if (!convidadoPor) novos.convidadoPor = "Escolhe uma das opções 💜";
      else if (convidadoPor === "Outro" && outro.trim().length < 2) {
        novos.outro = "Conta pra gente quem foi";
      }
    }

    setErros(novos);
    return Object.keys(novos).length === 0;
  }

  function avancar() {
    if (!validarEtapa(etapa)) return;
    if (etapa === 1) {
      // limpa linhas totalmente vazias antes de seguir
      setAcompanhantes((lista) =>
        lista.filter((a) => a.nome.trim() || a.idade.trim()),
      );
    }
    setDirecao(1);
    setEtapa((e) => Math.min(e + 1, TOTAL_ETAPAS - 1));
  }

  function voltar() {
    setErros({});
    setDirecao(-1);
    setEtapa((e) => Math.max(e - 1, 0));
  }

  /* ------------------------------ envio -------------------------------- */
  async function enviar() {
    if (!validarEtapa(2)) return;
    setEnviando(true);

    const payload = {
      name: nome.trim(),
      companions: acompanhantes
        .filter((a) => a.nome.trim())
        .map((a) => ({ name: a.nome.trim(), age: Number(a.idade) })),
      invitedBy: convidadoPor!,
      invitedByOther: convidadoPor === "Outro" ? outro.trim() : null,
      message: recado.trim() || null,
    };

    const r = await criarRsvp(payload);
    setEnviando(false);
    setResultado(r);
    if (!r.ok && r.campos) {
      setErros({ envio: r.erro });
    } else if (!r.ok) {
      setErros({ envio: r.erro });
    }
  }

  /* ------------------------- ações da lista ---------------------------- */
  function adicionar() {
    const chave = novaChave();
    setAcompanhantes((l) => [...l, { key: chave, nome: "", idade: "" }]);
    setChaveNova(chave);
  }

  function remover(key: string) {
    setAcompanhantes((l) => l.filter((a) => a.key !== key));
  }

  function atualizar(key: string, campo: "nome" | "idade", valor: string) {
    setAcompanhantes((l) =>
      l.map((a) => (a.key === key ? { ...a, [campo]: valor } : a)),
    );
  }

  /* ----------------------------- animação ------------------------------ */
  const slide = {
    entrada: (d: number) => ({ x: reduzir ? 0 : d * 48, opacity: 0 }),
    centro: { x: 0, opacity: 1 },
    saida: (d: number) => ({ x: reduzir ? 0 : d * -48, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {aberto && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* fundo */}
          <motion.div
            className="absolute inset-0 bg-tinta/35 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={fechar}
          />

          {/* painel */}
          <motion.div
            ref={painelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            className="rolagem-fofa relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-[36px] bg-white shadow-fofo-lg sm:max-h-[88vh] sm:rounded-[36px]"
            initial={{ y: reduzir ? 0 : 60, opacity: 0, scale: reduzir ? 1 : 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: reduzir ? 0 : 40, opacity: 0, scale: reduzir ? 1 : 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="faixa-portas h-2 w-full shrink-0" />

            {concluido ? (
              <TelaSucesso
                nome={nome}
                totalPessoas={
                  resultado.ok ? resultado.totalPessoas : totalPessoas
                }
                aoFechar={fechar}
              />
            ) : (
              <>
                {/* cabeçalho */}
                <div className="sticky top-0 z-10 shrink-0 bg-white/95 px-6 pt-5 pb-4 backdrop-blur sm:px-8">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="font-display text-xs font-semibold tracking-wider text-roxo-400 uppercase">
                      Passo {etapa + 1} de {TOTAL_ETAPAS}
                    </span>
                    <button
                      type="button"
                      onClick={fechar}
                      aria-label="Fechar formulário"
                      className="grid h-9 w-9 place-items-center rounded-full text-tinta-suave transition-colors hover:bg-roxo-50 hover:text-roxo-500"
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M5 5l10 10M15 5L5 15"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <Progresso etapa={etapa} total={TOTAL_ETAPAS} />
                </div>

                {/* corpo */}
                <div className="flex-1 px-6 pb-2 sm:px-8">
                  <AnimatePresence mode="wait" custom={direcao} initial={false}>
                    <motion.div
                      key={etapa}
                      custom={direcao}
                      variants={slide}
                      initial="entrada"
                      animate="centro"
                      exit="saida"
                      transition={{ duration: 0.28, ease: suave }}
                    >
                      <h2
                        id={tituloId}
                        className="font-display text-2xl leading-tight font-bold text-tinta sm:text-[28px]"
                      >
                        {TITULOS[etapa]}
                      </h2>
                      <p className="mt-1.5 mb-6 text-[15px] text-tinta-suave">
                        {SUBTITULOS[etapa]}
                      </p>

                      {etapa === 0 && (
                        <EtapaNome
                          ref={primeiroCampoRef}
                          valor={nome}
                          aoMudar={setNome}
                          erro={erros.nome}
                          aoEnviar={avancar}
                        />
                      )}

                      {etapa === 1 && (
                        <EtapaAcompanhantes
                          ref={primeiroCampoRef}
                          nome={nome}
                          lista={acompanhantes}
                          erros={erros}
                          total={totalPessoas}
                          chaveNova={chaveNova}
                          aoFocarNova={() => setChaveNova(null)}
                          aoAdicionar={adicionar}
                          aoRemover={remover}
                          aoAtualizar={atualizar}
                        />
                      )}

                      {etapa === 2 && (
                        <EtapaConvite
                          selecionado={convidadoPor}
                          aoSelecionar={(v) => {
                            setConvidadoPor(v);
                            setErros((e) => ({ ...e, convidadoPor: "" }));
                          }}
                          outro={outro}
                          aoMudarOutro={setOutro}
                          recado={recado}
                          aoMudarRecado={setRecado}
                          erros={erros}
                          nome={nome}
                          totalPessoas={totalPessoas}
                          acompanhantes={acompanhantes}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* rodapé */}
                <div className="sticky bottom-0 shrink-0 border-t border-roxo-50 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
                  {erros.envio && (
                    <p
                      role="alert"
                      className="mb-3 rounded-2xl bg-rosa-50 px-4 py-2.5 text-center text-sm font-semibold text-rosa-500"
                    >
                      {erros.envio}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {etapa > 0 && (
                      <Botao variante="fantasma" onClick={voltar} type="button">
                        ← Voltar
                      </Botao>
                    )}
                    <div className="flex-1">
                      {etapa < TOTAL_ETAPAS - 1 ? (
                        <Botao larguraTotal onClick={avancar} type="button">
                          Continuar →
                        </Botao>
                      ) : (
                        <Botao
                          larguraTotal
                          onClick={enviar}
                          disabled={enviando}
                          type="button"
                        >
                          {enviando ? (
                            <>
                              <Girinho /> Entrando na lista…
                            </>
                          ) : (
                            <>🎉 Entrar na lista</>
                          )}
                        </Botao>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ====================================================================== */
/*                                ETAPA 1                                 */
/* ====================================================================== */

const EtapaNome = function EtapaNomeInner({
  ref,
  valor,
  aoMudar,
  erro,
  aoEnviar,
}: {
  ref: React.RefObject<HTMLInputElement | null>;
  valor: string;
  aoMudar: (v: string) => void;
  erro?: string;
  aoEnviar: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        aoEnviar();
      }}
      className="pb-4"
    >
      <CampoTexto
        ref={ref}
        label="Seu nome"
        emoji="✨"
        placeholder="Ex: Maria Fernanda"
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        onKeyDown={(e) => {
          // alguns teclados mobile não disparam o submit implícito
          if (e.key === "Enter") {
            e.preventDefault();
            aoEnviar();
          }
        }}
        erro={erro}
        autoComplete="name"
        enterKeyHint="next"
        maxLength={80}
      />
      <button type="submit" className="sr-only">
        Continuar
      </button>

      <div className="mt-8 flex items-end justify-center gap-3 opacity-90">
        <MonstroVerde className="h-24 w-24 animate-flutuar" />
        <MonstroRosa className="h-20 w-20 animate-flutuar-lento" />
      </div>
    </form>
  );
};

/* ====================================================================== */
/*                                ETAPA 2                                 */
/* ====================================================================== */

function EtapaAcompanhantes({
  ref,
  nome,
  lista,
  erros,
  total,
  chaveNova,
  aoFocarNova,
  aoAdicionar,
  aoRemover,
  aoAtualizar,
}: {
  ref: React.RefObject<HTMLInputElement | null>;
  nome: string;
  lista: Acompanhante[];
  erros: Record<string, string>;
  total: number;
  chaveNova: string | null;
  aoFocarNova: () => void;
  aoAdicionar: () => void;
  aoRemover: (key: string) => void;
  aoAtualizar: (key: string, campo: "nome" | "idade", v: string) => void;
}) {
  return (
    <div className="pb-4">
      {/* contador vivo */}
      <div className="mb-5 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-azul-50 to-roxo-50 px-5 py-4">
        <motion.span
          key={total}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white font-display text-xl font-bold text-roxo-500 shadow-sm"
        >
          {total}
        </motion.span>
        <p className="text-sm leading-snug text-tinta-suave">
          <strong className="font-semibold text-tinta">
            {total === 1 ? "1 pessoa" : `${total} pessoas`}
          </strong>{" "}
          na sua reserva — {nome.trim().split(" ")[0] || "você"}
          {lista.filter((a) => a.nome.trim()).length > 0 &&
            ` + ${lista.filter((a) => a.nome.trim()).length}`}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {lista.map((a, i) => (
          <motion.div
            key={a.key}
            layout
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: suave }}
            className="overflow-hidden"
          >
            <div className="mb-3 rounded-3xl border-2 border-roxo-100 bg-roxo-50/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-xs font-semibold tracking-wide text-roxo-400 uppercase">
                  Acompanhante {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => aoRemover(a.key)}
                  aria-label={`Remover acompanhante ${i + 1}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-tinta-suave transition-colors hover:bg-rosa-100 hover:text-rosa-500"
                >
                  <IconeLixeira />
                  remover
                </button>
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      if (i === 0) ref.current = el;
                      if (el && a.key === chaveNova) {
                        el.focus();
                        aoFocarNova();
                      }
                    }}
                    value={a.nome}
                    onChange={(e) => aoAtualizar(a.key, "nome", e.target.value)}
                    placeholder="Nome"
                    aria-label={`Nome do acompanhante ${i + 1}`}
                    maxLength={60}
                    className="w-full rounded-2xl border-2 border-white bg-white px-4 py-3 text-tinta placeholder:text-tinta-suave/45 outline-none transition-all focus:border-roxo-300"
                  />
                </div>
                <div className="w-24 shrink-0">
                  <input
                    value={a.idade}
                    onChange={(e) =>
                      aoAtualizar(
                        a.key,
                        "idade",
                        e.target.value.replace(/\D/g, "").slice(0, 3),
                      )
                    }
                    placeholder="Idade"
                    inputMode="numeric"
                    required
                    aria-label={`Idade do acompanhante ${i + 1}`}
                    aria-required="true"
                    className="w-full rounded-2xl border-2 border-white bg-white px-4 py-3 text-center text-tinta placeholder:text-tinta-suave/45 outline-none transition-all focus:border-roxo-300"
                  />
                </div>
              </div>
              {erros[`ac-${i}`] && (
                <p role="alert" className="mt-2 text-sm font-semibold text-rosa-500">
                  🙈 {erros[`ac-${i}`]}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {lista.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 rounded-3xl border-2 border-dashed border-roxo-200 px-6 py-7 text-center"
        >
          <span className="text-3xl" aria-hidden="true">
            👋
          </span>
          <p className="mt-2 text-sm text-tinta-suave">
            Por enquanto é só você. Vai levar mais alguém?
          </p>
        </motion.div>
      )}

      <button
        type="button"
        onClick={aoAdicionar}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-roxo-200 bg-white py-3.5 font-display font-semibold text-roxo-500 transition-all hover:border-roxo-300 hover:bg-roxo-50 active:scale-[0.98]"
      >
        <span className="text-lg leading-none">+</span> Adicionar acompanhante
      </button>

      <p className="mt-3 text-center text-xs text-tinta-suave/75">
        Nome e idade de cada acompanhante — é assim que a gente acerta a comida e
        as lembrancinhas 🎁
      </p>
    </div>
  );
}

/* ====================================================================== */
/*                                ETAPA 3                                 */
/* ====================================================================== */

const CORES_CHIP = [
  "from-azul-100 to-azul-200 text-azul-500 border-azul-200",
  "from-rosa-100 to-rosa-200 text-rosa-500 border-rosa-200",
  "from-roxo-100 to-roxo-200 text-roxo-500 border-roxo-200",
  "from-verde-100 to-verde-200 text-verde-500 border-verde-200",
  "from-roxo-50 to-rosa-100 text-tinta-suave border-roxo-200",
];

function EtapaConvite({
  selecionado,
  aoSelecionar,
  outro,
  aoMudarOutro,
  recado,
  aoMudarRecado,
  erros,
  nome,
  totalPessoas,
  acompanhantes,
}: {
  selecionado: string | null;
  aoSelecionar: (v: string) => void;
  outro: string;
  aoMudarOutro: (v: string) => void;
  recado: string;
  aoMudarRecado: (v: string) => void;
  erros: Record<string, string>;
  nome: string;
  totalPessoas: number;
  acompanhantes: Acompanhante[];
}) {
  const opcoes = [...anfitrioes, "Outro"];

  return (
    <div className="pb-4">
      <div
        role="radiogroup"
        aria-label="Quem te convidou"
        className="grid grid-cols-2 gap-2.5"
      >
        {opcoes.map((opcao, i) => {
          const ativo = selecionado === opcao;
          return (
            <button
              key={opcao}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => aoSelecionar(opcao)}
              className={`relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br px-4 py-4 font-display font-semibold transition-all duration-200 active:scale-[0.97] ${
                CORES_CHIP[i]
              } ${
                ativo
                  ? "scale-[1.02] border-transparent shadow-fofo ring-3 ring-roxo-300"
                  : "opacity-90 hover:opacity-100"
              } ${opcao === "Outro" ? "col-span-2" : ""}`}
            >
              {anfitriaoLabel[opcao] ?? opcao}
              {ativo && (
                <motion.span
                  layoutId="check-convite"
                  className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] text-verde-500 shadow"
                >
                  ✓
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {erros.convidadoPor && (
        <p role="alert" className="mt-3 text-sm font-semibold text-rosa-500">
          🙈 {erros.convidadoPor}
        </p>
      )}

      <AnimatePresence initial={false}>
        {selecionado === "Outro" && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.28, ease: suave }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <CampoTexto
                label="Então, quem te convidou?"
                emoji="💌"
                placeholder="Ex: Tia Fernanda"
                value={outro}
                onChange={(e) => aoMudarOutro(e.target.value)}
                erro={erros.outro}
                autoFocus
                maxLength={80}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* resumo */}
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-azul-50 via-roxo-50 to-rosa-50 p-5">
        <p className="mb-3 font-display text-xs font-semibold tracking-wider text-roxo-400 uppercase">
          Confere se está certinho
        </p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-tinta-suave">Nome</dt>
            <dd className="text-right font-semibold text-tinta">
              {nome.trim() || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-tinta-suave">Total de pessoas</dt>
            <dd className="text-right font-semibold text-tinta">
              {totalPessoas}
            </dd>
          </div>
          {acompanhantes.filter((a) => a.nome.trim()).length > 0 && (
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-tinta-suave">Acompanhantes</dt>
              <dd className="text-right font-semibold text-tinta">
                {acompanhantes
                  .filter((a) => a.nome.trim())
                  .map((a) => `${a.nome.trim()} (${a.idade})`)
                  .join(", ")}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* recado opcional */}
      <div className="mt-4">
        <label
          htmlFor="recado"
          className="mb-2 block font-display text-sm font-semibold text-tinta-suave"
        >
          💬 Um recadinho para a {party.aniversariante}{" "}
          <span className="font-normal opacity-70">(opcional)</span>
        </label>
        <textarea
          id="recado"
          value={recado}
          onChange={(e) => aoMudarRecado(e.target.value)}
          rows={2}
          maxLength={300}
          placeholder="Mal posso esperar pra te dar um abraço!"
          className="w-full resize-none rounded-2xl border-2 border-roxo-100 bg-white/80 px-4 py-3 text-tinta placeholder:text-tinta-suave/45 outline-none transition-all hover:border-roxo-200 focus:border-roxo-300 focus:bg-white"
        />
      </div>
    </div>
  );
}

/* ====================================================================== */
/*                               SUCESSO                                  */
/* ====================================================================== */

function TelaSucesso({
  nome,
  totalPessoas,
  aoFechar,
}: {
  nome: string;
  totalPessoas: number;
  aoFechar: () => void;
}) {
  return (
    <div className="relative px-6 py-10 text-center sm:px-10">
      <Confete />

      <motion.div
        initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.05 }}
        className="mx-auto mb-5 w-32"
      >
        <MonstroVerde className="h-32 w-32 animate-flutuar" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="font-display text-3xl font-bold text-tinta"
      >
        Você está na lista!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-tinta-suave"
      >
        Obrigado, <strong className="text-tinta">{nome.trim().split(" ")[0]}</strong>!
        Guardamos <strong className="text-tinta">{totalPessoas}</strong>{" "}
        {totalPessoas === 1 ? "lugar" : "lugares"} pra vocês na festa da{" "}
        {party.aniversariante}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="mx-auto mt-6 max-w-sm rounded-3xl bg-roxo-50 px-5 py-4 text-left"
      >
        <p className="flex items-start gap-2.5 text-sm text-tinta-suave">
          <span className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 animate-pulsar-suave rounded-full bg-rosa-400" />
          <span>
            Seu status agora é <strong className="text-tinta">pendente</strong>. A
            família confirma cada nome e, se precisar de algo, entra em contato com
            você. 💜
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        className="mt-7 space-y-3"
      >
        <Botao larguraTotal onClick={aoFechar}>
          Voltar para o convite
        </Botao>
        <p className="text-xs text-tinta-suave/70">
          {party.dataLabel} · {party.horaLabel} · {party.local.nome}
        </p>
      </motion.div>
    </div>
  );
}

function IconeLixeira() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 5.5h13M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M5.5 5.5l.7 10a1 1 0 0 0 1 .9h5.6a1 1 0 0 0 1-.9l.7-10M8.6 9v4.4M11.4 9v4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Girinho() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
      aria-hidden="true"
    />
  );
}
