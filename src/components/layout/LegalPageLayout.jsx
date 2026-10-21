import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AccountingNavbar from './AccountingNavbar'
import { Footer } from './Footer'

gsap.registerPlugin(ScrollTrigger)

export default function LegalPageLayout({ title, intro, sections }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      contentRef.current.querySelectorAll('[data-legal-reveal]').forEach(element => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, contentRef)
    return () => ctx.revert()
  }, [title])

  return (
    <div style={{ background: '#070b14', minHeight: '100vh', fontFamily: "'Sora', sans-serif", color: '#dfe2f0', overflowX: 'hidden' }}>
      <AccountingNavbar sectionPrefix="/contabilidad" />
      <div className="relative isolate">
        <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div style={{ position: 'absolute', width: 600, height: 600, top: -100, left: -200, background: '#bd00ff', borderRadius: '100%', filter: 'blur(80px)', opacity: 0.12 }} />
          <div style={{ position: 'absolute', width: 500, height: 500, bottom: 100, right: -100, background: '#00eefc', borderRadius: '100%', filter: 'blur(80px)', opacity: 0.12 }} />
        </div>
        <article ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-20 pt-32 pb-24">
          <header data-legal-reveal className="max-w-3xl mb-12 will-change-transform">
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>AIACO · Información corporativa</p>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-6">{title}</h1>
            <p className="text-base leading-relaxed text-[#9d8ba0]">{intro}</p>
            <p className="mt-6 text-sm text-[#ecb2ff]">Contenido de ejemplo para maquetación. Documento provisional pendiente de revisión y aprobación por AIACO.</p>
          </header>
          <div className="max-w-4xl space-y-6">
            {sections.map(section => (
              <section key={section.title} data-legal-reveal className="rounded-3xl p-6 md:p-8 will-change-transform" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 12px 40px rgba(0,0,0,0.28)' }}>
                <h2 className="text-xl font-semibold text-[#ecb2ff] mb-4">{section.title}</h2>
                <p className="text-sm md:text-base leading-7 text-[#b7aabc]">{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </div>
  )
}
