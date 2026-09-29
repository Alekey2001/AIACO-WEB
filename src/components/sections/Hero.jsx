import { Suspense, lazy, useEffect, useRef } from 'react'
import { useNavigate }   from 'react-router-dom'
import { motion }        from 'framer-motion'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight }    from 'lucide-react'
import useContent from '../../content/useContent'
gsap.registerPlugin(ScrollTrigger)

const SplineScene = lazy(() => import('@splinetool/react-spline'))

export function Hero() {
  const navigate   = useNavigate()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
const heroTitle = useContent(
  'main_hero_title',
  'AIACO'
)

const heroServices = useContent(
  'main_hero_services',
  'AI · Apps · Cybersecurity · Online Solutions'
)

const heroDescription = useContent(
  'main_hero_description',
  'Artificial Intelligence, Apps, Cybersecurity & Online solutions,'
)

const heroSlogan = useContent(
  'main_hero_slogan',
  '"Construimos el futuro digital con confianza."'
)

const heroWebButton = useContent(
  'main_hero_web_button',
  'Haz tu sitio web'
)

const heroAccountingButton = useContent(
  'main_hero_accounting_button',
  'Cotiza tu contabilidad'
)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'bottom top',
          scrub: true,
        },
        y: -80, opacity: 0,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(var(--hero-bg))' }}
    >
      {/* Spline 3D */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'hsl(var(--hero-bg))' }}>
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(157,92,255,0.3)', borderTopColor: '#9d5cff' }} />
          </div>
        }>
          <SplineScene
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} />

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-[2]"
        style={{ background: 'linear-gradient(to top, hsl(var(--hero-bg)) 0%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Contenido centrado */}
      <div
        ref={contentRef}
        className="relative z-[3] w-full flex flex-col items-center justify-center text-center px-6 md:px-10 pt-24 pb-20"
      >
        {/* AIACO — morado neón */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16,1,0.3,1] }}
          className="font-sora font-bold leading-none tracking-[-0.05em] uppercase mb-4"
          style={{
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            color: '#bd00ff',
            textShadow: '0 0 40px rgba(189,0,255,0.9), 0 0 80px rgba(189,0,255,0.5), 0 0 120px rgba(189,0,255,0.3)',
          }}
       >
  {heroTitle}
</motion.h1>

        {/* AI · Apps · Cybersecurity · Online Solutions — blanco */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16,1,0.3,1] }}
          className="font-sora font-semibold uppercase tracking-widest mb-6"
          style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', color: '#ffffff', letterSpacing: '0.2em' }}
       >
  {heroServices}
</motion.p>

        {/* Línea divisora */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mb-6 origin-center"
          style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #bd00ff, transparent)' }}
        />

        {/* Descripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16,1,0.3,1] }}
          className="mb-10 max-w-xl"
        >
          <p className="font-sora font-light mb-1" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#ffffff' }}>
           {heroDescription}
          </p>
          <p className="font-sora font-semibold" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#bd00ff', textShadow: '0 0 20px rgba(189,0,255,0.6)' }}>
            {heroSlogan}
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4 items-center justify-center"
        >
          <button
            onClick={() => navigate('/sitios-web')}
            className="inline-flex items-center gap-2 font-sora font-bold text-sm uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 rounded-sm cursor-pointer transition-all duration-300 active:scale-[0.97] hover:brightness-110 hover:-translate-y-0.5"
            style={{background: 'linear-gradient(90deg,#00E5FF,#00A3FF)',color: '#000000',textShadow: '0 0 20px rgba(0,229,255,0.3)' // Efecto Glow Cian
    }}
          >
           {heroWebButton} <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/contabilidad')}
            className="inline-flex items-center gap-2 font-sora font-bold bg-white text-sm uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 rounded-sm cursor-pointer transition-all duration-300 active:scale-[0.97] hover:brightness-90"
            style={{background: 'linear-gradient(90deg,#BD00FF,#7000FF)',color: '#FFFFFF',textShadow: '0 0 20px rgba(189,0,255,0.3)' // Efecto Glow Cian
    }}
          >
            {heroAccountingButton}
          </button>
        </motion.div>
      </div>
    </section>
  )
}