import axios from 'axios'

export const TOKEN_KEY = '@SetimoElemento:token'
export const USER_KEY = '@SetimoElemento:user'

const baseURL = (
  import.meta.env.VITE_API_URL || 'https://api-livros.setimoelemento.com.br/api'
).replace(/\/+$/, '')

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const isLogin = error.config?.url?.includes('/auth/login')
    if (error.response?.status === 401 && !isLogin && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      if (window.location.pathname !== '/admin/login') window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  },
)

export function mensagemDeErro(error: unknown, padrao: string): string {
  const e = error as { response?: { data?: { message?: string; errors?: string[] } } }
  return e.response?.data?.message || e.response?.data?.errors?.[0] || padrao
}
