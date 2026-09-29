import { useState, useRef, useEffect } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Mail, ArrowRight } from 'lucide-react'
import { FaYoutube, FaInstagram }   from 'react-icons/fa6'
import background from "../../assets/projects/background.svg";

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const formRef    = useRef(null)
  const infoRef    = useRef(null)

  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [sent,    setSent]    = useState(false)
  const [focused, setFocused] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from(infoRef.current, {
        scrollTrigger: { trigger: infoRef.current, start: 'top 85%' },
        x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
        x: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputStyle = (name) => ({
    width: '100%',
    background: 'hsl(var(--secondary))',
    border: '1px solid',
    borderColor: focused === name ? '#9d5cff' : 'hsl(var(--border))',
    borderRadius: 12,
    padding: '12px 16px',
    color: 'hsl(var(--foreground))',
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.3s',
    boxShadow: focused === name ? '0 0 0 3px rgba(157,92,255,0.1)' : 'none',
  })

  return (
    <section ref={sectionRef} id="contacto" className="py-32 px-8 lg:px-16" style={{
        backgroundColor: "#242424",
        backgroundImage: `url(${background})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <div className="max-w-7xl mx-auto">

        <div ref={titleRef} className="mb-16">
          <p className="text-xs font-sora font-semibold uppercase tracking-widest mb-3" style={{ color: '#BD00FF' }}>
            Contacto
          </p>
          <h2 className="font-sora font-bold leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#00E5FF' }}>
            Contáctanos
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          <div ref={infoRef} className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              {[
                { icon: MapPin, text: 'MEXICO CP05880'          },
                { icon: Mail,   text: 'AIACO_E_M_P@hotmail.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{ background: 'rgba(157,92,255,0.08)', border: '1px solid hsl(var(--border))' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(157,92,255,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'hsl(var(--border))'}
                  >
                    <Icon size={16} style={{ color: '#9d5cff' }} />
                  </div>
                  <span className="font-sora text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { icon: FaYoutube,   href: '#', label: 'YouTube'   },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(157,92,255,0.08)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#9d5cff'; e.currentTarget.style.borderColor = 'rgba(157,92,255,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'hsl(var(--muted-foreground))'; e.currentTarget.style.borderColor = 'hsl(var(--border))' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <span className="font-sora font-bold text-4xl text-gradient-aiaco">AIACO</span>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Tu nombre" required style={inputStyle('name')}
                onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
              <input value={form.email} type="email" onChange={e => setForm({...form, email: e.target.value})}
                placeholder="you@company.com" required style={inputStyle('email')}
                onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
            </div>
            <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
              placeholder="Asunto" required style={inputStyle('subject')}
              onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} />
            <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              placeholder="Mensaje" rows={5} required
              style={{ ...inputStyle('message'), resize: 'none' }}
              onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
            <button type="submit"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sora font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(157,92,255,0.4)] self-start w-full sm:w-auto"
             style={{background: 'linear-gradient(90deg,#00E5FF,#00A3FF)',color: '#000000',textShadow: '0 0 20px rgba(0,229,255,0.3)' // Efecto Glow Cian
    }}
            >
              {sent ? '¡Enviado! ✓' : <><span>Enviar Mensaje</span><ArrowRight size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}