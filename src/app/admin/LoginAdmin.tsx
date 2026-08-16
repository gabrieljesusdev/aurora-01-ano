"use client";

import { useActionState } from "react";
import { entrar } from "./actions";
import { Botao } from "@/components/ui/Campos";
import { MonstroRoxo } from "@/components/Monstrinhos";

export default function LoginAdmin() {
  const [estado, acao, pendente] = useActionState(entrar, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        action={acao}
        className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-fofo-lg"
      >
        <MonstroRoxo className="mx-auto h-24 w-24 animate-flutuar" />
        <h1 className="mt-4 font-display text-2xl font-bold text-tinta">
          Painel da festa
        </h1>
        <p className="mt-1.5 mb-6 text-sm text-tinta-suave">
          Só a família passa dessa porta 🚪
        </p>

        <input
          name="senha"
          type="password"
          autoFocus
          placeholder="Senha"
          autoComplete="current-password"
          className="w-full rounded-2xl border-2 border-roxo-100 bg-white px-5 py-3.5 text-center text-lg text-tinta outline-none transition-all focus:border-roxo-300"
        />

        {estado?.erro && (
          <p role="alert" className="mt-3 text-sm font-semibold text-rosa-500">
            🙈 {estado.erro}
          </p>
        )}

        <div className="mt-5">
          <Botao larguraTotal type="submit" disabled={pendente}>
            {pendente ? "Abrindo…" : "Entrar"}
          </Botao>
        </div>
      </form>
    </div>
  );
}
