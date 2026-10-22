import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth() {
  const { autenticado } = useAuth()
  const local = useLocation()
  if (!autenticado) return <Navigate to="/admin/login" replace state={{ de: local.pathname }} />
  return <Outlet />
}
