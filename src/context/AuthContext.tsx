import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { api, TOKEN_KEY, USER_KEY } from '../services/api'

export interface Usuario {
  nome?: string
  login?: string
  [k: string]: unknown
}

interface Ctx {
  usuario: Usuario | null
  autenticado: boolean
  entrar: (login: string, senha: string) => Promise<void>
  sair: () => void
}
const AuthCtx = createContext<Ctx | null>(null)

function usuarioSalvo(): Usuario | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as Usuario) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [usuario, setUsuario] = useState<Usuario | null>(usuarioSalvo)

  const entrar = useCallback(async (login: string, senha: string) => {
    const { data } = await api.post('/auth/login', { login, senha })
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.usuario))
    setToken(data.token)
    setUsuario(data.usuario)
  }, [])

  const sair = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUsuario(null)
  }, [])

  const value = useMemo(
    () => ({ usuario, autenticado: !!token, entrar, sair }),
    [usuario, token, entrar, sair],
  )
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const c = useContext(AuthCtx)
  if (!c) throw new Error('useAuth fora do AuthProvider')
  return c
}
