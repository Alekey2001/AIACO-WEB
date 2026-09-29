import { useRef, useEffect } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Brain, Shield, Globe, Gamepad2 } from 'lucide-react'
import background from "../../assets/projects/background.svg";
import useContent from '../../content/useContent'
gsap.registerPlugin(ScrollTrigger)




export function Services() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const cardsRef   = useRef([])
const servicesEyebrow = useContent(
  'main_services_eyebrow',
  'Servicios'
)

const servicesTitle = useContent(
  'main_services_title',
  'Nuestros Servicios'
)

const service1Title = useContent(
  'main_service_1_title',
  'Inteligencia Artificial'
)

const service1Description = useContent(
  'main_service_1_description',
  'Soluciones de IA personalizadas para automatizar procesos, analizar datos y potenciar tu negocio con tecnología de vanguardia.'
)

const service2Title = useContent(
  'main_service_2_title',
  'Ciberseguridad'
)

const service2Description = useContent(
  'main_service_2_description',
  'Protección integral para tu infraestructura digital. Auditorías, pentesting y soluciones de seguridad avanzadas.'
)

const service3Title = useContent(
  'main_service_3_title',
  'Sitios Web y Apps'
)

const service3Description = useContent(
  'main_service_3_description',
  'Desarrollo Full Stack moderno. Sitios rápidos, seguros y escalables para empresas y emprendedores.'
)

const service4Title = useContent(
  'main_service_4_title',
  'AIACO GAMES'
)

const service4Description = useContent(
  'main_service_4_description',
  'Desarrollo de videojuegos, modelos 3D y servicios gaming. Llevamos tus ideas al siguiente nivel del entretenimiento digital.'
)

const servicesLearnMore = useContent(
  'main_services_learn_more',
  'Aprender más'
)
const serviceCards = [
  {
    icon: Brain,
    title: service1Title,
    description: service1Description,
    accent: '#9d5cff',
    rgb: '157,92,255',
  },
  {
    icon: Shield,
    title: service2Title,
    description: service2Description,
    accent: '#00d4ff',
    rgb: '0,212,255',
  },
  {
    icon: Globe,
    title: service3Title,
    description: service3Description,
    accent: '#9d5cff',
    rgb: '157,92,255',
  },
  {
    icon: Gamepad2,
    title: service4Title,
    description: service4Description,
    accent: '#00d4ff',
    rgb: '0,212,255',
  },
]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          y: 40, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
   <section
  ref={sectionRef}
  id="servicios"
  className="py-32 px-8 lg:px-16"
  style={{
    backgroundColor: "#242424",
    backgroundImage: `url(${background})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}
>
      <div className="max-w-7xl mx-auto">

        <div ref={titleRef} className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-sora font-semibold uppercase tracking-widest mb-3" style={{ color: '#BD00FF' }}>
             {servicesEyebrow}
            </p>
            <h2 className="font-sora font-bold leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#00E5FF' }}>
              {servicesTitle}
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCards.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="bento-card p-6 flex flex-col gap-5 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: `rgba(${s.rgb},0.08)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                  <Icon size={18} style={{ color: s.accent }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-sora font-bold text-sm mb-2 leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
                    {s.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {s.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-sora font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: s.accent }}>
                 {servicesLearnMore} <ArrowUpRight size={12} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}