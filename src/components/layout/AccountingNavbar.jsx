import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AccountNavAction from '../account/AccountNavAction'

const navLinks = ['Soluciones', 'Precios', 'Proceso', 'FAQ']

export default function AccountingNavbar({ activeSection = '', sectionPrefix = '' }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (<>
<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  style={{
    background: isScrolled ? 'rgba(7,11,20,0.9)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(24px)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
    borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
    boxShadow: isScrolled ? '0 0 15px rgba(236,178,255,0.15)' : 'none',
  }}
>
  <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
    <button onClick={() => navigate('/')} className="font-black text-2xl tracking-tighter"
      style={{ fontFamily: "'Sora', sans-serif", color: '#fbf8fce3', textShadow: '0 0 8px rgba(245, 241, 241, 0.74)' }}>
      AIACO
    </button>
    <div className="hidden md:flex items-center gap-8">
     {navLinks.map((l) => {
  const id = l.toLowerCase()
  const isActive = activeSection === id
  return (
    <a key={l} href={`${sectionPrefix}#${id}`}
      className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
      style={{ fontFamily: "'JetBrains Mono', monospace", color: isActive ? '#00eefc' : 'rgba(212,192,215,0.8)', borderBottom: isActive ? '2px solid #00eefc' : 'none', paddingBottom: isActive ? 4 : 0 }}
      onMouseEnter={e => e.currentTarget.style.color = '#ecb2ff'}
      onMouseLeave={e => e.currentTarget.style.color = isActive ? '#00eefc' : 'rgba(212,192,215,0.8)'}
    >{l}</a>
  )
})}
    </div>
    <div className="flex items-center gap-4">
      <button onClick={() => navigate('/')}
   className="hidden md:inline-flex px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300"
  style={{ borderRadius: 8, background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', fontFamily: "'JetBrains Mono', monospace" }}
  onMouseEnter={e => {
    e.currentTarget.style.background = 'rgba(189,0,255,0.15)'
    e.currentTarget.style.borderColor = '#bd00ff'
    e.currentTarget.style.color = '#bd00ff'
    e.currentTarget.style.boxShadow = '0 0 20px rgba(189,0,255,0.3)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
    e.currentTarget.style.color = '#ffffff'
    e.currentTarget.style.boxShadow = 'none'
  }}>
  Volver
</button>
<div className="hidden md:block">
  <AccountNavAction />
</div>
{/* Acciones mobile */}
<div className="md:hidden flex items-center gap-2">

  {/* Cuenta / Avatar */}
  <AccountNavAction />

  {/* Botón Hamburger */}
  <button
    className="p-2"
    onClick={() => setMenuOpen(!menuOpen)}
    style={{ color: '#dfe2f0' }}
    aria-label="Abrir menú"
  >
    {menuOpen
      ? <X size={20} />
      : <Menu size={20} />
    }
  </button>

</div>
    </div>
  </div>
</nav>
 {menuOpen && (
  <div className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
    style={{ background: 'rgba(7,11,20,0.98)', backdropFilter: 'blur(24px)' }}>
    {navLinks.map((l) => {
  const id = l.toLowerCase()
  const isActive = activeSection === id
  return (
    <a key={l} href={`${sectionPrefix}#${id}`}
      onClick={() => setMenuOpen(false)}
      className="text-2xl font-black uppercase tracking-widest"
      style={{ fontFamily: "'Sora', sans-serif", color: isActive ? '#00eefc' : '#9d8ba0' }}>
      {l}
    </a>
  )
})}
    <button onClick={() => { navigate('/'); setMenuOpen(false) }}
  className="mt-4 px-8 py-3 text-xs font-bold uppercase tracking-widest"
  style={{ borderRadius: 9999, background: 'linear-gradient(135deg, #bd00ff, #00eefc)', color: '#070b14', fontFamily: "'JetBrains Mono', monospace" }}>
  Volver al inicio
</button>

  </div>
)}

</>)
}
