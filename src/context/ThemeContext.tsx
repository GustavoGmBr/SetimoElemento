import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Tema = 'escuro' | 'claro'
const KEY = '@SetimoElemento:tema'

interface Ctx {
  tema: Tema
  setTema: (t: Tema) => void
}
const ThemeCtx = createContext<Ctx | null>(null)

function inicial(): Tema {
  try {
    const salvo = localStorage.getItem(KEY)
    if (salvo === 'claro' || salvo === 'escuro') return salvo
  } catch {
    /* sem storage */
  }
  return 'escuro'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTemaState] = useState<Tema>(inicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    try {
      localStorage.setItem(KEY, tema)
    } catch {
      /* sem storage */
    }
  }, [tema])

  return <ThemeCtx.Provider value={{ tema, setTema: setTemaState }}>{children}</ThemeCtx.Provider>
}

export function useTema() {
  const c = useContext(ThemeCtx)
  if (!c) throw new Error('useTema fora do ThemeProvider')
  return c
}
