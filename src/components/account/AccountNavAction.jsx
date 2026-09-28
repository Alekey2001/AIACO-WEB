import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Shield,
  Calculator,
  BriefcaseBusiness,
  User,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import UserMenu from './UserMenu'

function renderRoleIcon(role) {
  switch (role) {
    case 'super_admin':
      return (
        <Shield
          size={18}
          strokeWidth={1.7}
        />
      )

    case 'admin_contable':
      return (
        <Calculator
          size={18}
          strokeWidth={1.7}
        />
      )

    case 'trabajador':
      return (
        <BriefcaseBusiness
          size={18}
          strokeWidth={1.7}
        />
      )

    default:
      return (
        <User
          size={18}
          strokeWidth={1.7}
        />
      )
  }
}

export default function AccountNavAction() {
  const navigate = useNavigate()

  const {
    user,
    isAuthenticated,
  } = useAuth()

  const [isOpen, setIsOpen] =
    useState(false)

  const containerRef =
    useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      )
    }
  }, [])

  // ── AUTH/SUPABASE: pendiente de conectar backend — botones ocultos temporalmente ──
  // Reactivar descomentando el bloque de abajo y quitando el "return null" cuando Supabase esté listo.
  if (!isAuthenticated) {
    return null
  }
  /*
  if (!isAuthenticated) {
    return (
      <>
        {/* DESKTOP *\/}
        <div className="hidden md:flex items-center gap-3">

          <button
            onClick={() => navigate('/login')}
            className="whitespace-nowrap rounded-lg px-4 py-2.5 transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.72)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00eefc'
              e.currentTarget.style.borderColor =
                'rgba(0,238,252,0.45)'
              e.currentTarget.style.background =
                'rgba(0,238,252,0.06)'
              e.currentTarget.style.boxShadow =
                '0 0 18px rgba(0,238,252,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color =
                'rgba(255,255,255,0.72)'
              e.currentTarget.style.borderColor =
                'rgba(255,255,255,0.10)'
              e.currentTarget.style.background =
                'transparent'
              e.currentTarget.style.boxShadow =
                'none'
            }}
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => navigate('/register')}
            className="whitespace-nowrap rounded-lg px-4 py-2.5 transition-all duration-300"
            style={{
              background: 'rgba(189,0,255,0.10)',
              border: '1px solid rgba(189,0,255,0.30)',
              color: '#ecb2ff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background =
                'rgba(189,0,255,0.18)'
              e.currentTarget.style.borderColor =
                '#bd00ff'
              e.currentTarget.style.boxShadow =
                '0 0 20px rgba(189,0,255,0.20)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background =
                'rgba(189,0,255,0.10)'
              e.currentTarget.style.borderColor =
                'rgba(189,0,255,0.30)'
              e.currentTarget.style.boxShadow =
                'none'
            }}
          >
            Crear cuenta
          </button>

        </div>

        {/* MOBILE *\/}
        <div
          ref={containerRef}
          className="relative md:hidden"
        >
          <button
            onClick={() => {
              setIsOpen(current => !current)
            }}
            className="rounded-lg px-3 py-2 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.72)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Acceso
          </button>

          {isOpen && (
            <div
              className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-xl"
              style={{
                background: 'rgba(5,10,20,0.96)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                boxShadow: '0 20px 55px rgba(0,0,0,0.50)',
              }}
            >
              <button
                onClick={() => {
                  setIsOpen(false)
                  navigate('/login')
                }}
                className="w-full px-4 py-3 text-left transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                Iniciar sesión
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  navigate('/register')
                }}
                className="w-full px-4 py-3 text-left transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  color: '#ecb2ff',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                Crear cuenta
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
  */

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        onClick={() => {
          setIsOpen(
            current => !current
          )
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
        style={{
          background:
            'rgba(255,255,255,0.035)',

          border:
            '1px solid rgba(255,255,255,0.10)',

          color: '#ffffff',

          boxShadow: isOpen
            ? '0 0 22px rgba(0,238,252,0.18)'
            : 'none',
        }}
        aria-label="Abrir menú de usuario"
      >
        {renderRoleIcon(user.role)}
      </button>

      {isOpen && (
        <UserMenu
          onClose={() => {
            setIsOpen(false)
          }}
        />
      )}

    </div>
  )
}