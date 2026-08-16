# Aurora faz 1 ano 💜

Site de convite e confirmação de presença para o aniversário de 1 ano da Aurora.
Tema Monstros S.A. em tons pastel de azul, rosa, roxo e verde.

O site tem **um propósito só**: o convidado clica em **"Quero participar"** e
preenche um formulário de 3 passos. Tudo cai num banco de dados com status
`pendente` ou `confirmado`.

---

## Como rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

Para acessar do celular na mesma rede Wi-Fi, use o endereço `Network:` que o
`npm run dev` imprime no terminal (algo como `http://192.168.15.3:3000`) —
**com a porta `:3000`**.

> Em desenvolvimento o Next só libera os arquivos de JavaScript para
> `localhost`. As faixas de IP de rede local já estão liberadas em
> `allowedDevOrigins` no `next.config.ts`; se sua rede usar outra faixa,
> adicione ela lá e reinicie o `npm run dev`.

O conteúdo do convite é renderizado no servidor e animado só com CSS, então ele
aparece mesmo se o JavaScript falhar ou demorar. O formulário, a contagem
regressiva e o painel precisam de JavaScript.

## Painel da família

http://localhost:3000/admin — senha definida em `ADMIN_PASSWORD` no `.env`.

Lá você vê:

- total de pessoas confirmadas, pendentes e na lista
- quantas crianças (até 12 anos) entre os acompanhantes
- cada reserva com acompanhantes, idades, quem convidou e recado
- botão para alternar entre **pendente** e **confirmado**, busca e filtros

## O que editar

| O quê | Onde |
| --- | --- |
| Data, hora, local, traje, contato | `src/lib/party-config.ts` |
| Nomes dos anfitriões do formulário | `src/lib/party-config.ts` → `anfitrioes` |
| Sugestões de presente | `src/lib/party-config.ts` → `sugestoesDePresente` |
| Senha do painel | `.env` → `ADMIN_PASSWORD` |
| Cores do tema | `src/app/globals.css` → bloco `@theme` |

## O formulário

1. **Nome da pessoa** — um campo só, Enter avança.
2. **Acompanhantes** — nome + idade de cada um, contador ao vivo do total.
   Ir sozinho é válido, é só continuar.
3. **Quem convidou** — Gabriel, Jamilly, Ivone, Cássia ou Outro (libera um
   campo de texto). Mostra um resumo e um recado opcional antes de enviar.

Toda confirmação entra como `pendente`. A família confirma pelo painel.

## Banco de dados

SQLite via Prisma, arquivo `dev.db` na raiz.

```bash
npx prisma studio        # ver/editar os dados numa interface
npx prisma migrate dev   # aplicar mudanças no schema
```

Para migrar pra Postgres depois, troque `provider` em `prisma/schema.prisma`,
o adapter em `src/lib/prisma.ts` e a `DATABASE_URL`.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion ·
Prisma 7 + SQLite · Zod
