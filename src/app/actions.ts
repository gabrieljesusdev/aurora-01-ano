"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { rsvpSchema, STATUS } from "@/lib/rsvp-schema";

export type RsvpResult =
  | { ok: true; id: string; totalPessoas: number }
  | { ok: false; erro: string; campos?: Record<string, string> };

/**
 * Recebe o formulário multi-etapas e grava a confirmação com status "pendente".
 * O status vira "confirmado" pelo painel /admin.
 */
export async function criarRsvp(payload: unknown): Promise<RsvpResult> {
  const parsed = rsvpSchema.safeParse(payload);

  if (!parsed.success) {
    const campos: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const chave = issue.path.join(".");
      if (chave && !campos[chave]) campos[chave] = issue.message;
    }

    return {
      ok: false,
      erro: "Confere os campos, faltou alguma coisinha 💜",
      campos,
    };
  }

  const { name, companions, invitedBy, invitedByOther, message } = parsed.data;

  try {
    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        invitedBy,
        invitedByOther: invitedBy === "Outro" ? (invitedByOther ?? null) : null,
        message: message?.length ? message : null,
        status: STATUS.pendente,
        companions: {
          create: companions.map((c) => ({ name: c.name, age: c.age })),
        },
      },
      select: { id: true, _count: { select: { companions: true } } },
    });

    revalidatePath("/admin");
    revalidatePath("/");

    return {
      ok: true,
      id: rsvp.id,
      totalPessoas: rsvp._count.companions + 1,
    };
  } catch (error) {
    console.error("[criarRsvp] falha ao gravar RSVP:", error);
    return {
      ok: false,
      erro: "Deu um probleminha aqui do nosso lado. Tenta de novo?",
    };
  }
}
