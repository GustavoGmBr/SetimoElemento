import { useLocation } from 'react-router-dom'
import Ornament from '../../components/Ornament'
import { MENU, tituloDaRota } from './menu'

export default function EmConstrucao() {
  const { pathname } = useLocation()
  const item = MENU.flatMap((g) => g.itens).find((i) => pathname.startsWith(i.to) && i.to !== '/admin')
  return (
    <>
      <div className="kick">Em breve</div>
      <h1 className="adm-h1">{tituloDaRota(pathname)}</h1>
      <Ornament className="" />
      <p className="adm-sub" style={{ marginTop: 28 }}>
        {item?.descricao}
      </p>
      <div className="adm-vazio">Esta área será construída nas próximas etapas.</div>
    </>
  )
}
