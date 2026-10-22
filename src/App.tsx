import { Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import EmConstrucao from './pages/admin/EmConstrucao'
import Login from './pages/admin/Login'
import { MENU } from './pages/admin/menu'

const secoes = MENU.flatMap((g) => g.itens).filter((i) => i.to !== '/admin')

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/login" element={<Navigate to="/admin/login" replace />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {secoes.map((s) => (
            <Route key={s.to} path={s.to.replace('/admin/', '') + '/*'} element={<EmConstrucao />} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
