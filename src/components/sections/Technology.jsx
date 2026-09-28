import { useRef, useEffect } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useContent from '../../content/useContent'
gsap.registerPlugin(ScrollTrigger)

// ── Importa tus imágenes directamente ──────────────────
// Coloca las imágenes en src/assets/ y ajusta los nombres
import techImg1 from '../../assets/projects/logos.webp'
import techImg2 from '../../assets/projects/logos.webp'

export function Technology() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const cardsRef   = useRef([])
const technologyEyebrow = useContent(
  'main_technology_eyebrow',
  'Nuestra Tecnología'
)

const technologyTitleLine1 = useContent(
  'main_technology_title_line_1',
  'La siguiente generación'
)

const technologyTitleLine2 = useContent(
  'main_technology_title_line_2',
  'de Tecnología'
)

const technologyCard1Title = useContent(
  'main_technology_card_1_title',
  'Sitios Web Full Stack para Empresas y Emprendedores'
)

const technologyCard1Description = useContent(
  'main_technology_card_1_description',
  'Sitios Web Full Stack con nuestra propuesta de construcción e innovación, con tecnología de vanguardia para potenciar tu negocio digital.'
)

const technologyCard2Title = useContent(
  'main_technology_card_2_title',
  'seguridad tecnológica cyberseguridad'
)

const technologyCard2Description = useContent(
  'main_technology_card_2_description',
  'Servicios de seguridad tecnológica y cyberseguridad para proteger tu infraestructura digital y datos sensibles.'
)
const technologyCards = [
  {
    title: technologyCard1Title,
    description: technologyCard1Description,
    accent: '#9d5cff',
    image: techImg1,
  },
  {
    title: technologyCard2Title,
    description: technologyCard2Description,
    accent: '#00d4ff',
    image: techImg2,
  },
]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return

        const img     = card.querySelector('.tech-img')
        const overlay = card.querySelector('.tech-overlay')
        const text    = card.querySelector('.tech-text')

        gsap.from(img, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          scale: 0.92, opacity: 0, duration: 1.2, delay: i * 0.15, ease: 'power3.out',
        })
        gsap.from(overlay, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          opacity: 0, duration: 1, delay: i * 0.15 + 0.2, ease: 'power3.out',
        })
        gsap.from(text, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 30, opacity: 0, duration: 0.9, delay: i * 0.15 + 0.3, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
  <section
  ref={sectionRef}
  id="nosotros"
  className="py-32 px-8 lg:px-16"
  style={{
    backgroundColor: '#0a0a0f',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
>
      <div className="max-w-7xl mx-auto">

        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-sora font-semibold uppercase tracking-widest mb-3" style={{ color: '#BD00FF' }}>
              {technologyEyebrow}
            </p>
            <h2 className="font-sora font-bold leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#00E5FF' }}>
            {technologyTitleLine1}<br />{technologyTitleLine2}
            </h2>
          </div>
          <div className="hidden md:block w-px h-16" style={{ background: 'linear-gradient(to bottom, #9d5cff, transparent)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {technologyCards.map((tech, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="bento-card relative overflow-hidden group"
              style={{ minHeight: 340 }}
            >
              {/* Línea top hover */}
              <div className="absolute top-0 left-0 right-0 h-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${tech.accent}, transparent)` }} />

              {/* Número decorativo */}
              <span className="absolute top-4 right-6 font-sora font-black z-10"
                style={{ fontSize: 72, color: `${tech.accent}15`, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {tech.tag}
              </span>

              {/* Imagen de fondo */}
              <img
                src={tech.image}
                alt={tech.title}
                className="tech-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay degradado */}
              <div
                className="tech-overlay absolute inset-0 transition-all duration-500"
                style={{ background: 'linear-gradient(to top, rgba(5,5,7,0.97) 0%, rgba(5,5,7,0.6) 50%, rgba(5,5,7,0.2) 100%)' }}
              />

              {/* Texto encima */}
              <div className="tech-text absolute bottom-0 left-0 right-0 z-10 p-8">
                <div className="w-8 h-px mb-4" style={{ background: tech.accent }} />
                <h3 className="font-sora font-bold text-lg mb-3 leading-snug" style={{ color: '#f0f0f5' }}>
                  {tech.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,245,0.65)' }}>
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}