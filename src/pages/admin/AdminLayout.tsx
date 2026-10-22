import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Emblem from '../../components/Emblem'
import ThemeToggle from '../../components/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import { MENU, tituloDaRota } from './menu'

export default function AdminLayout() {
  const { usuario, sair } = useAuth()
  const [aberto, setAberto] = useState(false)
  const local = useLocation()
  const navegar = useNavigate()

  useEffect(() => setAberto(false), [local.pathname])

  function logout() {
    sair()
    navegar('/admin/login', { replace: true })
  }

  return (
    <div className={`adm${aberto ? ' open' : ''}`}>
      <aside className="adm-side" aria-label="Menu do administrador">
        <Link to="/admin" className="adm-brand">
          <Emblem size={36} />
          <span>
            <b>Sétimo Elemento</b>
            <small>Gerenciamento</small>
          </span>
        </Link>
        <nav>
          {MENU.map((g) => (
            <div key={g.grupo}>
              <div className="adm-grupo">{g.grupo}</div>
              {g.itens.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  end={i.to === '/admin'}
                  className={({ isActive }) => `adm-link ${i.cor}${isActive ? ' on' : ''}`}
                >
                  <i className="dot" />
                  {i.nome}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="adm-foot">
          <div className="adm-user">
            {usuario?.nome || 'Administrador'}
            <small>{usuario?.login || 'Autor'}</small>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            <Link to="/" className="btn2">
              Ver site
            </Link>
            <button className="btn2" onClick={logout}>
              Sair
            </button>
          </div>
        </div>
      </aside>
      <div className="adm-scrim" onClick={() => setAberto(false)} />
      <div className="adm-main">
        <header className="adm-top">
          <button
            className="adm-menu-btn"
            aria-label="Abrir menu"
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
          >
            ☰
          </button>
          <span className="adm-crumb">{tituloDaRota(local.pathname)}</span>
          <ThemeToggle />
        </header>
        <div className="adm-content fi" key={local.pathname}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
