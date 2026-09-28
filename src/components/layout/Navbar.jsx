import { useState, useEffect } from 'react'
import { Menu, X, CirclePlay } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import AccountNavAction from '../account/AccountNavAction'

const homeLinks = [
  { label: 'Inicio',    href: '#inicio'    },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contacto',  href: '#contacto'  },
]

const sectionIds = ['inicio', 'nosotros', 'servicios', 'portfolio', 'contacto']

export function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active,     setActive]     = useState('inicio')
  const navigate  = useNavigate()
  const location  = useLocation()
  const isHome    = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
      if (!isHome) return
      const bottom  = window.scrollY + window.innerHeight
      const docH    = document.documentElement.scrollHeight
      if (bottom >= docH - 50) { setActive('contacto'); return }
      let cur = 'inicio'
      sectionIds.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - window.innerHeight * 0.4) cur = id
      })
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const handleNav = (href) => {
    setIsOpen(false)
    if (!isHome) { navigate('/'); setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 300) }
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? 'rgba(5,5,7,0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          borderBottom: isScrolled ? '1px solid hsl(var(--border))' : 'none',
        }}
      >
        <div className="relative w-full max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14 py-5 flex items-center justify-between">

        {/* Logo + Videos */}
<div className="flex items-center gap-3">

  {/* Logo */}
  <button
    onClick={() => navigate('/')}
    className="flex items-center group"
  >
    <span
      className="font-sora font-bold text-xl tracking-tight transition-all duration-300"
      style={{ color: '#ffffff' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#bd00ff'
        e.currentTarget.style.textShadow =
          '0 0 20px rgba(189,0,255,0.8)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#ffffff'
        e.currentTarget.style.textShadow = 'none'
      }}
    >
      AI<span>ACO</span>
    </span>
  </button>

  {/* Videos / AIACO Media */}
  <button
    onClick={() => navigate('/youtube')}
    className="hidden md:flex items-center justify-center p-2 rounded-lg transition-all duration-300"
    aria-label="Videos de AIACO"
    title="AIACO Media"
    style={{
      color:
        location.pathname === '/youtube'
          ? '#00d4ff'
          : 'hsl(var(--muted-foreground))',

      background:
        location.pathname === '/youtube'
          ? 'rgba(0,212,255,0.08)'
          : 'transparent',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = '#00d4ff'
      e.currentTarget.style.background =
        'rgba(0,212,255,0.08)'
      e.currentTarget.style.boxShadow =
        '0 0 18px rgba(0,212,255,0.18)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color =
        location.pathname === '/youtube'
          ? '#00d4ff'
          : 'hsl(var(--muted-foreground))'

      e.currentTarget.style.background =
        location.pathname === '/youtube'
          ? 'rgba(0,212,255,0.08)'
          : 'transparent'

      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <CirclePlay
      size={20}
      strokeWidth={1.8}
    />
  </button>

</div>


          {/* Links desktop */}
       {isHome && (
  <ul
    className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
  >
    {homeLinks.map(link => {
      const id = link.href.replace('#', '')
      const isActive = active === id

      return (
        <li key={link.href} className="relative">
          <button
            onClick={() => handleNav(link.href)}
            className="text-sm uppercase tracking-widest transition-colors duration-200 font-sora"
            style={{
              color: isActive
                ? 'hsl(var(--foreground))'
                : 'hsl(var(--muted-foreground))'
            }}
          >
            {link.label}
          </button>

          {isActive && (
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg,#9d5cff,#00d4ff)'
              }}
            />
          )}
        </li>
      )
    })}
  </ul>
)}

{/* Acciones desktop */}
<div className="hidden md:flex items-center gap-3">
  <AccountNavAction />
</div>

      {/* Acciones mobile */}
<div className="md:hidden flex items-center gap-2">

  {/* Botón Videos */}
  <button
    onClick={() => {
      setIsOpen(false)
      navigate('/youtube')
    }}
    className="p-2 rounded-lg transition-all duration-300"
    aria-label="Videos de AIACO"
    style={{
      color:
        location.pathname === '/youtube'
          ? '#00d4ff'
          : 'hsl(var(--muted-foreground))',

      background:
        location.pathname === '/youtube'
          ? 'rgba(0,212,255,0.08)'
          : 'transparent',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = '#00d4ff'
      e.currentTarget.style.background =
        'rgba(0,212,255,0.08)'

      e.currentTarget.style.boxShadow =
        '0 0 18px rgba(0,212,255,0.18)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color =
        location.pathname === '/youtube'
          ? '#00d4ff'
          : 'hsl(var(--muted-foreground))'

      e.currentTarget.style.background =
        location.pathname === '/youtube'
          ? 'rgba(0,212,255,0.08)'
          : 'transparent'

      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <CirclePlay
      size={22}
      strokeWidth={1.8}
    />
  </button>


  {/* Cuenta / Avatar */}
  <AccountNavAction />


  {/* Botón Hamburger */}
  <button
    className="p-2 text-muted-foreground"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Abrir menú"
  >
    {isOpen
      ? <X size={20} />
      : <Menu size={20} />
    }
  </button>

</div>
        </div>
      </nav>

     {/* Mobile menu fullscreen */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(5,5,7,0.98)', backdropFilter: 'blur(24px)' }}
        >
          {homeLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-2xl font-sora font-bold uppercase tracking-widest transition-all duration-300"
              style={{ color: active === link.href.replace('#','') ? '#bd00ff' : 'hsl(var(--muted-foreground))' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#bd00ff'; e.currentTarget.style.textShadow = '0 0 20px rgba(189,0,255,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.color = active === link.href.replace('#','') ? '#bd00ff' : 'hsl(var(--muted-foreground))'; e.currentTarget.style.textShadow = 'none' }}
            >
              {link.label}
            </button>
          ))}

          {/* Botón Empezar Proyecto mobile con glow morado */}
          <button
            onClick={() => { handleNav('#contacto'); setIsOpen(false) }}
            className="mt-4 font-sora font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-lg transition-all duration-300 active:scale-[0.97]"
            style={{ background: 'rgba(189,0,255,0.15)', color: '#bd00ff', border: '1px solid #bd00ff', boxShadow: '0 0 20px rgba(189,0,255,0.3)' }}
            onTouchStart={e => {
              e.currentTarget.style.background = 'rgba(189,0,255,0.3)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(189,0,255,0.6)'
            }}
            onTouchEnd={e => {
              e.currentTarget.style.background = 'rgba(189,0,255,0.15)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(189,0,255,0.3)'
            }}
          >
            Empezar Proyecto
          </button>
        </div>
      )}
    </>
  )
}