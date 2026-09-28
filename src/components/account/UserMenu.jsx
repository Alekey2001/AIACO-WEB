import {
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  Shield,
  BriefcaseBusiness,
  Calculator,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function getRoleInfo(role) {
  switch (role) {
    case 'super_admin':
      return {
        label: 'Administrador',
        Icon: Shield,
      }

    case 'admin_contable':
      return {
        label: 'Administrador Contable',
        Icon: Calculator,
      }

    case 'trabajador':
      return {
        label: 'Trabajador',
        Icon: BriefcaseBusiness,
      }

    default:
      return {
        label: 'Usuario',
        Icon: User,
      }
  }
}

export default function UserMenu({
  onClose,
}) {
  const navigate = useNavigate()

  const {
    user,
    logout,
  } = useAuth()

  if (!user) return null

  const {
    label,
    Icon,
  } = getRoleInfo(user.role)

  const handleLogout = () => {
    logout()
    onClose?.()
    navigate('/')
  }

  return (
    <div
      className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl"
      style={{
        background:
          'rgba(5, 10, 20, 0.94)',

        border:
          '1px solid rgba(255,255,255,0.08)',

        boxShadow:
          '0 25px 70px rgba(0,0,0,0.55)',

        backdropFilter:
          'blur(24px)',

        WebkitBackdropFilter:
          'blur(24px)',
      }}
    >
      {/* Usuario */}
      <div
        className="p-5"
        style={{
          borderBottom:
            '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex items-center gap-3">

          <div
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,238,252,0.18), rgba(189,0,255,0.18))',

              border:
                '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <Icon
              size={20}
              strokeWidth={1.7}
            />
          </div>

          <div className="min-w-0">

            <p
              className="truncate"
              style={{
                fontFamily:
                  "'Sora', sans-serif",

                fontSize: 13,

                fontWeight: 600,

                color: '#ffffff',
              }}
            >
              {user.name}
            </p>

            <p
              style={{
                marginTop: 3,

                fontFamily:
                  "'JetBrains Mono', monospace",

                fontSize: 9,

                letterSpacing:
                  '0.12em',

                textTransform:
                  'uppercase',

                color:
                  'rgba(0,238,252,0.70)',
              }}
            >
              {label}
            </p>

          </div>

        </div>

        <p
          className="mt-3 truncate"
          style={{
            fontSize: 11,

            color:
              'rgba(255,255,255,0.35)',
          }}
        >
          {user.email}
        </p>
      </div>


      {/* Opciones */}
      <div className="p-2">

        <button
          onClick={() => {
            onClose?.()
            navigate('/profile')
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300"
          style={{
            background: 'transparent',
            color:
              'rgba(255,255,255,0.65)',
          }}
        >
          <User
            size={17}
            strokeWidth={1.7}
          />

          Mi perfil
        </button>


        <button
          onClick={() => {
            onClose?.()
            navigate('/panel')
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300"
          style={{
            background: 'transparent',
            color:
              'rgba(255,255,255,0.65)',
          }}
        >
          <LayoutDashboard
            size={17}
            strokeWidth={1.7}
          />

          Panel
        </button>


        <button
          onClick={() => {
            onClose?.()
            navigate('/profile')
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300"
          style={{
            background: 'transparent',
            color:
              'rgba(255,255,255,0.65)',
          }}
        >
          <Settings
            size={17}
            strokeWidth={1.7}
          />

          Configuración
        </button>

      </div>


      {/* Cerrar sesión */}
      <div
        className="p-2"
        style={{
          borderTop:
            '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300"
          style={{
            background: 'transparent',

            color:
              'rgba(255,120,140,0.75)',
          }}
        >
          <LogOut
            size={17}
            strokeWidth={1.7}
          />

          Cerrar sesión
        </button>

      </div>
    </div>
  )
}