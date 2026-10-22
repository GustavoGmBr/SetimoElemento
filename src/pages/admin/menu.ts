export interface ItemMenu {
  nome: string
  to: string
  cor: 'fogo' | 'agua' | 'terra' | 'ar' | 'luz' | 'sombra'
  descricao: string
}
export interface GrupoMenu {
  grupo: string
  itens: ItemMenu[]
}

/** Rotas espelham o site atual (mesma API). */
export const MENU: GrupoMenu[] = [
  {
    grupo: 'Início',
    itens: [{ nome: 'Painel', to: '/admin', cor: 'luz', descricao: 'Visão geral do que você criou.' }],
  },
  {
    grupo: 'Narrativa',
    itens: [
      { nome: 'Sagas', to: '/admin/sagas', cor: 'fogo', descricao: 'Crie e organize as sagas.' },
      { nome: 'Livros', to: '/admin/livros', cor: 'agua', descricao: 'Livros de cada saga, capítulos e subcapítulos.' },
    ],
  },
  {
    grupo: 'Mundo de Erion',
    itens: [
      { nome: 'Personagens', to: '/admin/personagens', cor: 'luz', descricao: 'Fichas, formas especiais, históricos e bolsas.' },
      { nome: 'Raças', to: '/admin/racas', cor: 'agua', descricao: 'As linhagens do mundo.' },
      { nome: 'Itens', to: '/admin/itens', cor: 'terra', descricao: 'Armas, artefatos e objetos.' },
      { nome: 'Locais', to: '/admin/locais', cor: 'ar', descricao: 'Continentes, cidades e lugares.' },
      { nome: 'Bestiário', to: '/admin/bestiario', cor: 'sombra', descricao: 'Criaturas místicas e demônios.' },
      { nome: 'Sistemas', to: '/admin/sistemas', cor: 'luz', descricao: 'Regras de poder, aura e magia.' },
    ],
  },
  {
    grupo: 'Ferramentas',
    itens: [
      { nome: 'Calculadora de Ranque', to: '/admin/calculadora/ranque', cor: 'ar', descricao: 'Compare o ranque de dois personagens.' },
    ],
  },
]

export function tituloDaRota(caminho: string): string {
  for (const g of MENU) for (const i of g.itens) if (caminho === i.to) return i.nome
  const achado = MENU.flatMap((g) => g.itens)
    .filter((i) => i.to !== '/admin' && caminho.startsWith(i.to))
    .sort((a, b) => b.to.length - a.to.length)[0]
  return achado ? achado.nome : 'Painel'
}
