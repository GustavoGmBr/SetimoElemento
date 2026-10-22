import { useTema } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { tema, setTema } = useTema()
  return (
    <div className="tg" role="group" aria-label="Tema do site">
      <button className="tgb" data-on={tema === 'escuro'} onClick={() => setTema('escuro')}>
        Escuro
      </button>
      <button className="tgb" data-on={tema === 'claro'} onClick={() => setTema('claro')}>
        Claro
      </button>
    </div>
  )
}
