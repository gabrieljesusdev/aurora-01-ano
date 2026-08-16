import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "aurora_admin";

function senhaConfigurada() {
  const senha = process.env.ADMIN_PASSWORD;
  if (!senha) {
    throw new Error(
      "ADMIN_PASSWORD não está definida. Adicione ao arquivo .env para usar o painel.",
    );
  }
  return senha;
}

function token(senha: string) {
  return createHash("sha256").update(`aurora::${senha}`).digest("hex");
}

function iguais(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function senhaCorreta(tentativa: string) {
  return iguais(token(tentativa), token(senhaConfigurada()));
}

export async function criarSessao() {
  const jar = await cookies();
  jar.set(COOKIE, token(senhaConfigurada()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function encerrarSessao() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function estaAutenticado() {
  const jar = await cookies();
  const valor = jar.get(COOKIE)?.value;
  if (!valor) return false;
  try {
    return iguais(valor, token(senhaConfigurada()));
  } catch {
    return false;
  }
}
