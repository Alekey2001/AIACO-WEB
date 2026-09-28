import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { loginDemo } = useAuth()

  const handleDemoLogin = (role) => {
    loginDemo(role)
    navigate('/')
  }

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      style={{
        background:
          'radial-gradient(circle at 50% 35%, #0b1a30 0%, #050b15 45%, #02050a 100%)',
        color: '#ffffff',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '-20%',
          right: '-10%',
          borderRadius: '50%',
          background: '#00eefc',
          filter: 'blur(180px)',
          opacity: 0.08,
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: '-20%',
          left: '-10%',
          borderRadius: '50%',
          background: '#bd00ff',
          filter: 'blur(180px)',
          opacity: 0.08,
        }}
      />

      <button
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 flex items-center gap-2"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.55)',
          cursor: 'pointer',
        }}
      >
        <ArrowLeft size={17} />
        Volver
      </button>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.22em',
              color: '#00eefc',
            }}
          >
            AIACO
          </p>

          <h1
            className="mt-4"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(34px, 6vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.045em',
            }}
          >
            Iniciar sesión
          </h1>

          <p
            className="mt-3"
            style={{
              color: 'rgba(255,255,255,0.40)',
              fontSize: 13,
            }}
          >
            Accede a tu cuenta AIACO.
          </p>
        </div>

        <div
          className="rounded-3xl p-6"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
          }}
        >
          <label
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="usuario@correo.com"
            className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#ffffff',
            }}
          />

          <label
            className="block mt-5"
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Contraseña
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#ffffff',
            }}
          />

          <button
            className="mt-6 w-full rounded-xl py-3"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,238,252,0.85), rgba(189,0,255,0.75))',
              border: 'none',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Ingresar
          </button>
<p
  className="mt-6 text-center"
  style={{
    fontSize: 12,
    color: 'rgba(255,255,255,0.38)',
  }}
>
  ¿No tienes una cuenta?{' '}

  <button
    onClick={() => navigate('/register')}
    style={{
      background: 'transparent',
      border: 'none',
      color: '#00eefc',
      cursor: 'pointer',
    }}
  >
    Crear cuenta
  </button>
</p>
          <div
            className="mt-8 pt-6"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p
              className="mb-4 text-center"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              MODO DESARROLLO
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin('super_admin')}
              >
                Super Admin
              </button>

              <button
                onClick={() => handleDemoLogin('admin_contable')}
              >
                Admin Contable
              </button>

              <button
                onClick={() => handleDemoLogin('trabajador')}
              >
                Trabajador
              </button>

              <button
                onClick={() => handleDemoLogin('cliente')}
              >
                Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}