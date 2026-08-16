"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { STATUS, type Status } from "@/lib/rsvp-schema";
import {
  criarSessao,
  encerrarSessao,
  estaAutenticado,
  senhaCorreta,
} from "@/lib/auth";

export async function entrar(
  _anterior: { erro?: string } | null,
  formData: FormData,
): Promise<{ erro?: string }> {
  const senha = String(formData.get("senha") ?? "");

  if (!senha) return { erro: "Digite a senha" };

  try {
    if (!senhaCorreta(senha)) return { erro: "Senha incorreta" };
  } catch (e) {
    return { erro: (e as Error).message };
  }

  await criarSessao();
  revalidatePath("/admin");
  return {};
}

export async function sair() {
  await encerrarSessao();
  revalidatePath("/admin");
}

async function exigirAdmin() {
  if (!(await estaAutenticado())) {
    throw new Error("Não autorizado");
  }
}

export async function alternarStatus(id: string, atual: string) {
  await exigirAdmin();

  const novo: Status =
    atual === STATUS.confirmado ? STATUS.pendente : STATUS.confirmado;

  await prisma.rsvp.update({ where: { id }, data: { status: novo } });
  revalidatePath("/admin");
  return novo;
}

export async function definirStatus(id: string, status: Status) {
  await exigirAdmin();

  await prisma.rsvp.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}

export async function excluirRsvp(id: string) {
  await exigirAdmin();
  await prisma.rsvp.delete({ where: { id } });
  revalidatePath("/admin");
}
