import { useEffect, useRef, useState } from 'react'
import { useNavigate }   from 'react-router-dom'
import { motion }        from 'framer-motion'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Mail, ArrowRight, Menu, X } from 'lucide-react'
import baseweb from '../assets/projects/baseweb.svg'
import AccountNavAction from '../components/account/AccountNavAction'
import useContent from '../content/useContent'
gsap.registerPlugin(ScrollTrigger)

// ── Paleta unificada ────────────────────────────────────
const C = {
  bg:      '#050507',
  surface: '#0c0c0f',
  card:    '#111116',
  border:  '#1e1e26',
  purple:  '#9d5cff',
  cyan:    '#00d4ff',
  muted:   '#4a4a5a',
  soft:    '#8888a0',
  white:   '#f0f0f5',
}

// ── Datos ───────────────────────────────────────────────
const navLinks = ['Servicios', 'Nosotros', 'Paquetes', 'Contacto']
const packages = [
  {
    accent: C.purple,
    rgb: '157,92,255',
    recommended: false,
  },
  {
    accent: C.cyan,
    rgb: '0,212,255',
    recommended: true,
  },
  {
    accent: C.purple,
    rgb: '157,92,255',
    recommended: false,
  },
]

const carouselItems = [
  { label: 'Dashboard Empresarial', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { label: 'App Fintech',           img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80' },
  { label: 'E-Commerce',            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { label: 'Dashboard Empresarial', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { label: 'App Fintech',           img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80' },
  { label: 'E-Commerce',            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
]
const marqueeLogos = [
  'React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Vite',
  'React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Vite',
]

// ── Video Hero ──────────────────────────────────────────
function VideoHero() {
  const videoHeroTitle = useContent('web_video_hero_title', 'AIACO Web')
  const videoHeroDescription = useContent(
    'web_video_hero_description',
    'Construimos El Futuro Digital Con Inteligencia : Full Stack, escalable y potenciado con IA.'
  )
  const videoHeroButton = useContent(
    'web_video_hero_button',
    'Comenzar Ahora'
  )
  const videoHeroMarqueeTitle = useContent(
    'web_video_hero_marquee_title',
    'Tecnologías que dominamos'
  )

  const videoRef = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const fadeIn = () => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / 500, 1)
        video.style.opacity = t
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const fadeOut = () => {
      const start = performance.now()
      const startOp = parseFloat(video.style.opacity) || 1
      const tick = (now) => {
        const t = Math.min((now - start) / 500, 1)
        video.style.opacity = startOp * (1 - t)
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          video.style.opacity = 0
          setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}) }, 100)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.6) {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        fadeOut()
      }
    }

    video.style.opacity = 0
    video.addEventListener('play',        () => fadeIn())
    video.addEventListener('timeupdate',  handleTimeUpdate)
    video.addEventListener('ended',       () => {
      video.style.opacity = 0
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}) }, 100)
    })
    video.play().catch(() => {})

    return () => { cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <section
     style={{
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    background: 'hsl(260 87% 3%)',
    display: 'flex',
    flexDirection: 'column',
  }}
    >
      {/* Video background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
          muted playsInline preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
        />
      </div>

      {/* Blur shape centrado */}
      <div style={{
        position: 'absolute', zIndex: 1, pointerEvents: 'none',
        width: 700, height: 400,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(3,2,10,0.82)',
        filter: 'blur(70px)',
      }} />

      {/* Contenido — flex column, space-between */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Hero centrado — flex-1 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>

          {/* Título */}
          <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
  style={{
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(52px, 9vw, 120px)',
    lineHeight: 1.02,
    letterSpacing: '-0.024em',
    color: 'hsl(40 6% 95%)',
    margin: 0,
  }}
>
  {videoHeroTitle}
</motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              maxWidth: 420,
              fontSize: 16,
              lineHeight: 1.6,
              marginTop: 12,
              color: 'hsl(40 6% 82%)',
              opacity: 0.85,
              fontFamily: "'Inter', sans-serif",
            }}
          >
           {videoHeroDescription}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              marginTop: 20,
              padding: '14px 28px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'hsl(40 6% 95%)',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(157,92,255,0.18)'
              e.currentTarget.style.borderColor = 'rgba(157,92,255,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
           {videoHeroButton} <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* Marquee — pegado al fondo */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24, overflow: 'hidden' }}>

          <p style={{ flexShrink: 0, fontSize: 10, lineHeight: 1.4, color: 'rgba(245,243,240,0.4)', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.05em' }}>
  {videoHeroMarqueeTitle}
</p>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <style>{`
                @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
                .mq-track { display:flex; gap:28px; width:max-content; animation:mq 20s linear infinite; }
              `}</style>
              <div className="mq-track">
                {marqueeLogos.map((name, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div
                      className="liquid-glass"
                      style={{ width: 16, height: 16, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d5cff', fontFamily: "'Montserrat', sans-serif", fontSize: 7, fontWeight: 700 }}
                    >
                      {name[0]}
                    </div>
                    <span style={{ color: 'rgba(245,243,240,0.75)', fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600 }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// ── Aurora Shader Canvas ─────────────────────────────────
const AURORA_FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)
float pattern(vec2 uv) {
  float d=.0;
  for (float i=.0; i<3.; i++) {
    uv.x+=sin(T*(1.+i)+uv.y*1.5)*.2;
    d+=.005/abs(uv.x);
  }
  return d;
}
vec3 scene(vec2 uv) {
  vec3 col=vec3(0);
  uv=vec2(atan(uv.x,uv.y)*2./6.28318,-log(length(uv))+T);
  for (float i=.0; i<3.; i++) {
    int k=int(mod(i,3.));
    col[k]+=pattern(uv+i*6./MN);
  }
  return col;
}
void main() {
 vec2 uv=(FC-.5*R)/mix(R.y, R.x, 0.35);
  vec3 col=vec3(0);
  float s=12., e=9e-4;
  col+=e/(sin(uv.x*s)*cos(uv.y*s));
  uv.y+=R.x>R.y?.5:.5*(R.y/R.x);
  col+=scene(uv);
  O=vec4(col,1.);
}`

const AURORA_VERT = `#version 300 es
precision highp float;
in vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`

function AuroraCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true })
    if (!gl) return

    const compileShader = (src, type) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(sh) || 'Unknown shader error'
        gl.deleteShader(sh)
        throw new Error(info)
      }
      return sh
    }
    const createProgram = (vs, fs) => {
      const v = compileShader(vs, gl.VERTEX_SHADER)
      const f = compileShader(fs, gl.FRAGMENT_SHADER)
      const prog = gl.createProgram()
      gl.attachShader(prog, v)
      gl.attachShader(prog, f)
      gl.linkProgram(prog)
      gl.deleteShader(v)
      gl.deleteShader(f)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(prog) || 'Program link error'
        gl.deleteProgram(prog)
        throw new Error(info)
      }
      return prog
    }

    let prog
    try {
      prog = createProgram(AURORA_VERT, AURORA_FRAG)
    } catch (e) {
      console.error(e)
      return
    }

    const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

    gl.useProgram(prog)
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uniTime = gl.getUniformLocation(prog, 'time')
    const uniRes  = gl.getUniformLocation(prog, 'resolution')

    gl.clearColor(0, 0, 0, 1)

    const fit = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      const rect = canvas.getBoundingClientRect()
      const W = Math.floor(Math.max(1, rect.width) * dpr)
      const H = Math.floor(Math.max(1, rect.height) * dpr)
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W
        canvas.height = H
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    fit()
    const onResize = () => fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)
    window.addEventListener('resize', onResize)

    let raf
    const loop = (now) => {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(prog)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      if (uniRes)  gl.uniform2f(uniRes, canvas.width, canvas.height)
      if (uniTime) gl.uniform1f(uniTime, now * 1e-3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Fondo animado aurora"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}


// ── Particle Canvas ─────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let dots = [], raf
    let mouseX = 0, mouseY = 0, tX = 0, tY = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      dots = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,  y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.4 + 0.1,
      }))
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { tX = (e.clientX - canvas.width/2)*0.04; tY = (e.clientY - canvas.height/2)*0.04 })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      mouseX += (tX - mouseX) * 0.05; mouseY += (tY - mouseY) * 0.05
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = canvas.width;  if (d.x > canvas.width)  d.x = 0
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0
        ctx.beginPath(); ctx.arc(d.x - mouseX*d.r*0.5, d.y - mouseY*d.r*0.5, d.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(157,92,255,${d.o})`; ctx.fill()
      })
      for (let i = 0; i < dots.length; i++) {
        for (let j = i+1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(157,92,255,${0.05*(1-dist/110)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

// ── Bento Card ──────────────────────────────────────────
function BentoCard({ children, className = '', accent = C.purple, style = {} }) {
  const rgb = accent === C.purple ? '157,92,255' : '0,212,255'
  return (
    <div
      className={`relative rounded-[20px] transition-all duration-500 ${className}`}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        willChange: 'transform',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(${rgb},0.3)`
        e.currentTarget.style.transform   = 'translateY(-6px) scale(1.01)'
        e.currentTarget.style.boxShadow   = `0 24px 48px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(${rgb},0.08)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = C.border
        e.currentTarget.style.transform   = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {children}
    </div>
  )
}

// ── Main ────────────────────────────────────────────────
export default function SitiosWeb() {
  const webPackagesEyebrow = useContent(
  'web_packages_eyebrow',
  'paquetes de servicios'
)

const webPackagesTitle = useContent(
  'web_packages_title',
  'Soluciones Next-Gen'
)

const webPackagesDescription = useContent(
  'web_packages_description',
  'Selecciona tu tipo de proyecto y descubre el paquete ideal para ti.'
)

const webPackage1Label = useContent(
  'web_package_1_label',
  'Impulso Digital (Entry)'
)

const webPackage1Name = useContent(
  'web_package_1_name',
  'Impulso Digital'
)

const webPackage1Price = useContent(
  'web_package_1_price',
  '$12,000+ MXN'
)

const webPackage1Description = useContent(
  'web_package_1_description',
  'Presencia profesional de alto impacto para marcas que buscan destacar.'
)

const webPackage1Features = useContent(
  'web_package_1_features',
  'Landing Page de Alta Conversión\nDiseño UI/UX Responsivo (Mobile First)\nOptimización de Velocidad y SEO Técnico\nFormulario de contacto avanzado\n1 Mes de soporte técnico'
)

const webPackage1Button = useContent(
  'web_package_1_button',
  'Iniciar Proyecto'
)

const webPackage2Label = useContent(
  'web_package_2_label',
  'Crecimiento Pro'
)

const webPackage2Name = useContent(
  'web_package_2_name',
  'Crecimiento Pro'
)

const webPackage2Price = useContent(
  'web_package_2_price',
  '$28,000+ MXN'
)

const webPackage2Description = useContent(
  'web_package_2_description',
  'Plataforma escalable para negocios que necesitan gestionar contenido y ventas.'
)

const webPackage2Features = useContent(
  'web_package_2_features',
  'Sitio Fullstack a Medida\nPanel de Administración Autogestionable\nIntegración de Pagos y Carrito\nAnalítica de datos y CRM básico\n3 Meses de mantenimiento y soporte'
)

const webPackage2Button = useContent(
  'web_package_2_button',
  'Potenciar mi Negocio'
)

const webPackage2Badge = useContent(
  'web_package_2_badge',
  '★ Más consumido'
)

const webPackage3Label = useContent(
  'web_package_3_label',
  'Escala Inteligente (Enterprise)'
)

const webPackage3Name = useContent(
  'web_package_3_name',
  'Escala Inteligente'
)

const webPackage3Price = useContent(
  'web_package_3_price',
  '$50,000+ MXN'
)

const webPackage3Description = useContent(
  'web_package_3_description',
  'Soluciones de vanguardia con Inteligencia Artificial para líderes de mercado.'
)

const webPackage3Features = useContent(
  'web_package_3_features',
  'Desarrollo Fullstack Premium\nIntegración de IA (Chatbots/Automatización)\nInfraestructura en la Nube (AWS/Cloud)\nSeguridad DevSecOps Reforzada\n6 Meses de soporte y optimización continua'
)

const webPackage3Button = useContent(
  'web_package_3_button',
  'Agendar Consultoría'
)
const packageContents = [
  {
    label: webPackage1Label,
    name: webPackage1Name,
    price: webPackage1Price,
    description: webPackage1Description,
    features: webPackage1Features,
    button: webPackage1Button,
    badge: '',
  },
  {
    label: webPackage2Label,
    name: webPackage2Name,
    price: webPackage2Price,
    description: webPackage2Description,
    features: webPackage2Features,
    button: webPackage2Button,
    badge: webPackage2Badge,
  },
  {
    label: webPackage3Label,
    name: webPackage3Name,
    price: webPackage3Price,
    description: webPackage3Description,
    features: webPackage3Features,
    button: webPackage3Button,
    badge: '',
  },
]
const webChecklistTitle = useContent(
  'web_checklist_title',
  'Domina tu Lanzamiento Digital'
)

const webChecklistDescription = useContent(
  'web_checklist_description',
  'Descarga el checklist estratégico de 50 puntos que utilizan los expertos para garantizar sitios web de alto rendimiento y cero errores.'
)

const webChecklistButton = useContent(
  'web_checklist_button',
  'Descargar mi Guía de Éxito'
)
  const webAboutEyebrow = useContent(
  'web_about_eyebrow',
  'Quiénes somos'
)

const webAboutTitle = useContent(
  'web_about_title',
  'Sobre AIACO'
)

const webAboutDescription = useContent(
  'web_about_description',
  'Somos una agencia de tecnología especializada en Inteligencia Artificial, Aplicaciones Web, Ciberseguridad y Soluciones Digitales. Nuestro equipo combina experiencia técnica con visión creativa para construir el futuro digital de nuestros clientes.'
)

const webStat1Value = useContent(
  'web_stat_1_value',
  '+10'
)

const webStat1Label = useContent(
  'web_stat_1_label',
  'Proyectos entregados'
)

const webStat2Value = useContent(
  'web_stat_2_value',
  '100%'
)

const webStat2Label = useContent(
  'web_stat_2_label',
  'Clientes satisfechos'
)

const webStat3Value = useContent(
  'web_stat_3_value',
  '24/7'
)

const webStat3Label = useContent(
  'web_stat_3_label',
  'Soporte disponible'
)

const webMissionTitle = useContent(
  'web_mission_title',
  'Nuestra Misión'
)

const webMissionDescription = useContent(
  'web_mission_description',
  'Democratizar el acceso a tecnología de vanguardia para empresas y emprendedores, entregando soluciones digitales que generan impacto real y crecimiento sostenible.'
)

const webVisionTitle = useContent(
  'web_vision_title',
  'Nuestra Visión'
)

const webVisionDescription = useContent(
  'web_vision_description',
  'Ser la agencia tecnológica líder en Latinoamérica, reconocida por transformar ideas en productos digitales que definen el futuro de los negocios.'
)
  const webProjectsEyebrow = useContent(
  'web_projects_eyebrow',
  'Nuestros proyectos'
)

const webProjectsTitle = useContent(
  'web_projects_title',
  'Proyectos Destacados'
)

const webProjectsDescription = useContent(
  'web_projects_description',
  'Soluciones digitales únicas, sin plantillas, sin límites.'
)

const webProject1Label = useContent(
  'web_project_1_label',
  'Dashboard Empresarial'
)

const webProject2Label = useContent(
  'web_project_2_label',
  'App Fintech'
)

const webProject3Label = useContent(
  'web_project_3_label',
  'E-Commerce'
)
  const webHeroTitle = useContent(
  'web_hero_title',
  'Transformamos tus\nideas en activos digitales\nde alto rendimiento'
)

const webHeroDescription = useContent(
  'web_hero_description',
  'Desarrollamos sitios web, plataformas escalables e integraciones de IA diseñadas para potenciar tu crecimiento.'
)

const webHeroPrimaryButton = useContent(
  'web_hero_primary_button',
  'Comenzar Ahora'
)

const webHeroSecondaryButton = useContent(
  'web_hero_secondary_button',
  'Ver Paquetes'
)
  const navigate = useNavigate()
  // we use the nabar fixed so we need to know if the user scrolled down to change the background of the navbar
const [menuOpen,      setMenuOpen]      = useState(false)
const [isScrolled,    setIsScrolled]    = useState(false)
const [activeSection, setActiveSection] = useState('servicios')
const [form,          setForm]          = useState({ name: '', email: '', subject: '', message: '' })
const [sent,          setSent]          = useState(false)
const [focused,       setFocused]       = useState('')

// other variables to store the refs of the sections so we can use them in the scroll trigger
const [pageNode,      setPageNode]      = useState(null)
const [heroNode,      setHeroNode]      = useState(null)
const [headNode,      setHeadNode]      = useState(null)
const [orbNode,       setOrbNode]       = useState(null)
const [carouselNode,  setCarouselNode]  = useState(null)
const [aboutNode,     setAboutNode]     = useState(null)
const [,       setPkgNode]       = useState(null)
const [ckNode,        setCkNode]        = useState(null)
const [ctaNode,       setCtaNode]       = useState(null)

  const pkgCardsRef = useRef([])
  const scrollToContent = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
  }

 useEffect(() => {
  const onScroll = () => {
    setIsScrolled(window.scrollY > 40)

    const ids = ['servicios', 'nosotros', 'paquetes', 'contacto']
    const bottom = window.scrollY + window.innerHeight
    if (bottom >= document.documentElement.scrollHeight - 50) { setActiveSection('contacto'); return }
    let cur = ''
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el && window.scrollY >= el.offsetTop - window.innerHeight * 0.4) cur = id
    })
    if (cur) setActiveSection(cur)
  }
  onScroll()
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
}, [])
  useEffect(() => {
    if (!pageNode) return

    const ctx = gsap.context(() => {
      if (heroNode && headNode) {
        gsap.to(headNode, {
          scrollTrigger: { trigger: heroNode, start: 'top top', end: 'bottom top', scrub: true },
          y: -60, opacity: 0,
        })
      }
      if (heroNode && orbNode) {
        gsap.to(orbNode, {
          scrollTrigger: { trigger: heroNode, start: 'top top', end: 'bottom top', scrub: 1.5 },
          scale: 1.3, opacity: 0, rotate: 45,
        })
      }
      if (carouselNode) {
        gsap.from(carouselNode, {
          scrollTrigger: { trigger: carouselNode, start: 'top 85%', toggleActions: 'play none none none' },
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        })
      }
      if (aboutNode) {
        const revealItems = aboutNode.querySelectorAll('.reveal-item')

        gsap.from(revealItems, {
          scrollTrigger: { trigger: aboutNode, start: 'top 85%', toggleActions: 'play none none none' },
          y: 24, opacity: 0, scale: 0.97, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        })

        // Red de seguridad: si ScrollTrigger no dispara a tiempo (layout shift,
        // refresh tardío por assets async), forzamos visibilidad tras 1.5s.
        // Esto garantiza que las tarjetas de "Sobre AIACO" nunca queden
        // ocultas de forma permanente, sin importar el timing del scroll.
        gsap.delayedCall(1.5, () => {
          gsap.set(revealItems, { clearProps: 'opacity,transform' })
        })
      }
      pkgCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          y: 50, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
        })
      })
      if (ckNode) {
        gsap.from(ckNode, {
          scrollTrigger: { trigger: ckNode, start: 'top 85%', toggleActions: 'play none none none' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      }
      if (ctaNode) {
        gsap.from(ctaNode, {
          scrollTrigger: { trigger: ctaNode, start: 'top 85%', toggleActions: 'play none none none' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      }
    }, pageNode)

    // Fix crítico: recalcular ScrollTrigger cuando el video/imágenes async
    // terminan de cargar y modifican la altura total del documento.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    const raf = requestAnimationFrame(() => {
      setTimeout(refresh, 300)
    })

    return () => {
      ctx.revert()
      window.removeEventListener('load', refresh)
      cancelAnimationFrame(raf)
    }
  }, [pageNode, heroNode, headNode, orbNode, carouselNode, aboutNode, ckNode, ctaNode])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputStyle = (name) => ({
    width: '100%', background: C.surface,
    border: '1px solid', borderColor: focused === name ? C.purple : C.border,
    borderRadius: 12, padding: '12px 16px', color: C.white,
    fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none',
    transition: 'all 0.3s',
    boxShadow: focused === name ? `0 0 0 3px rgba(157,92,255,0.1)` : 'none',
  })

  return (
    <div ref={setPageNode} style={{ background: C.bg, minHeight: '100vh', color: C.white, overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>

      {/* liquid-glass utility */}
      <style>{`
        .liquid-glass {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <ParticleCanvas />

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ zIndex: 0,
        backgroundSize: '60px 60px',
        backgroundImage: `linear-gradient(to right, ${C.purple} 1px, transparent 1px), linear-gradient(to bottom, ${C.purple} 1px, transparent 1px)`,
      }} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 700, height: 700, top: '-15%', left: '-15%', background: `radial-gradient(circle, rgba(157,92,255,0.08) 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, bottom: '-10%', right: '-10%', background: `radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)`, filter: 'blur(60px)' }} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  style={{
    background: isScrolled ? 'rgba(5,5,7,0.9)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(24px)' : 'none',
    borderBottom: isScrolled ? `1px solid ${C.border}` : 'none',
  }}
>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <span className="font-black text-lg" style={{ fontFamily: "'Montserrat', sans-serif", color: 'white' }}>
              AIACO
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(l => {
              const id = l.toLowerCase()
              const isActive = activeSection === id
              return (
                <li key={l}>
                  <a href={`#${id}`}
                    className="relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 block"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: isActive ? C.white : 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => e.currentTarget.style.color = C.white}
                    onMouseLeave={e => e.currentTarget.style.color = isActive ? C.white : 'rgba(255,255,255,0.6)'}
                  >
                    {l}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})` }} />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/')}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300"
              style={{ borderRadius: 8, background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
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
    style={{ color: C.soft }}
    aria-label="Abrir menú"
  >
    {menuOpen ? <X size={20} /> : <Menu size={20} />}
  </button>

</div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(5,5,7,0.98)', backdropFilter: 'blur(24px)' }}>
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-widest"
              style={{ fontFamily: "'Montserrat', sans-serif", color: activeSection === l.toLowerCase() ? C.purple : C.muted }}>
              {l}
            </a>
          ))}
          <button onClick={() => { navigate('/'); setMenuOpen(false) }}
            className="mt-4 px-8 py-3 text-xs font-bold uppercase tracking-widest"
            style={{ borderRadius: 9999, background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg, fontFamily: "'Montserrat', sans-serif" }}>
            Volver al inicio
          </button>
        </div>
      )}

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ── VIDEO HERO ─────────────────────────────────── */}
        <VideoHero onScrollDown={scrollToContent} />

        {/* ── ORB HERO ───────────────────────────────────── */}
        <section ref={setHeroNode} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          <style>{`
            @keyframes orbFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
            @keyframes ring1 { from{transform:rotateZ(0) rotateX(65deg)} to{transform:rotateZ(360deg) rotateX(65deg)} }
            @keyframes ring2 { from{transform:rotateZ(0) rotateX(20deg)} to{transform:rotateZ(-360deg) rotateX(20deg)} }
            @keyframes ring3 { from{transform:rotateZ(0) rotateX(80deg) rotateY(30deg)} to{transform:rotateZ(360deg) rotateX(80deg) rotateY(30deg)} }
            @keyframes codeFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
            .orb-anim { animation: orbFloat 7s ease-in-out infinite; transform-style: preserve-3d; }
            .code-float { animation: codeFloat 5s ease-in-out infinite; }
          `}</style>

         {/* Fondo shader Aurora — reemplaza el orbe decorativo */}
<div ref={setOrbNode} className="absolute inset-0" style={{ zIndex: 0 }}>
  <AuroraCanvas />
  {/* Overlay para legibilidad, tonos AIACO */}
  <div style={{
  position: 'absolute', inset: 0,
  background: `linear-gradient(180deg, ${C.bg}99 0%, ${C.bg}40 50%, ${C.bg}99 100%)`,
}} />
  <div style={{
    position: 'absolute', inset: 0,
    background: `radial-gradient(circle at 30% 40%, rgba(157,92,255,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 60%, rgba(0,212,255,0.12) 0%, transparent 55%)`,
  }} />
</div>

          <div ref={setHeadNode} className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-10 pb-20">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16,1,0.3,1] }}
                className="font-black leading-none mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(48px, 7vw, 88px)', letterSpacing: '-0.04em' }}
              >
              {webHeroTitle.split('\n').map((line, index) => (
  <span
    key={`${line}-${index}`}
    className={
  index === 1
    ? 'text-cyan-400'
    : ''
}
  >
    {line}
    {index < 2 && <br />}
  </span>
))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16,1,0.3,1] }}
                className="mb-10"
                style={{ fontSize: 18, color: C.soft, lineHeight: 1.7, maxWidth: 520 }}
              >
                {webHeroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(157,92,255,0.4)]"
                  style={{ borderRadius: 9999, background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg, fontFamily: "'Montserrat', sans-serif" }}>
                  {webHeroPrimaryButton} <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-300"
                  style={{ borderRadius: 9999, border: `1px solid ${C.border}`, color: C.white, fontFamily: "'Montserrat', sans-serif", background: 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(157,92,255,0.5)`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  {webHeroSecondaryButton}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CAROUSEL / SERVICIOS ────────────────────────── */}
<section id="servicios" ref={setCarouselNode} className="relative py-24 overflow-hidden" style={{ background: C.surface }}>

  {/* Fondo baseweb.svg */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: `url("${baseweb}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
  }}
/>
  <div className="relative max-w-7xl mx-auto px-6 md:px-10 mb-12" style={{ zIndex: 1 }}>
    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'Montserrat', sans-serif", color: C.cyan }}>
         {webProjectsEyebrow}
        </p>
        <h2 className="font-black leading-tight" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', color: C.white }}>
         {webProjectsTitle}
        </h2>
      </div>
      <p className="text-xs uppercase text-right" style={{ fontFamily: "'Montserrat', sans-serif", color: C.muted, letterSpacing: '0.15em', maxWidth: 280 }}>
       {webProjectsDescription}
      </p>
    </div>
  </div>

  <div className="relative w-full overflow-hidden" style={{ cursor: 'grab', zIndex: 1 }}
            onMouseEnter={e => e.currentTarget.querySelector('.sw-track').style.animationPlayState = 'paused'}
            onMouseLeave={e => e.currentTarget.querySelector('.sw-track').style.animationPlayState = 'running'}
          >
            <style>{`
              @keyframes swScroll { 0%{transform:translateX(0)} 100%{transform:translateX(calc(-50% - 12px))} }
              .sw-track { display:flex; gap:20px; width:max-content; animation:swScroll 30s linear infinite; }
            `}</style>
            <div className="sw-track">
              {carouselItems.map((item, i) => (
                <div key={i} className="shrink-0 rounded-[16px] overflow-hidden transition-all duration-300"
                  style={{ width: 460, border: `1px solid ${C.border}`, background: C.card }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(157,92,255,0.35)`; e.currentTarget.style.boxShadow = `0 0 20px rgba(157,92,255,0.15)` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    width={460}
                    height={260}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover"
                    style={{ height: 260, aspectRatio: '460 / 260' }}
                  />
                  <div className="px-4 py-3">
                    <span
  className="text-xs font-semibold uppercase tracking-widest"
  style={{
    fontFamily: "'Montserrat', sans-serif",
    color: C.muted
  }}
>
  {i % 3 === 0
    ? webProject1Label
    : i % 3 === 1
      ? webProject2Label
      : webProject3Label}
</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOSOTROS ────────────────────────────────────── */}
        <section id="nosotros" ref={setAboutNode} className="py-24 px-6 md:px-10" style={{ background: C.bg }}>
          <div className="max-w-7xl mx-auto">

            <div className="reveal-item mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif", color: C.purple }}>
                {webAboutEyebrow}
              </p>
              <h2 className="font-black leading-tight mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', color: C.white }}>
                {webAboutTitle}
              </h2>
              <p className="max-w-2xl" style={{ color: C.soft, fontSize: 16, lineHeight: 1.8 }}>
              {webAboutDescription}
              </p>
            </div>

            {/* Stats */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

  <BentoCard className="reveal-item p-8 text-center" accent={C.purple}>
    <div
      className="font-black mb-2"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 48,
        background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      {webStat1Value}
    </div>

    <p
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: C.muted
      }}
    >
      {webStat1Label}
    </p>
  </BentoCard>

  <BentoCard className="reveal-item p-8 text-center" accent={C.cyan}>
    <div
      className="font-black mb-2"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 48,
        background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      {webStat2Value}
    </div>

    <p
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: C.muted
      }}
    >
      {webStat2Label}
    </p>
  </BentoCard>

  <BentoCard className="reveal-item p-8 text-center" accent={C.purple}>
    <div
      className="font-black mb-2"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 48,
        background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      {webStat3Value}
    </div>

    <p
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: C.muted
      }}
    >
      {webStat3Label}
    </p>
  </BentoCard>

</div>
{/* Mission / Vision */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <BentoCard
    className="reveal-item p-8"
    accent={C.purple}
  >
    <div
      className="w-8 h-0.5 mb-5"
      style={{
        background: `linear-gradient(90deg, ${C.purple}, transparent)`
      }}
    />

    <h3
      className="font-bold text-xl mb-3"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: C.white
      }}
    >
      {webMissionTitle}
    </h3>

    <p
      className="text-sm leading-relaxed"
      style={{ color: C.soft }}
    >
      {webMissionDescription}
    </p>
  </BentoCard>
  <BentoCard
    className="reveal-item p-8"
    accent={C.cyan}
  >
    <div
      className="w-8 h-0.5 mb-5"
      style={{
        background: `linear-gradient(90deg, ${C.cyan}, transparent)`
      }}
    />
    <h3
      className="font-bold text-xl mb-3"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: C.white
      }}
    >
      {webVisionTitle}
    </h3>
    <p
      className="text-sm leading-relaxed"
      style={{ color: C.soft }}
    >
      {webVisionDescription}
    </p>
  </BentoCard>
</div>
          </div>
        </section>

        {/* ── PAQUETES ────────────────────────────────────── */}
       <section id="paquetes" ref={setPkgNode} className="relative py-24 px-6 md:px-10 overflow-hidden" style={{ background: C.surface }}>
         {/* Fondo baseweb.svg */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `url("${baseweb}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 0,
    }}
  />

 <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'Montserrat', sans-serif", color: C.cyan }}>
               {webPackagesEyebrow}
              </p>
              <h2 className="font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {webPackagesTitle}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif", color: C.muted }}>
                {webPackagesDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  ref={el => pkgCardsRef.current[i] = el}
                  className="relative rounded-[20px] p-8 flex flex-col gap-4"
                  style={{
                    background: pkg.recommended
                      ? `linear-gradient(135deg, rgba(157,92,255,0.08), rgba(0,212,255,0.05))`
                      : C.card,
                    border: `1px solid ${pkg.recommended ? `rgba(${pkg.rgb},0.5)` : C.border}`,
                    boxShadow: pkg.recommended ? `0 0 60px rgba(${pkg.rgb},0.1), inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = `0 30px 80px rgba(${pkg.rgb},0.2)`
                    e.currentTarget.style.borderColor = `rgba(${pkg.rgb},0.6)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = pkg.recommended ? `0 0 60px rgba(${pkg.rgb},0.1)` : 'none'
                    e.currentTarget.style.borderColor = pkg.recommended ? `rgba(${pkg.rgb},0.5)` : C.border
                  }}
                >
                  {/* Top line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-[20px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${pkg.accent}, transparent)` }} />

                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                      style={{ fontFamily: "'Montserrat', sans-serif", background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg }}>
                     {packageContents[i].badge}
                    </div>
                  )}

                  {/* Tier label */}
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif", color: pkg.accent }}>
                    {packageContents[i].label}
                  </span>

                  <h3 className="font-bold text-2xl" style={{ fontFamily: "'Montserrat', sans-serif", color: C.white }}>{packageContents[i].name}</h3>

                  <div className="flex items-end gap-1 my-2">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 44, fontWeight: 900, color: pkg.recommended ? pkg.accent : C.white, lineHeight: 1 }}>
                      {packageContents[i].price}
                    </span>
                    <span className="mb-2 text-sm" style={{ color: C.muted }}>{packageContents[i].description}</span>
                  </div>

                  <div className="h-px w-full my-2" style={{ background: `linear-gradient(90deg, ${pkg.accent}40, transparent)` }} />

                  <ul className="flex flex-col gap-3 flex-1">
                    {packageContents[i].features.split('\n').map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm" style={{ color: C.soft }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs"
                          style={{ background: `rgba(${pkg.rgb},0.15)`, color: pkg.accent }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-3 font-bold uppercase tracking-widest text-xs mt-4 transition-all duration-300 hover:scale-105"
                    style={{
                      borderRadius: 9999,
                      fontFamily: "'Montserrat', sans-serif",
                      ...(pkg.recommended
                        ? { background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg, boxShadow: `0 0 20px rgba(${pkg.rgb},0.3)` }
                        : { border: `1px solid rgba(${pkg.rgb},0.4)`, color: pkg.accent, background: `rgba(${pkg.rgb},0.05)` }),
                    }}>
                   {packageContents[i].button}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHECKLIST CTA ───────────────────────────────── */}
        <section ref={setCkNode} className="py-16 px-6 md:px-10" style={{ background: C.bg }}>
          <div className="max-w-7xl mx-auto">
            <BentoCard className="p-10 flex flex-col md:flex-row items-center gap-8" accent={C.purple}>
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full" style={{ background: `rgba(157,92,255,0.15)`, filter: 'blur(15px)' }} />
                <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl font-black"
                  style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg, fontFamily: "'Montserrat', sans-serif" }}>✓</div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-bold text-2xl mb-2" style={{ fontFamily: "'Montserrat', sans-serif", color: C.white }}>{webChecklistTitle}</h2>
                <p style={{ color: C.soft, fontSize: 15 }}>{webChecklistDescription}</p>
              </div>
              <button className="px-8 py-4 font-bold uppercase tracking-widest text-xs shrink-0 transition-all duration-300 hover:scale-105"
                style={{ borderRadius: 9999, background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg, fontFamily: "'Montserrat', sans-serif", boxShadow: `0 0 25px rgba(157,92,255,0.3)` }}>
                {webChecklistButton}
              </button>
            </BentoCard>
          </div>
        </section>

        {/* ── CONTACTO ────────────────────────────────────── */}
       <section id="contacto" ref={setCtaNode} className="relative py-24 px-6 md:px-10 overflow-hidden" style={{ background: C.surface }}>

  {/* Fondo baseweb.svg */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `url("${baseweb}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 0,
    }}
  />

        <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: "'Montserrat', sans-serif", color: C.cyan }}>
                Contacto
              </p>
              <h2 className="font-black leading-tight" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', color: C.white }}>
                ¿Listo para el siguiente nivel?
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="flex flex-col gap-8">
                <p style={{ color: C.soft, fontSize: 15, lineHeight: 1.8 }}>
                  Agenda una sesión técnica y discutamos la arquitectura que tu empresa necesita para escalar.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: MapPin, text: 'MEXICO CP05880' },
                    { icon: Mail,   text: 'AIACO_E_M_P@hotmail.com' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{ background: `rgba(157,92,255,0.08)`, border: `1px solid ${C.border}` }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(157,92,255,0.4)`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                      >
                        <Icon size={16} style={{ color: C.purple }} />
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.soft }}>{text}</span>
                    </div>
                  ))}
                </div>
                <span className="font-black text-4xl" style={{ fontFamily: "'Montserrat', sans-serif", background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  AIACO
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  placeholder="Mensaje..." rows={5} required
                  style={{ ...inputStyle('message'), resize: 'none' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                <button type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105"
                  style={{ borderRadius: 9999, background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, color: C.bg, fontFamily: "'Montserrat', sans-serif", boxShadow: `0 0 20px rgba(157,92,255,0.25)` }}>
                  {sent ? '¡Enviado! ✓' : <><span>Iniciar Conversación</span><ArrowRight size={14} /></>}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="px-6 md:px-10 py-10" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, position: 'relative', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-black" style={{ fontFamily: "'Montserrat', sans-serif", background: `linear-gradient(90deg, ${C.purple}, ${C.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AIACO</span>
          <div className="flex gap-6">
            {['Política de Privacidad', 'Términos de Servicio', 'Cookies'].map(l => (
              <a key={l} href="#" className="text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
                style={{ fontFamily: "'Montserrat', sans-serif", color: C.muted }}
                onMouseEnter={e => e.currentTarget.style.color = C.white}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}
              >{l}</a>
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif", color: C.muted }}>
            © 2025 AIACO Agency
          </p>
        </div>
      </footer>
    </div>
  )
}
