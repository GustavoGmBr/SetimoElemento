import { Link } from 'react-router-dom'
import Ornament from '../../components/Ornament'
import { useAuth } from '../../context/AuthContext'
import { MENU } from './menu'

export default function Dashboard() {
  const { usuario } = useAuth()
  const atalhos = MENU.flatMap((g) => g.itens).filter((i) => i.to !== '/admin')
  return (
    <>
      <div className="kick">Bem-vindo de volta</div>
      <h1 className="adm-h1">{usuario?.nome || 'Autor'}</h1>
      <Ornament className="" />
      <p className="adm-sub" style={{ marginTop: 28 }}>
        O que vamos escrever em Erion hoje? Escolha por onde começar.
      </p>
      <div>
        {atalhos.map((i) => (
          <Link key={i.to} to={i.to} className={`adm-row ${i.cor}`}>
            <i className="dot" />
            <span className="t">{i.nome}</span>
            <span className="d">{i.descricao}</span>
            <span className="a">→</span>
          </Link>
        ))}
      </div>
    </>
  )
}
