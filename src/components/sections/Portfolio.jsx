import { useRef, useEffect } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects }      from '../../data/index.js'
import useContent from '../../content/useContent'
gsap.registerPlugin(ScrollTrigger)

export function Portfolio() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const cardsRef   = useRef([])
const portfolioEyebrow = useContent(
  'main_portfolio_eyebrow',
  'Portfolio'
)

const portfolioTitle = useContent(
  'main_portfolio_title',
  'Proyectos Destacados'
)
const project1Title = useContent(
  'main_project_1_title',
  'Desarrollo Web con Inteligencia Artificial'
)

const project1Category = useContent(
  'main_project_1_category',
  'Web & IA'
)

const project1Description = useContent(
  'main_project_1_description',
  'Desarrollo de sitios web personalizados y de alto rendimiento. Integramos Inteligencia Artificial para automatizar procesos y optimizar la experiencia de usuario (UX).'
)

const project1Tags = useContent(
  'main_project_1_tags',
  'Python, TensorFlow, React, Next.js, IA'
)

const project2Title = useContent(
  'main_project_2_title',
  'CyberShield Pro'
)

const project2Category = useContent(
  'main_project_2_category',
  'Ciberseguridad'
)

const project2Description = useContent(
  'main_project_2_description',
  'Plataforma de monitoreo en tiempo real y detección de vulnerabilidades. Diseñada para blindar y optimizar la seguridad de infraestructura en la nube.'
)

const project2Tags = useContent(
  'main_project_2_tags',
  'Node.js, Docker, AWS, SIEM, SecOps, scanning'
)

const project3Title = useContent(
  'main_project_3_title',
  'Panel de Automatización Empresarial'
)

const project3Category = useContent(
  'main_project_3_category',
  'APPS & Desarrollo Full-Stack'
)

const project3Description = useContent(
  'main_project_3_description',
  'Dashboard Full-Stack diseñado para centralizar operaciones y optimizar flujos de trabajo en tiempo real.'
)

const project3Tags = useContent(
  'main_project_3_tags',
  'React, Node.js, MongoDB, android, ios'
)

const project4Title = useContent(
  'main_project_4_title',
  'AIACO Games: Nytheraultimus'
)

const project4Category = useContent(
  'main_project_4_category',
  'Videojuegos'
)

const project4Description = useContent(
  'main_project_4_description',
  'Un ambicioso ecosistema competitivo multijugador, MMORPG, historia futurista con elementos de ciencia ficción y fantasía.'
)

const project4Tags = useContent(
  'main_project_4_tags',
  'mmorpg, fantasy, 3D'
)
const portfolioProjects = projects.map((project, index) => {
  const contentByProject = [
    {
      title: project1Title,
      category: project1Category,
      description: project1Description,
      tags: project1Tags,
    },
    {
      title: project2Title,
      category: project2Category,
      description: project2Description,
      tags: project2Tags,
    },
    {
      title: project3Title,
      category: project3Category,
      description: project3Description,
      tags: project3Tags,
    },
    {
      title: project4Title,
      category: project4Category,
      description: project4Description,
      tags: project4Tags,
    },
  ]

  const editable = contentByProject[index]

  return {
    ...project,
    title: editable?.title ?? project.title,
    category: editable?.category ?? project.category,
    description:
      editable?.description ?? project.description,
    tags: editable?.tags
      ? editable.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean)
      : project.tags,
  }
})
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 92%' },
          y: 50, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 px-8 lg:px-16" style={{ background: 'hsl(var(--hero-bg))' }}>
      <div className="max-w-7xl mx-auto">

        <div ref={titleRef} className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-sora font-semibold uppercase tracking-widest mb-3" style={{ color: '#BD00FF' }}>
             {portfolioEyebrow}
            </p>
            <h2 className="font-sora font-bold leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#00E5FF' }}>
             {portfolioTitle}
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioProjects.map((project, i) => (
            <div
              key={project.id}
              ref={el => cardsRef.current[i] = el}
              className="group relative rounded-[20px] overflow-hidden cursor-pointer"
              style={{ border: '1px solid hsl(var(--border))', aspectRatio: '1', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(157,92,255,0.4)'
                e.currentTarget.style.transform   = 'translateY(-4px)'
                e.currentTarget.style.boxShadow   = '0 20px 60px rgba(0,0,0,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'hsl(var(--border))'
                e.currentTarget.style.transform   = 'translateY(0)'
                e.currentTarget.style.boxShadow   = 'none'
              }}
            >
              <img src={project.image} alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: 'linear-gradient(to top, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.4) 60%, transparent 100%)' }}>
                <span className="text-xs font-sora font-semibold uppercase tracking-widest mb-1" style={{ color: '#9d5cff' }}>
                  {project.category}
                </span>
                <h3 className="font-sora font-bold text-sm mb-2" style={{ color: 'hsl(var(--foreground))' }}>{project.title}</h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(157,92,255,0.15)', color: '#9d5cff', border: '1px solid rgba(157,92,255,0.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}