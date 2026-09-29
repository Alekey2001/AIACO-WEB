import {
  ArrowLeft,
  Shield,
  Calculator,
  BriefcaseBusiness,
  User,
  Mail,
  Settings,
  LayoutDashboard,
  LogOut,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function getRoleInfo(role) {
  switch (role) {
    case 'super_admin':
      return {
        label: 'Super Administrador',
        icon: (
          <Shield
            size={21}
            strokeWidth={1.7}
          />
        ),
        color: '#ecb2ff',
      }

    case 'admin_contable':
      return {
        label: 'Administrador Contable',
        icon: (
          <Calculator
            size={21}
            strokeWidth={1.7}
          />
        ),
        color: '#00eefc',
      }

    case 'trabajador':
      return {
        label: 'Trabajador',
        icon: (
          <BriefcaseBusiness
            size={21}
            strokeWidth={1.7}
          />
        ),
        color: '#ecb2ff',
      }

    default:
      return {
        label: 'Usuario',
        icon: (
          <User
            size={21}
            strokeWidth={1.7}
          />
        ),
        color: '#00eefc',
      }
  }
}

export default function Profile() {
  const navigate = useNavigate()

  const {
    user,
    logout,
  } = useAuth()

  const roleInfo = getRoleInfo(user.role)

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || 'U'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-6 py-10"
      style={{
        background:
          'radial-gradient(circle at 50% 20%, #0b1a30 0%, #050b15 45%, #02050a 100%)',
        color: '#ffffff',
      }}
    >
      {/* Glow cyan */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '-20%',
          right: '-10%',
          borderRadius: '50%',
          background: '#00eefc',
          filter: 'blur(190px)',
          opacity: 0.07,
        }}
      />

      {/* Glow púrpura */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: '-20%',
          left: '-10%',
          borderRadius: '50%',
          background: '#bd00ff',
          filter: 'blur(190px)',
          opacity: 0.07,
        }}
      />

      {/* Volver */}
      <button
        onClick={() => navigate('/')}
        className="relative z-10 flex items-center gap-2 transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.50)',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#00eefc'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color =
            'rgba(255,255,255,0.50)'
        }}
      >
        <ArrowLeft
          size={17}
          strokeWidth={1.7}
        />

        Volver a AIACO
      </button>

      <div className="relative z-10 max-w-5xl mx-auto mt-14">

        {/* Encabezado */}
        <div className="mb-10">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#00eefc',
              fontSize: 10,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
            }}
          >
            AIACO // ACCOUNT
          </p>

          <h1
            className="mt-3"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(36px, 6vw, 58px)',
              fontWeight: 700,
              letterSpacing: '-0.045em',
            }}
          >
            Mi perfil
          </h1>

          <p
            className="mt-3"
            style={{
              color: 'rgba(255,255,255,0.38)',
              fontSize: 14,
            }}
          >
            Administra tu identidad y acceso dentro del ecosistema AIACO.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* Tarjeta perfil */}
          <section
            className="rounded-3xl p-7"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
            }}
          >
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,238,252,0.18), rgba(189,0,255,0.20))',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow:
                  '0 0 30px rgba(0,238,252,0.10)',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              {initial}
            </div>

            <h2
              className="mt-6"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 20,
                fontWeight: 650,
              }}
            >
              {user.name}
            </h2>

            <p
              className="mt-1"
              style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: 12,
              }}
            >
              {user.email}
            </p>

            {/* Rol */}
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-2"
              style={{
                background: `${roleInfo.color}10`,
                border: `1px solid ${roleInfo.color}30`,
                color: roleInfo.color,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {roleInfo.icon}
              {roleInfo.label}
            </div>

            <div
              className="mt-7 h-px"
              style={{
                background: 'rgba(255,255,255,0.07)',
              }}
            />

            {/* Panel */}
            <button
              onClick={() => navigate('/panel')}
              className="mt-5 w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.68)',
                cursor: 'pointer',
              }}
            >
              <LayoutDashboard
                size={18}
                strokeWidth={1.7}
              />

              Ir al panel
            </button>

            {/* Configuración */}
            <button
              className="mt-3 w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
              }}
            >
              <Settings
                size={18}
                strokeWidth={1.7}
              />

              Configuración
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-3 w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300"
              style={{
                background: 'rgba(255,80,80,0.025)',
                border: '1px solid rgba(255,80,80,0.10)',
                color: 'rgba(255,120,120,0.75)',
                cursor: 'pointer',
              }}
            >
              <LogOut
                size={18}
                strokeWidth={1.7}
              />

              Cerrar sesión
            </button>
          </section>

          {/* Información */}
          <section
            className="rounded-3xl p-7 md:p-9"
            style={{
              background: 'rgba(255,255,255,0.018)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.30)',
                  textTransform: 'uppercase',
                }}
              >
                Información personal
              </p>

              <h3
                className="mt-2"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 24,
                  fontWeight: 650,
                }}
              >
                Datos de la cuenta
              </h3>
            </div>

            {/* Nombre */}
            <div
              className="mt-8 rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.022)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-4">

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(189,0,255,0.08)',
                    color: '#ecb2ff',
                  }}
                >
                  <User
                    size={18}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.30)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                    }}
                  >
                    Nombre
                  </p>

                  <p
                    className="mt-1"
                    style={{
                      color: 'rgba(255,255,255,0.80)',
                      fontSize: 14,
                    }}
                  >
                    {user.name}
                  </p>
                </div>

              </div>
            </div>

            {/* Email */}
            <div
              className="mt-4 rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.022)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-4">

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(0,238,252,0.07)',
                    color: '#00eefc',
                  }}
                >
                  <Mail
                    size={18}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.30)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                    }}
                  >
                    Correo electrónico
                  </p>

                  <p
                    className="mt-1"
                    style={{
                      color: 'rgba(255,255,255,0.80)',
                      fontSize: 14,
                    }}
                  >
                    {user.email}
                  </p>
                </div>

              </div>
            </div>

            {/* Rol */}
            <div
              className="mt-4 rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.022)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-4">

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${roleInfo.color}12`,
                    color: roleInfo.color,
                  }}
                >
                  {roleInfo.icon}
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.30)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                    }}
                  >
                    Tipo de cuenta
                  </p>

                  <p
                    className="mt-1"
                    style={{
                      color: roleInfo.color,
                      fontSize: 14,
                    }}
                  >
                    {roleInfo.label}
                  </p>
                </div>

              </div>
            </div>

            {/* Estado */}
            <div
              className="mt-8 rounded-2xl p-5 flex items-center justify-between gap-4"
              style={{
                background: 'rgba(0,238,252,0.025)',
                border: '1px solid rgba(0,238,252,0.10)',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.32)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  Estado de cuenta
                </p>

                <p
                  className="mt-2"
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.70)',
                  }}
                >
                  Sesión activa
                </p>
              </div>

              <div
                className="flex items-center gap-2"
                style={{
                  color: '#00eefc',
                  fontSize: 11,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: '#00eefc',
                    boxShadow:
                      '0 0 10px rgba(0,238,252,0.8)',
                  }}
                />

                Activo
              </div>
            </div>

          </section>

        </div>
      </div>
    </main>
  )
}