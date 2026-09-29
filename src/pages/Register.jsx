import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-10"
      style={{
        background:
          'radial-gradient(circle at 50% 35%, #0b1a30 0%, #050b15 45%, #02050a 100%)',
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
          filter: 'blur(180px)',
          opacity: 0.08,
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
          filter: 'blur(180px)',
          opacity: 0.08,
        }}
      />

      {/* Volver */}
      <button
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 flex items-center gap-2 transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.55)',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#00eefc'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
        }}
      >
        <ArrowLeft size={17} strokeWidth={1.7} />
        Volver
      </button>

      <div className="relative z-10 w-full max-w-md">

        {/* Encabezado */}
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
            Crear cuenta
          </h1>

          <p
            className="mt-3"
            style={{
              color: 'rgba(255,255,255,0.40)',
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            Crea tu cuenta AIACO para gestionar tus servicios y tu perfil.
          </p>
        </div>

        {/* Formulario */}
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
          {/* Nombre */}
          <label
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Nombre
          </label>

          <input
            type="text"
            placeholder="Tu nombre"
            className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#ffffff',
            }}
          />

          {/* Apellido */}
          <label
            className="block mt-5"
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Apellido
          </label>

          <input
            type="text"
            placeholder="Tu apellido"
            className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#ffffff',
            }}
          />

          {/* Correo */}
          <label
            className="block mt-5"
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

          {/* Contraseña */}
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

          {/* Confirmar contraseña */}
          <label
            className="block mt-5"
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Confirmar contraseña
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

          {/* Crear cuenta */}
          <button
            className="mt-7 w-full rounded-xl py-3 transition-all duration-300"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,238,252,0.85), rgba(189,0,255,0.75))',
              border: 'none',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow =
                '0 0 28px rgba(0,238,252,0.15), 0 0 35px rgba(189,0,255,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Crear cuenta
          </button>

          {/* Separador */}
          <div className="flex items-center gap-3 my-7">
            <div
              className="flex-1 h-px"
              style={{
                background: 'rgba(255,255,255,0.07)',
              }}
            />

            <span
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.30)',
              }}
            >
              o
            </span>

            <div
              className="flex-1 h-px"
              style={{
                background: 'rgba(255,255,255,0.07)',
              }}
            />
          </div>

          {/* Google */}
          <button
            className="w-full rounded-xl py-3 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.78)',
              cursor: 'pointer',
            }}
          >
            Continuar con Google
          </button>

          {/* Ya tiene cuenta */}
          <p
            className="mt-7 text-center"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            ¿Ya tienes una cuenta?{' '}

            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#00eefc',
                cursor: 'pointer',
              }}
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}