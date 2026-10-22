import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Atmosphere from '../../components/Atmosphere'
import Emblem from '../../components/Emblem'
import Ornament from '../../components/Ornament'
import ThemeToggle from '../../components/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import { mensagemDeErro } from '../../services/api'

export default function Login() {
  const { autenticado, entrar } = useAuth()
  const navegar = useNavigate()
  const local = useLocation()
  const destino = (local.state as { de?: string } | null)?.de || '/admin'

  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  if (autenticado) return <Navigate to={destino} replace />

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await entrar(login.trim(), senha)
      navegar(destino, { replace: true })
    } catch (err) {
      setErro(mensagemDeErro(err, 'Não foi possível entrar. Verifique o login e a senha.'))
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="login">
      <Atmosphere montanhas={260} />
      <div className="login-top">
        <ThemeToggle />
      </div>
      <div className="login-box fi">
        <div className="login-ring" aria-hidden="true">
          <div className="r1" />
          <div className="r2" />
          <div className="orb glow" />
          <div className="core">
            <Emblem size={64} />
          </div>
        </div>
        <div className="kick">Área do autor</div>
        <h1 className="title" style={{ fontSize: 40, letterSpacing: 8, marginTop: 14 }}>
          Sétimo Elemento
        </h1>
        <Ornament className="" />
        <form className="login-form" onSubmit={enviar} noValidate>
          <label className="campo">
            <span>Login</span>
            <input
              type="text"
              name="login"
              autoComplete="username"
              placeholder="seu nome de guardião"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              autoFocus
            />
          </label>
          <label className="campo">
            <span>Senha</span>
            <input
              type="password"
              name="senha"
              autoComplete="current-password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          {erro && (
            <p className="erro" role="alert">
              {erro}
            </p>
          )}
          <button className="btn" type="submit" disabled={carregando || !login || !senha}>
            {carregando ? 'Abrindo o portal…' : 'Entrar'}
          </button>
        </form>
        <Link to="/" className="voltar">
          ← Voltar ao site
        </Link>
      </div>
    </main>
  )
}
