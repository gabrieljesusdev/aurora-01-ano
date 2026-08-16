/**
 * Tudo que muda de festa pra festa mora aqui.
 * Edite este arquivo e o site inteiro se atualiza.
 */

export const party = {
  aniversariante: "Aurora",
  idade: 1,
  /** Data e hora de início, no fuso local. Formato ISO. */
  dataISO: "2026-09-12T16:00:00",
  /** Exibido no card de data. */
  dataLabel: "Sábado, 12 de setembro",
  horaLabel: "16h às 20h",
  local: {
    nome: "Buffet Porta dos Monstros",
    endereco: "Rua das Risadas, 123 — Monstrópolis",
    /** Deixe vazio ("") para esconder o botão de mapa. */
    mapsUrl: "https://maps.google.com/?q=Rua+das+Risadas+123",
  },
  dressCode: "Venha colorido! Azul, rosa, roxo ou verde 💜",
  /** Nome do WhatsApp / contato para dúvidas. Deixe vazio para esconder. */
  contato: {
    nome: "Gabriel",
    whatsapp: "5511999999999",
  },
} as const;

/** Quem pode aparecer na lista de "quem te convidou". */
export const anfitrioes = ["Gabriel", "Jamilly", "Ivone", "Cassia"] as const;

/** Rótulos bonitinhos (com acento) para exibição. */
export const anfitriaoLabel: Record<string, string> = {
  Gabriel: "Gabriel",
  Jamilly: "Jamilly",
  Ivone: "Ivone",
  Cassia: "Cássia",
  Outro: "Outro",
};

export type PresenteCategoria = {
  id: string;
  emoji: string;
  titulo: string;
  descricao: string;
  cor: "azul" | "rosa" | "roxo" | "verde";
  ideias: string[];
};

export const sugestoesDePresente: PresenteCategoria[] = [
  {
    id: "brincar",
    emoji: "🧸",
    titulo: "Pra brincar",
    descricao: "Brinquedos que cabem nas mãozinhas de 1 ano.",
    cor: "azul",
    ideias: [
      "Brinquedos de encaixe e empilhar",
      "Cubo de atividades",
      "Bichinhos de pelúcia macios",
      "Bolas sensoriais texturizadas",
    ],
  },
  {
    id: "crescer",
    emoji: "📚",
    titulo: "Pra crescer",
    descricao: "Coisas que acompanham a Aurora nos próximos meses.",
    cor: "roxo",
    ideias: [
      "Livrinhos de banho ou de tecido",
      "Livros cartonados com texturas",
      "Instrumentos musicais de brinquedo",
      "Quebra-cabeça de encaixe grande",
    ],
  },
  {
    id: "vestir",
    emoji: "👗",
    titulo: "Pra vestir",
    descricao: "Ela está crescendo rápido — tamanhos maiores são bem-vindos!",
    cor: "rosa",
    ideias: [
      "Roupinhas tamanho 18 a 24 meses",
      "Sapatinhos 19/20",
      "Meias antiderrapantes",
      "Pijamas de algodão",
    ],
  },
  {
    id: "dia-a-dia",
    emoji: "🍼",
    titulo: "Pro dia a dia",
    descricao: "Sempre útil, sempre bem-vindo.",
    cor: "verde",
    ideias: [
      "Fraldas tamanho G ou XG",
      "Kit de talheres e pratinhos",
      "Toalhas com capuz",
      "Copo de transição",
    ],
  },
];
