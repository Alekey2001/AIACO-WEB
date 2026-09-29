import {
  ArrowLeft,
  Shield,
  Calculator,
  BriefcaseBusiness,
  User,
  Users,
  FileText,
  LayoutDashboard,
  Settings,
  LogOut,
  Globe2,
  Activity,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function getRoleConfig(role) {
  switch (role) {
    case 'super_admin':
      return {
        title: 'Panel de Super Administrador',
        subtitle:
          'Control general del ecosistema AIACO, usuarios, contenido y operaciones.',
        visibleRole: 'Super Administrador',
        accent: '#ecb2ff',
        icon: <Shield size={24} strokeWidth={1.7} />,
        actions: [
          {
            title: 'Gestión de usuarios',
            description:
              'Administra usuarios, roles y accesos del sistema.',
            icon: <Users size={22} strokeWidth={1.7} />,
             path: '/admin/users',
          },
          {
  title: 'CMS global',
  description:
    'Administra el contenido editable de los sitios AIACO.',
  icon: <FileText size={22} strokeWidth={1.7} />,
  path: '/admin/content',
},
          {
            title: 'Ecosistema AIACO',
            description:
              'Supervisa Web, Contable, Media y servicios generales.',
            icon: <Globe2 size={22} strokeWidth={1.7} />,
          },
          {
            title: 'Actividad del sistema',
            description:
              'Consulta actividad, cambios y operaciones administrativas.',
            icon: <Activity size={22} strokeWidth={1.7} />,
          },
        ],
      }

    case 'admin_contable':
      return {
        title: 'Panel de Administración Contable',
        subtitle:
          'Gestiona contenido y operaciones relacionadas con AIACO Contable.',
        visibleRole: 'Administrador Contable',
        accent: '#00eefc',
        icon: <Calculator size={24} strokeWidth={1.7} />,
        actions: [
          {
  title: 'Contenido Contable',
  description:
    'Administra textos y contenido autorizado de AIACO Contable.',
  icon: <FileText size={22} strokeWidth={1.7} />,
  path: '/admin/accounting-content',
},
          {
            title: 'Operaciones',
            description:
              'Consulta la actividad relacionada con servicios contables.',
            icon: <Activity size={22} strokeWidth={1.7} />,
          },
        ],
      }

    case 'trabajador':
      return {
        title: 'Panel de Trabajo',
        subtitle:
          'Consulta las operaciones y tareas asignadas dentro de AIACO.',
        visibleRole: 'Trabajador',
        accent: '#ecb2ff',
        icon: <BriefcaseBusiness size={24} strokeWidth={1.7} />,
        actions: [
          {
            title: 'Mis tareas',
            description:
              'Consulta actividades y trabajos asignados.',
            icon: <BriefcaseBusiness size={22} strokeWidth={1.7} />,
          },
          {
            title: 'Actividad',
            description:
              'Consulta el estado de tus operaciones recientes.',
            icon: <Activity size={22} strokeWidth={1.7} />,
          },
        ],
      }

    default:
      return {
        title: 'Mi Panel',
        subtitle:
          'Administra tu cuenta y consulta tus servicios dentro de AIACO.',
        visibleRole: 'Usuario',
        accent: '#00eefc',
        icon: <User size={24} strokeWidth={1.7} />,
        actions: [
          {
            title: 'Mis servicios',
            description:
              'Consulta los servicios asociados a tu cuenta AIACO.',
            icon: <LayoutDashboard size={22} strokeWidth={1.7} />,
          },
          {
            title: 'Mi perfil',
            description:
              'Consulta y administra la información de tu cuenta.',
            icon: <User size={22} strokeWidth={1.7} />,
          },
        ],
      }
  }
}

export default function Panel() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const config = getRoleConfig(user.role)

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
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 550,
          height: 550,
          top: '-20%',
          right: '-10%',
          borderRadius: '50%',
          background: config.accent,
          filter: 'blur(200px)',
          opacity: 0.08,
        }}
      />

      {/* Barra superior */}
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 transition-all duration-300"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.50)',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={17} strokeWidth={1.7} />
          Volver a AIACO
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="rounded-xl px-4 py-2 transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.70)',
            cursor: 'pointer',
          }}
        >
          Mi perfil
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-16">

        {/* Encabezado */}
        <section>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: config.accent,
              fontSize: 10,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
            }}
          >
            AIACO // CONTROL
          </p>

          <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {config.title}
              </h1>

              <p
                className="mt-4 max-w-2xl"
                style={{
                  color: 'rgba(255,255,255,0.40)',
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {config.subtitle}
              </p>
            </div>

            {/* Usuario */}
            <div
              className="flex items-center gap-4 rounded-2xl px-5 py-4"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: `${config.accent}12`,
                  border: `1px solid ${config.accent}30`,
                  color: config.accent,
                }}
              >
                {config.icon}
              </div>

              <div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {user.name}
                </p>

                <p
                  className="mt-1"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: config.accent,
                    fontSize: 9,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                  }}
                >
                  {config.visibleRole}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Separador */}
        <div
          className="my-10 h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
          }}
        />

        {/* Tarjetas */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {config.actions.map((action, index) => (
            <button
            onClick={() => { if (action.path) { navigate(action.path)}}}
              key={action.title}
              className="group text-left rounded-3xl p-6 transition-all duration-300"
              style={{
                minHeight: 220,
                background: 'rgba(255,255,255,0.022)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform =
                  'translateY(-5px)'

                e.currentTarget.style.borderColor =
                  `${config.accent}40`

                e.currentTarget.style.boxShadow =
                  `0 20px 50px rgba(0,0,0,0.35), 0 0 25px ${config.accent}10`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform =
                  'translateY(0)'

                e.currentTarget.style.borderColor =
                  'rgba(255,255,255,0.07)'

                e.currentTarget.style.boxShadow =
                  'none'
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${config.accent}10`,
                  color: config.accent,
                  border: `1px solid ${config.accent}25`,
                }}
              >
                {action.icon}
              </div>

              <p
                className="mt-8"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.14em',
                }}
              >
                MODULE // {String(index + 1).padStart(2, '0')}
              </p>

              <h2
                className="mt-2"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 19,
                  fontWeight: 650,
                }}
              >
                {action.title}
              </h2>

              <p
                className="mt-3"
                style={{
                  color: 'rgba(255,255,255,0.38)',
                  fontSize: 13,
                  lineHeight: 1.65,
                }}
              >
                {action.description}
              </p>
            </button>
          ))}
        </section>

        {/* Estado */}
        <section
          className="mt-7 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          style={{
            background: 'rgba(255,255,255,0.018)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
              }}
            >
              Estado de sesión
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#00eefc',
                  boxShadow:
                    '0 0 10px rgba(0,238,252,0.8)',
                }}
              />

              <span
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 13,
                }}
              >
                Sesión activa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 rounded-xl px-4 py-3"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.60)',
                cursor: 'pointer',
              }}
            >
              <Settings size={17} strokeWidth={1.7} />
              Cuenta
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-4 py-3"
              style={{
                background: 'rgba(255,80,80,0.025)',
                border: '1px solid rgba(255,80,80,0.10)',
                color: 'rgba(255,120,120,0.75)',
                cursor: 'pointer',
              }}
            >
              <LogOut size={17} strokeWidth={1.7} />
              Salir
            </button>
          </div>
        </section>

      </div>
    </main>
  )
}