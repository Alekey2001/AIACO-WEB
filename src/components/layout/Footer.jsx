import { FaYoutube, FaInstagram } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

const legalLinks = [
  { label: 'Políticas de Privacidad', to: '/politicas-de-privacidad' },
  { label: 'Protocolos de Seguridad', to: '/protocolos-de-seguridad' },
  { label: 'Confidencialidad', to: '/confidencialidad' },
]

const footerLinks = [
  { label: 'Inicio',    href: '#inicio'    },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contacto',  href: '#contacto'  },
]

const socialLinks = [
  { icon: FaYoutube,   href: 'https://www.youtube.com/@AIACO-c3i', label: 'YouTube'   },
  { icon: FaInstagram, href: 'https://www.instagram.com/a_i_a_c_o/', label: 'Instagram' },
]

export function Footer() {
  const { pathname } = useLocation()
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative z-10 px-8 lg:px-16 py-12"
      style={{ background: 'hsl(var(--hero-bg))', borderTop: '1px solid hsl(var(--border))' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <span className="font-sora font-semibold text-white">AIACO</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map(link => (
            <li key={link.href}>
              <Link
                to={`/${link.href}`}
                onClick={event => {
                  if (pathname === '/') {
                    event.preventDefault()
                    handleNav(link.href)
                  }
                }}
                className="text-xs font-sora font-semibold uppercase tracking-widest transition-colors duration-200 text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <p className="text-xs font-sora uppercase tracking-widest text-muted-foreground">
            © AIACO {new Date().getFullYear()}
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label} href={href} aria-label={label}
                target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-200 hover:text-purple"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Información legal" className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10">
        <h2 className="font-sora text-sm font-semibold text-white mb-4">Información legal</h2>
        <ul className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8">
          {legalLinks.map(link => (
            <li key={link.to}>
              <Link to={link.to} className="font-sora text-sm text-muted-foreground hover:text-cyan-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
