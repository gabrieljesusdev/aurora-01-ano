/**
 * Tudo que muda de festa pra festa mora aqui.
 * Edite este arquivo e o site inteiro se atualiza.
 */

export const party = {
  aniversariante: "Aurora Cristina",
  idade: 1,
  /** Data e hora de início, no fuso local. Formato ISO. */
  dataISO: "2026-10-10T15:00:00",
  /** Exibido no card de data. */
  dataLabel: "Sábado, 10 de outubro",
  horaLabel: "A partir das 15h",
  local: {
    nome: "R. Hipólito Trigo Santiago, 99 - Jardim Cruzeiro",
    endereco: "Franco da Rocha - SP, 07804-080",
    /** Deixe vazio ("") para esconder o botão de mapa. */
    mapsUrl:
      "https://maps.google.com/?q=R.+Hip%C3%B3lito+Trigo+Santiago%2C+99+-+Jardim+Cruzeiro%2C+Franco+da+Rocha+-+SP%2C+07804-080",
  },
  dressCode: "Venha colorido! Azul, rosa, roxo ou verde 💜",
  /** Nome do WhatsApp / contato para dúvidas. Deixe vazio para esconder. */
  contato: {
    nome: "Gabriel",
    whatsapp: "5511940865435",
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
