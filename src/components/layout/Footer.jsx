import { FaYoutube, FaInstagram } from 'react-icons/fa6'

const footerLinks = [
  { label: 'Inicio',    href: '#inicio'    },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contacto',  href: '#contacto'  },
]

const socialLinks = [
  { icon: FaYoutube,   href: '#', label: 'YouTube'   },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
]

export function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="px-8 lg:px-16 py-12"
      style={{ background: 'hsl(var(--hero-bg))', borderTop: '1px solid hsl(var(--border))' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <span className="font-sora font-semibold text-white">AIACO</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-xs font-sora font-semibold uppercase tracking-widest transition-colors duration-200 text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </button>
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
                className="text-muted-foreground transition-colors duration-200 hover:text-purple"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}