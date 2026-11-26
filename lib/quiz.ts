/** Banco de perguntas do quiz. `answer` é o índice da opção certa em `options` (a ordem é embaralhada na tela). */
export type Question = {
  question: string;
  options: [string, string, string, string];
  answer: number;
  /** Curiosidade mostrada depois da resposta. */
  fact: string;
};

export const QUESTIONS: Question[] = [
  {
    question: "Qual programa do Office é utilizado principalmente para criar documentos de texto?",
    options: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access"],
    answer: 0,
    fact: "O Word é o editor de texto mais usado do mundo e serve para cartas, relatórios, trabalhos escolares e muito mais.",
  },
  {
    question: "Qual programa é mais indicado para criar planilhas, organizar dados e realizar cálculos?",
    options: ["Microsoft Excel", "Microsoft Word", "Microsoft Outlook", "Microsoft PowerPoint"],
    answer: 0,
    fact: "O Excel organiza informações em linhas e colunas e faz desde somas simples até análises complexas.",
  },
  {
    question: "Para criar uma apresentação de slides para um trabalho escolar, qual programa você utilizaria?",
    options: ["PowerPoint", "Excel", "Word", "Access"],
    answer: 0,
    fact: "O PowerPoint permite combinar texto, imagens, vídeos e animações em slides.",
  },
  {
    question: "Qual recurso do Excel permite realizar cálculos automaticamente?",
    options: ["Fórmulas", "Corretor ortográfico", "Slides", "Calendário"],
    answer: 0,
    fact: "Toda fórmula no Excel começa com o sinal de igual (=), como em =A1+B1.",
  },
  {
    question: "Qual destas tarefas NÃO é a função principal do Microsoft Word?",
    options: ["Editar vídeos e criar animações", "Escrever cartas e relatórios", "Formatar textos", "Revisar a ortografia"],
    answer: 0,
    fact: "Para editar vídeos existem programas próprios. O Word é feito para trabalhar com texto.",
  },
  {
    question: "Qual programa da Microsoft é utilizado para enviar e receber e-mails?",
    options: ["Outlook", "Excel", "Word", "PowerPoint"],
    answer: 0,
    fact: "Além de e-mails, o Outlook reúne calendário, contatos e tarefas em um só lugar.",
  },
  {
    question: "Qual ferramenta do Word permite verificar erros de ortografia?",
    options: ["Corretor ortográfico", "PowerPoint Designer", "Tabela dinâmica", "Gerenciador de tarefas"],
    answer: 0,
    fact: "O corretor sublinha em vermelho as palavras que ele não reconhece, e em azul os problemas de gramática.",
  },
  {
    question: "Qual programa é utilizado para criar apresentações com textos, imagens e vídeos?",
    options: ["PowerPoint", "Access", "Excel", "Outlook"],
    answer: 0,
    fact: "O PowerPoint também permite aplicar transições entre slides e gravar a apresentação.",
  },
  {
    question: "No Excel, como são chamados os espaços onde inserimos informações em uma planilha?",
    options: ["Células", "Slides", "Páginas", "Parágrafos"],
    answer: 0,
    fact: "Cada célula é identificada pelo cruzamento de uma coluna (letra) com uma linha (número), como A1 ou B7.",
  },
  {
    question: "Qual é a extensão padrão de um documento moderno do Microsoft Word?",
    options: [".docx", ".xlsx", ".pptx", ".mp3"],
    answer: 0,
    fact: "O x no final vem do formato aberto baseado em XML, adotado a partir do Office 2007.",
  },
  {
    question: "O que é possível inserir em uma apresentação do PowerPoint?",
    options: ["Vídeos, imagens e textos", "Apenas texto simples", "Somente números", "Apenas e-mails"],
    answer: 0,
    fact: "Também dá para inserir áudios, gráficos, tabelas e formas para deixar os slides mais atraentes.",
  },
  {
    question: "Qual programa do Office é mais indicado para armazenar e gerenciar bancos de dados?",
    options: ["Microsoft Access", "Microsoft Word", "Microsoft Paint", "Microsoft Outlook"],
    answer: 0,
    fact: "O Access guarda informações em tabelas relacionadas entre si, como em um sistema de cadastro.",
  },
  {
    question: "Qual ferramenta permite criar reuniões e organizar compromissos no Outlook?",
    options: ["Calendário", "Planilhas", "Editor de imagens", "WordArt"],
    answer: 0,
    fact: "No calendário do Outlook dá para convidar pessoas, definir lembretes e marcar eventos recorrentes.",
  },
  {
    question: "Qual é a extensão padrão de uma planilha moderna do Excel?",
    options: [".xlsx", ".docx", ".pdf", ".pptx"],
    answer: 0,
    fact: "Antes do Office 2007, as planilhas do Excel usavam a extensão .xls.",
  },
  {
    question: "O que o Microsoft Word permite inserir em documentos?",
    options: ["Tabelas e imagens", "Somente texto simples", "Apenas vídeos", "Somente fórmulas de banco de dados"],
    answer: 0,
    fact: "Além de tabelas e imagens, o Word aceita gráficos, formas, links e até equações matemáticas.",
  },
];

/** Perguntas por partida, sorteadas do banco acima (cada pessoa recebe uma seleção e ordem diferentes). */
export const ROUND_SIZE = 15;

/** Segundos para responder cada pergunta. */
export const SECONDS = 20;

/** Pontos: 500 por acertar + até 500 pela rapidez. */
export function points(correct: boolean, remaining: number) {
  return correct ? 500 + Math.round(500 * (remaining / SECONDS)) : 0;
}

export const MAX_SCORE = ROUND_SIZE * 1000;

export function rank(correct: number) {
  const total = ROUND_SIZE;
  if (correct >= Math.ceil(total * 0.9)) return { title: "Lenda da Microsoft", line: "Você conhece essa história de cor." };
  if (correct >= Math.ceil(total * 0.7)) return { title: "Especialista", line: "Pouca coisa escapa de você." };
  if (correct >= Math.ceil(total * 0.4)) return { title: "Explorador", line: "Boa base, e agora com umas curiosidades a mais." };
  return { title: "Primeiro boot", line: "Todo mundo começa em algum lugar. Tenta de novo?" };
}