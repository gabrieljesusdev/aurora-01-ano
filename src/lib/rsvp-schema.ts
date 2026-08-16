import { z } from "zod";
import { anfitrioes } from "./party-config";

const opcoesConvite = [...anfitrioes, "Outro"] as [string, ...string[]];

export const companionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Coloque pelo menos 2 letras")
    .max(60, "Nome muito longo"),
  age: z
    .number({ message: "Falta a idade" })
    .int("Use um número inteiro")
    .min(0, "Idade inválida")
    .max(120, "Idade inválida"),
});

export const rsvpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Precisamos do seu nome 🙂")
      .max(80, "Nome muito longo"),
    companions: z
      .array(companionSchema)
      .max(15, "São muitos acompanhantes! Fale direto com a gente 💜"),
    invitedBy: z.enum(opcoesConvite, { message: "Escolha uma opção" }),
    invitedByOther: z.string().trim().max(80).optional().nullable(),
    message: z.string().trim().max(300).optional().nullable(),
  })
  .refine(
    (data) =>
      data.invitedBy !== "Outro" ||
      (data.invitedByOther != null && data.invitedByOther.length >= 2),
    {
      message: "Conta pra gente quem te convidou",
      path: ["invitedByOther"],
    },
  );

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type CompanionInput = z.infer<typeof companionSchema>;

export const STATUS = {
  pendente: "pendente",
  confirmado: "confirmado",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
