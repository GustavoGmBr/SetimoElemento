import { Link } from 'react-router-dom'
import Atmosphere from '../components/Atmosphere'
import Emblem from '../components/Emblem'
import ThemeToggle from '../components/ThemeToggle'

/** Provisória: o site público vem depois da área privada. */
export default function Home() {
  return (
    <main className="home-prov">
      <Atmosphere montanhas={300} />
      <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 3 }}>
        <ThemeToggle />
      </div>
      <div className="fi" style={{ position: 'relative', zIndex: 2 }}>
        <Emblem size={84} />
        <h1 className="title" style={{ fontSize: 'clamp(36px, 8vw, 96px)', margin: '28px 0 16px' }}>
          Sétimo Elemento
        </h1>
        <p style={{ fontStyle: 'italic', fontSize: 22, color: 'var(--tx2)', marginBottom: 36 }}>
          A biblioteca do mundo de Erion. Em construção.
        </p>
        <Link to="/admin" className="btn2">
          Área do autor
        </Link>
      </div>
    </main>
  )
}
