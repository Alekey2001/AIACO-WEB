import { useEffect, useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import contaBg from '../assets/conta.svg'
import { CheckCircle2, XCircle, MapPin, Mail, ChevronDown, Shield, Briefcase, MessageCircle, Activity, Menu, X } from 'lucide-react'
import AccountNavAction from '../components/account/AccountNavAction'
import useContent from '../content/useContent'
// ── Constellation Canvas (fondo interactivo hero) ───────
function ConstellationCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId
    let width = 0, height = 0
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, vx: 0, vy: 0, radius: 180 }
    let nodes = []

    const NODE_RGB   = '255,255,255'
    const ACCENT_RGB = '0,238,252' // cian AIACO

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      initNodes()
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000 }

    const initNodes = () => {
      nodes = []
      const spacing = 60
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing, y = j * spacing
          nodes.push({ x, y, vx: 0, vy: 0, baseX: x, baseY: y, radius: Math.random() * 1.2 + 1, pulse: Math.random() * Math.PI * 2 })
        }
      }
    }

    handleResize()
    const ro = new ResizeObserver(handleResize)
    ro.observe(canvas.parentElement)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    let lastTime = performance.now()
    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1)
      mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1)
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy)

      ctx.clearRect(0, 0, width, height)

      const SPRING_K = 18, DAMPING = 0.82
      for (const n of nodes) {
        n.pulse += dt * 3
        const dx = mouse.x - n.x, dy = mouse.y - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius && dist > 0) {
          const power = 1 - dist / mouse.radius
          const force = power * (1200 + speed * 120)
          const angle = Math.atan2(dy, dx)
          n.vx -= Math.cos(angle) * force * dt
          n.vy -= Math.sin(angle) * force * dt
        }
        const hx = n.baseX - n.x, hy = n.baseY - n.y
        n.vx += hx * SPRING_K * dt
        n.vy += hy * SPRING_K * dt
        n.vx *= DAMPING
        n.vy *= DAMPING
        n.x += n.vx * dt * 60
        n.y += n.vy * dt * 60
      }

      const MAX_D = 70, MAX_D_SQ = MAX_D * MAX_D
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const ddx = n.x - n2.x, ddy = n.y - n2.y
          const distSq = ddx * ddx + ddy * ddy
          if (distSq < MAX_D_SQ) {
            const d = Math.sqrt(distSq)
            const alpha = (1 - d / MAX_D) * 0.15
            ctx.strokeStyle = `rgba(${NODE_RGB},${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isNear = dist < mouse.radius
        const baseAlpha = isNear ? 0.9 : 0.18 + Math.sin(n.pulse) * 0.08
        ctx.fillStyle = isNear ? `rgba(${ACCENT_RGB},${baseAlpha})` : `rgba(${NODE_RGB},${baseAlpha})`
        const r = isNear ? n.radius * 2 : n.radius + Math.sin(n.pulse) * 0.3
        ctx.beginPath()
        ctx.arc(n.x, n.y, Math.max(0.5, r), 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }
    animationFrameId = requestAnimationFrame(render)

    return () => {
      ro.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ pointerEvents: 'none' }} />
}

// ── Datos ──────────────────────────────────────────────
const navLinks = ['Soluciones', 'Precios', 'Proceso', 'FAQ']
const faqs = [
  { q: '¿Cómo emiten mis declaraciones?',           a: 'Presentamos tus declaraciones directamente en el portal del SAT con tu e.firma o CIEC, enviándote confirmación inmediata por WhatsApp y correo.' },
  { q: '¿Qué pasa si tengo multas previas?',        a: 'Realizamos un diagnóstico fiscal completo, identificamos multas y recargos, y gestionamos aclaraciones o convenios de pago ante el SAT.' },
  { q: '¿Puedo cambiar de paquete en cualquier momento?', a: 'Sí, puedes cambiar de paquete en cualquier momento. El ajuste se aplica a partir del siguiente periodo de facturación.' },
  { q: '¿Atienden regímenes como RESICO?',          a: 'Atendemos todos los regímenes fiscales vigentes en México: RESICO, RIF, Sueldos y Salarios, Arrendamiento, Actividad Empresarial y más.' },
  { q: '¿Qué seguridad tiene mi información?',      a: 'Tu información se almacena con encriptación de nivel bancario. Solo personal autorizado tiene acceso y nunca compartimos datos con terceros.' },
]

// ── Reveal Hook ────────────────────────────────────────
function useReveal() {
  const [visible, setVisible] = useState(false)
  const [node, setNode] = useState(null)
  useEffect(() => {
    if (!node) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target) }
    }, { threshold: 0.1 })
    obs.observe(node)
    return () => obs.disconnect()
  }, [node])
  return { elRef: setNode, visible }
}

// ── Glass Card — acabado metálico ─────────────────────
function GlassCard({ children, className = '', style = {}, glow = 'purple' }) {
  const glowColor =
    glow === 'cyan'
      ? 'rgba(0,238,252,0.28)'
      : 'rgba(189,0,255,0.28)'

  const borderColor =
    glow === 'cyan'
      ? 'rgba(0,238,252,0.22)'
      : 'rgba(189,0,255,0.20)'

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        background: `
          linear-gradient(
            145deg,
            rgba(255,255,255,0.055) 0%,
            rgba(255,255,255,0.025) 35%,
            rgba(27,32,41,0.52) 65%,
            rgba(10,14,23,0.62) 100%
          )
        `,
        backdropFilter: 'blur(22px) saturate(125%)',
        WebkitBackdropFilter: 'blur(22px) saturate(125%)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: `
          inset 0 1px 1px rgba(255,255,255,0.08),
          inset 0 -1px 1px rgba(0,0,0,0.35),
          0 12px 40px rgba(0,0,0,0.28)
        `,
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = borderColor
        e.currentTarget.style.boxShadow = `
          inset 0 1px 1px rgba(255,255,255,0.12),
          inset 0 -1px 1px rgba(0,0,0,0.4),
          0 0 30px ${glowColor},
          0 20px 50px rgba(0,0,0,0.38)
        `
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
        e.currentTarget.style.boxShadow = `
          inset 0 1px 1px rgba(255,255,255,0.08),
          inset 0 -1px 1px rgba(0,0,0,0.35),
          0 12px 40px rgba(0,0,0,0.28)
        `
      }}
    >
      {/* Reflejo metálico superior */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)',
          opacity: 0.55,
        }}
      />

      {/* Brillo metálico ambiental */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 260,
          height: 160,
          top: -100,
          right: -80,
          borderRadius: '50%',
          background:
            glow === 'cyan'
              ? 'rgba(0,238,252,0.055)'
              : 'rgba(189,0,255,0.055)',
          filter: 'blur(55px)',
        }}
      />

      {/* Contenido de la tarjeta */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// ── FAQ Item ───────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        background: `
          linear-gradient(
            145deg,
            rgba(255,255,255,0.055),
            rgba(255,255,255,0.018)
          )
        `,
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      }}
      onClick={() => setOpen(!open)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'rgba(0,238,252,0.28)'
        e.currentTarget.style.boxShadow =
          '0 0 30px rgba(0,238,252,0.08), 0 18px 45px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow =
          '0 12px 40px rgba(0,0,0,0.25)'
      }}
    >
      {/* Reflejo metálico superior */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '45%',
          height: 1,
          top: 0,
          left: '27.5%',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
          opacity: 0.7,
        }}
      />

      {/* Pregunta */}
      <div className="relative flex items-center justify-between px-6 py-5">
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: '#dfe2f0',
            letterSpacing: '-0.01em',
          }}
        >
          {q}
        </span>

        <ChevronDown
          size={18}
          style={{
            flexShrink: 0,
            marginLeft: 16,
            color: '#00eefc',
            filter: 'drop-shadow(0 0 6px rgba(0,238,252,0.35))',
            transform: open
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      {/* Respuesta */}
      {open && (
        <div
          className="relative px-6 pb-5"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 14,
            color: '#9d8ba0',
            lineHeight: 1.7,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 16,
          }}
        >
          {a}
        </div>
      )}
    </div>
  )
}
// ── Main Page ──────────────────────────────────────────
export default function Contabilidad() {
  const navigate = useNavigate()
    const accountingHeroTitle = useContent(
    'accounting_hero_title',
    'AIACO CONTABLE'
  )

  const accountingHeroDescription = useContent(
    'accounting_hero_description',
    'Contabilidad Inteligente y Blindaje Fiscal para Empresas.'
  )
    const accountingTitleParts =
    accountingHeroTitle.trim().split(/\s+/)

  const accountingBrand =
    accountingTitleParts[0] || 'AIACO'

  const accountingProduct =
accountingTitleParts.slice(1).join(' ') || 'CONTABLE'


  const kpiConfidentialityValue = useContent(
    'accounting_kpi_confidentiality_value',
    '100%'
  )

  const kpiConfidentialityLabel = useContent(
    'accounting_kpi_confidentiality_label',
    'Confidencialidad'
  )

  const kpiResponseValue = useContent(
    'accounting_kpi_response_value',
    '24h'
  )

  const kpiResponseLabel = useContent(
    'accounting_kpi_response_label',
    'Tiempo de respuesta'
  )

  const kpiDeclarationsValue = useContent(
    'accounting_kpi_declarations_value',
    '12/año'
  )

  const kpiDeclarationsLabel = useContent(
    'accounting_kpi_declarations_label',
    'Declaraciones'
  )

  const valueConfidentialityTitle = useContent(
    'accounting_value_confidentiality_title',
    'Confidencialidad total'
  )

  const valueConfidentialityDescription = useContent(
    'accounting_value_confidentiality_description',
    'Resguardo absoluto de tu información fiscal bajo protocolos encriptados.'
  )

  const valueBusinessTitle = useContent(
    'accounting_value_business_title',
    'Personas físicas y negocios'
  )

  const valueBusinessDescription = useContent(
    'accounting_value_business_description',
    'Adaptamos nuestras estrategias al tamaño de tu operación comercial.'
  )

  const valueCommunicationTitle = useContent(
    'accounting_value_communication_title',
    'Comunicación directa'
  )

  const valueCommunicationDescription = useContent(
    'accounting_value_communication_description',
    'Sin intermediarios ni demoras, atención personalizada vía WhatsApp y email.'
  )

  const valueTrackingTitle = useContent(
    'accounting_value_tracking_title',
    'Seguimiento continuo'
  )

  const valueTrackingDescription = useContent(
    'accounting_value_tracking_description',
    'Monitoreo 24/7 de tu estatus ante el SAT para prevenir irregularidades.'
  )

  const accountingKpis = [
    {
      value: kpiConfidentialityValue,
      label: kpiConfidentialityLabel,
      color: '#ecb2ff',
    },
    {
      value: kpiResponseValue,
      label: kpiResponseLabel,
      color: '#00eefc',
    },
    {
      value: kpiDeclarationsValue,
      label: kpiDeclarationsLabel,
      color: '#ecb2ff',
    },
  ]

  const accountingValueProps = [
    {
      icon: Shield,
      title: valueConfidentialityTitle,
      desc: valueConfidentialityDescription,
      color: '#ecb2ff',
    },
    {
      icon: Briefcase,
      title: valueBusinessTitle,
      desc: valueBusinessDescription,
      color: '#00eefc',
    },
    {
      icon: MessageCircle,
      title: valueCommunicationTitle,
      desc: valueCommunicationDescription,
      color: '#ecb2ff',
    },
    {
      icon: Activity,
      title: valueTrackingTitle,
      desc: valueTrackingDescription,
      color: '#00eefc',
    },
  ]
  const service1Title = useContent(
  'accounting_service_1_title',
  'Servicios Contables'
)

const service1Description = useContent(
  'accounting_service_1_description',
  'Contables y fiscales sin procesos complicados. Gestión integral de tus libros.'
)

const service2Title = useContent(
  'accounting_service_2_title',
  'Declaraciones'
)

const service2Description = useContent(
  'accounting_service_2_description',
  'Mensuales y anuales. Cumplimiento en tiempo según tu paquete y régimen fiscal actual.'
)

const service3Title = useContent(
  'accounting_service_3_title',
  'Emisión CFDI'
)

const service3Description = useContent(
  'accounting_service_3_description',
  'Control de facturas con límites claros por paquete. Recuperación masiva de comprobantes.'
)

const service4Title = useContent(
  'accounting_service_4_title',
  'e.firma y SAT'
)

const service4Description = useContent(
  'accounting_service_4_description',
  'Acompañamiento experto para trámites presenciales, generación y renovación de firmas.'
)

const service5Title = useContent(
  'accounting_service_5_title',
  'Devoluciones ISR'
)

const service5Description = useContent(
  'accounting_service_5_description',
  'Gestión automática de saldos a favor con seguimiento detallado en el portal del SAT.'
)

const accountingServices = [
  {
    title: service1Title,
    desc: service1Description,
    color: '#ecb2ff',
    wide: false,
  },
  {
    title: service2Title,
    desc: service2Description,
    color: '#00eefc',
    wide: false,
  },
  {
    title: service3Title,
    desc: service3Description,
    color: '#ecb2ff',
    wide: false,
  },
  {
    title: service4Title,
    desc: service4Description,
    color: '#ecb2ff',
    wide: false,
  },
  {
    title: service5Title,
    desc: service5Description,
    color: '#00eefc',
    wide: true,
  },
]
const planBasicTier = useContent(
  'accounting_plan_basic_tier',
  'Entry Level'
)

const planBasicName = useContent(
  'accounting_plan_basic_name',
  'Fiscal Básico'
)

const planBasicPrice = useContent(
  'accounting_plan_basic_price',
  '1500'
)

const planBasicPeriod = useContent(
  'accounting_plan_basic_period',
  'pago anual'
)

const planBasicFeature1 = useContent(
  'accounting_plan_basic_feature_1',
  'Declaración Anual'
)

const planBasicFeature2 = useContent(
  'accounting_plan_basic_feature_2',
  'Diagnóstico inicial'
)

const planBasicFeature3 = useContent(
  'accounting_plan_basic_feature_3',
  'Mensualidades'
)

const planProfessionalTier = useContent(
  'accounting_plan_professional_tier',
  'Core Growth'
)

const planProfessionalName = useContent(
  'accounting_plan_professional_name',
  'Fiscal Profesional'
)

const planProfessionalPrice = useContent(
  'accounting_plan_professional_price',
  '3000'
)

const planProfessionalPeriod = useContent(
  'accounting_plan_professional_period',
  'pago mensual'
)

const planProfessionalBadge = useContent(
  'accounting_plan_professional_badge',
  'Best Seller'
)

const planProfessionalFeature1 = useContent(
  'accounting_plan_professional_feature_1',
  'Mensual + Anual'
)

const planProfessionalFeature2 = useContent(
  'accounting_plan_professional_feature_2',
  'Facturación CFDI'
)

const planProfessionalFeature3 = useContent(
  'accounting_plan_professional_feature_3',
  'Opinión de cumplimiento'
)

const planProfessionalFeature4 = useContent(
  'accounting_plan_professional_feature_4',
  '24h Soporte'
)

const planPlusTier = useContent(
  'accounting_plan_plus_tier',
  'Quantum Max'
)

const planPlusName = useContent(
  'accounting_plan_plus_name',
  'Fiscal Plus'
)

const planPlusPrice = useContent(
  'accounting_plan_plus_price',
  '5500'
)

const planPlusPeriod = useContent(
  'accounting_plan_plus_period',
  'pago mensual'
)

const planPlusFeature1 = useContent(
  'accounting_plan_plus_feature_1',
  'Todo en Profesional'
)

const planPlusFeature2 = useContent(
  'accounting_plan_plus_feature_2',
  'IMSS / Infonavit'
)

const planPlusFeature3 = useContent(
  'accounting_plan_plus_feature_3',
  'Asesoría Ilimitada'
)

const planPlusFeature4 = useContent(
  'accounting_plan_plus_feature_4',
  'Representación SAT'
)
const formatPrice = value => {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return value
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(numericValue)
}
const accountingPlans = [
  {
    tier: planBasicTier,
    name: planBasicName,
    price: formatPrice(planBasicPrice),
    period: planBasicPeriod,
    color: '#ecb2ff',
    recommended: false,
    features: [
      {
        text: planBasicFeature1,
        ok: true,
      },
      {
        text: planBasicFeature2,
        ok: true,
      },
      {
        text: planBasicFeature3,
        ok: false,
      },
    ],
  },

  {
    tier: planProfessionalTier,
    name: planProfessionalName,
    price: formatPrice(planProfessionalPrice),
    period: planProfessionalPeriod,
    color: '#bd00ff',
    recommended: true,
    badge: planProfessionalBadge,
    features: [
      {
        text: planProfessionalFeature1,
        ok: true,
      },
      {
        text: planProfessionalFeature2,
        ok: true,
      },
      {
        text: planProfessionalFeature3,
        ok: true,
      },
      {
        text: planProfessionalFeature4,
        ok: true,
      },
    ],
  },

  {
    tier: planPlusTier,
    name: planPlusName,
    price: formatPrice(planPlusPrice),
    period: planPlusPeriod,
    color: '#00eefc',
    recommended: false,
    features: [
      {
        text: planPlusFeature1,
        ok: true,
      },
      {
        text: planPlusFeature2,
        ok: true,
      },
      {
        text: planPlusFeature3,
        ok: true,
      },
      {
        text: planPlusFeature4,
        ok: true,
      },
    ],
  },
]
const process1Title = useContent(
  'accounting_process_1_title',
  'Diagnóstico'
)

const process1Description = useContent(
  'accounting_process_1_description',
  'Análisis exhaustivo de tu historial fiscal para identificar brechas y oportunidades.'
)

const process2Title = useContent(
  'accounting_process_2_title',
  'Orden y ejecución'
)

const process2Description = useContent(
  'accounting_process_2_description',
  'Implementación de sistemas de control y presentación puntual de declaraciones.'
)

const process3Title = useContent(
  'accounting_process_3_title',
  'Seguimiento'
)

const process3Description = useContent(
  'accounting_process_3_description',
  'Monitoreo continuo y ajustes estratégicos para optimizar tu carga tributaria.'
)
const accountingSteps = [
  {
    num: '01',
    title: process1Title,
    desc: process1Description,
    color: '#ecb2ff',
  },
  {
    num: '02',
    title: process2Title,
    desc: process2Description,
    color: '#00eefc',
  },
  {
    num: '03',
    title: process3Title,
    desc: process3Description,
    color: '#ecb2ff',
  },
]
  const heroR    = useReveal()
  const kpiR     = useReveal()
  const valR     = useReveal()
  const svcR     = useReveal()
  const planR    = useReveal()
  const stepR    = useReveal()
  const faqR     = useReveal()
  const ctaR     = useReveal()

  const [form, setForm]       = useState({ name: '', phone: '', email: '', interest: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [focused, setFocused] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('soluciones')


  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', phone: '', email: '', interest: '', message: '' })
  }

  const reveal = (r) => ({
    ref: r.elRef,
    style: { transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)', opacity: r.visible ? 1 : 0, transform: r.visible ? 'translateY(0)' : 'translateY(40px)' }
  })

  const inputStyle = (name) => ({
    width: '100%',
    background: 'rgba(27,32,41,0.6)',
    border: '1px solid',
    borderColor: focused === name ? '#00eefc' : 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#dfe2f0',
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.3s',
    boxShadow: focused === name ? '0 0 10px rgba(0,238,252,0.2)' : 'none',
  })
useEffect(() => {
  const ids = ['soluciones', 'precios', 'proceso', 'faq']
  const onScroll = () => {
    setIsScrolled(window.scrollY > 40)
    const bottom = window.scrollY + window.innerHeight
    if (bottom >= document.documentElement.scrollHeight - 50) { setActiveSection('faq'); return }
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
  return (
    <div style={{ background: '#070b14', minHeight: '100vh', fontFamily: "'Sora', sans-serif", color: '#dfe2f0', overflowX: 'hidden' }}>

      {/* Glows ambientales */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div style={{ position: 'absolute', width: 600, height: 600, top: -100, left: -200, background: '#bd00ff', borderRadius: '100%', filter: 'blur(80px)', opacity: 0.12 }} />
        <div style={{ position: 'absolute', width: 500, height: 500, bottom: 100, right: -100, background: '#00eefc', borderRadius: '100%', filter: 'blur(80px)', opacity: 0.12 }} />
      </div>

     {/* ── NAVBAR ── */}
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
    <a key={l} href={`#${id}`}
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
    <a key={l} href={`#${id}`}
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
      <main>

    {/* ── HERO ── */}
<section
  className="relative min-h-[760px] pt-28 pb-16 overflow-hidden"
  {...reveal(heroR)}
>
  {/* ─────────────────────────────────────────────
      FONDO CINEMÁTICO — SOLO HERO
  ───────────────────────────────────────────── */}

  <div className="absolute inset-0 z-0 overflow-hidden">

    {/* Video del concepto Aura */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        opacity: 0.28,
        filter: 'brightness(0.55) saturate(0.75)',
      }}
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
    />

    {/* Capa oscura */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(
            circle at 50% 35%,
            rgba(0,238,252,0.12),
            transparent 38%
          ),
          linear-gradient(
            180deg,
            rgba(7,11,20,0.65) 0%,
            rgba(7,11,20,0.82) 55%,
            #070b14 100%
          )
        `,
      }}
    />

    {/* Glow púrpura */}
    <div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        top: -180,
        left: '15%',
        background: '#bd00ff',
        filter: 'blur(150px)',
        opacity: 0.10,
      }}
    />

    {/* Glow cyan */}
    <div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        top: 120,
        right: '10%',
        background: '#00eefc',
        filter: 'blur(150px)',
        opacity: 0.08,
      }}
    />

    {/* Partículas existentes, conservadas */}
    <div
      className="absolute inset-0"
      style={{ opacity: 0.45 }}
    >
      <ConstellationCanvas />
    </div>

    {/* SVG Noise */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.18, mixBlendMode: 'overlay' }}
    >
      <defs>
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0.35 0
            "
          />
          <feComposite
            in2="SourceGraphic"
            operator="in"
            result="noise"
          />
          <feBlend
            in="SourceGraphic"
            in2="noise"
            mode="multiply"
          />
        </filter>
      </defs>

      <rect
        width="100%"
        height="100%"
        filter="url(#hero-noise)"
      />
    </svg>

  </div>


  {/* ─────────────────────────────────────────────
      CONTENIDO PRINCIPAL DEL HERO
  ───────────────────────────────────────────── */}

  <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

    {/* Eyebrow */}
    <div
      className="inline-flex items-center gap-2 py-1.5 px-4 mb-8 rounded-full"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#dfe2f0',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: '#00eefc',
          boxShadow: '0 0 10px #00eefc',
        }}
      />

      <span className="text-xs font-bold uppercase tracking-widest">
        Contabilidad • México • SAT • CFDI
      </span>

      <span
        className="px-2 py-0.5 rounded-full text-[10px]"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        AI-NATIVE
      </span>
    </div>


    {/* TÍTULO PRINCIPAL */}
    <h1
      className="font-semibold tracking-tight leading-[0.88] mb-8"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 'clamp(58px, 10vw, 120px)',
        letterSpacing: '-0.055em',
        textShadow: '0 10px 50px rgba(0,0,0,0.45)',
      }}
    >
      <span
        className="block"
        style={{
          color: '#ffffff',
        }}
      >
      {accountingBrand}
      </span>

      <span
        className="hero-shiny-text block"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #091020 0%,
              #0B2551 12.5%,
              #A4F4FD 32.5%,
              #00d2ff 50%,
              #0B2551 67.5%,
              #091020 87.5%,
              #091020 100%
            )
          `,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
       {accountingProduct}
      </span>
    </h1>


    {/* DESCRIPCIÓN ORIGINAL */}
    <p
      className="mx-auto mb-10 max-w-2xl"
      style={{
        fontSize: 18,
        color: 'rgba(255,255,255,0.60)',
        lineHeight: 1.6,
        letterSpacing: '-0.01em',
      }}
    >
      {accountingHeroDescription}
    </p>


    {/* BOTONES ORIGINALES */}
    <div className="flex flex-wrap justify-center gap-4">

      <button
        onClick={() =>
          document
            .getElementById('precios')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="group inline-flex items-center justify-center px-7 py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300"
        style={{
          borderRadius: 9999,
          background: '#ffffff',
          color: '#070b14',
          fontFamily: "'JetBrains Mono', monospace",
          boxShadow: `
            0 0 30px rgba(0,238,252,0.18),
            0 8px 30px rgba(0,0,0,0.35)
          `,
          letterSpacing: '0.15em',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform =
            'translateY(-2px) scale(1.02)'
          e.currentTarget.style.boxShadow =
            '0 0 35px rgba(0,238,252,0.35), 0 10px 35px rgba(0,0,0,0.4)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform =
            'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow =
            '0 0 30px rgba(0,238,252,0.18), 0 8px 30px rgba(0,0,0,0.35)'
        }}
      >
        Ver paquetes
      </button>


      <button
        onClick={() =>
          document
            .getElementById('contacto')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="inline-flex items-center justify-center px-7 py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300"
        style={{
          borderRadius: 9999,
          border: '1px solid rgba(255,255,255,0.16)',
          color: '#ffffff',
          fontFamily: "'JetBrains Mono', monospace",
          background: 'rgba(255,255,255,0.035)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
          letterSpacing: '0.15em',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background =
            'rgba(255,255,255,0.08)'
          e.currentTarget.style.borderColor =
            'rgba(255,255,255,0.3)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background =
            'rgba(255,255,255,0.035)'
          e.currentTarget.style.borderColor =
            'rgba(255,255,255,0.16)'
        }}
      >
        Hablar con asesor
      </button>

    </div>


    {/* Indicador */}
    <div
      className="mt-7 text-xs"
      style={{
        color: 'rgba(255,255,255,0.30)',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      Inteligencia fiscal · Seguridad · Automatización
    </div>

  </div>


  {/* ─────────────────────────────────────────────
      KPI BAR — MISMO CONTENIDO
  ───────────────────────────────────────────── */}

  <div
    className="relative z-10 max-w-6xl mx-auto px-6 w-full mt-20"
    {...reveal(kpiR)}
  >
    <div
      className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: `
          inset 0 1px 1px rgba(255,255,255,0.08),
          0 20px 60px rgba(0,0,0,0.30)
        `,
      }}
    >
      {accountingKpis.map((kpi, i) => (
        <div
          key={i}
          className="flex flex-col items-center py-7 px-4"
          style={{
            borderRight:
              i < 2
                ? '1px solid rgba(255,255,255,0.08)'
                : 'none',
          }}
        >
          <span
            className="font-black mb-2"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 38,
              color: kpi.color,
              textShadow: `0 0 25px ${kpi.color}40`,
            }}
          >
            {kpi.value}
          </span>

          <span
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(255,255,255,0.42)',
            }}
          >
            {kpi.label}
          </span>
        </div>
      ))}
    </div>
  </div>


  {/* Animación shiny del título */}
  <style>{`
    @keyframes hero-shiny {
      0% {
        background-position: -200% center;
      }

      100% {
        background-position: 200% center;
      }
    }

    .hero-shiny-text {
      animation: hero-shiny 6s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-shiny-text {
        animation: none;
      }
    }
  `}</style>

</section>

     {/* ── VALUE PROPS / FISCAL SHIELD ── */}
<section
  className="relative py-28 px-6 md:px-20 max-w-7xl mx-auto overflow-hidden"
  {...reveal(valR)}
>
  {/* Glow ambiental de la sección */}
  <div
    className="absolute pointer-events-none"
    style={{
      width: 420,
      height: 420,
      top: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,238,252,0.08), transparent 68%)',
      filter: 'blur(20px)',
    }}
  />

  {/* ─────────────────────────────────────────
      ENCABEZADO
  ───────────────────────────────────────── */}

  <div className="relative z-10 text-center mb-16">

    {/* Micro etiqueta */}
    <div
      className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: '#00eefc',
          boxShadow: '0 0 12px rgba(0,238,252,0.9)',
        }}
      />

      <span
        className="text-[10px] md:text-xs uppercase tracking-[0.22em]"
        style={{ color: 'rgba(255,255,255,0.48)' }}
      >
        AIACO · FISCAL SHIELD
      </span>
    </div>


    {/* Título */}
    <h2
      className="font-bold text-white mb-5"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 'clamp(34px, 5vw, 56px)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}
    >
      Protección fiscal
      <br />

      <span
        style={{
          backgroundImage:
            'linear-gradient(90deg, #ecb2ff, #00eefc)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        sin puntos débiles.
      </span>
    </h2>


    {/* Descripción */}
    <p
      className="max-w-2xl mx-auto"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 15,
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.42)',
      }}
    >
      Cada aspecto de tu operación fiscal está respaldado
      por procesos diseñados para mantenerla segura,
      ordenada y bajo control.
    </p>
  </div>


  {/* ─────────────────────────────────────────
      GRID DE PROTECCIONES
  ───────────────────────────────────────── */}

  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">

    {accountingValueProps.map((v, i) => {
      const Icon = v.icon
      const isCyan = i % 2 !== 0

      const accent = isCyan
        ? '#00eefc'
        : '#ecb2ff'

      const rgb = isCyan
        ? '0,238,252'
        : '236,178,255'

      return (
        <div
          key={i}
          className="group relative rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            minHeight: 245,
            background: `
              linear-gradient(
                145deg,
                rgba(255,255,255,0.045),
                rgba(255,255,255,0.012)
              )
            `,
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform =
              'translateY(-6px)'

            e.currentTarget.style.borderColor =
              `rgba(${rgb},0.38)`

            e.currentTarget.style.boxShadow =
              `0 0 35px rgba(${rgb},0.10), 0 20px 50px rgba(0,0,0,0.35)`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform =
              'translateY(0)'

            e.currentTarget.style.borderColor =
              'rgba(255,255,255,0.08)'

            e.currentTarget.style.boxShadow =
              '0 12px 40px rgba(0,0,0,0.25)'
          }}
        >

          {/* Glow interno */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 220,
              height: 220,
              top: -100,
              right: -80,
              borderRadius: '50%',
              background: `rgba(${rgb},0.08)`,
              filter: 'blur(60px)',
              transition: 'opacity 0.5s',
            }}
          />


          {/* Línea superior */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(
                90deg,
                transparent,
                ${accent},
                transparent
              )`,
              opacity: 0.45,
            }}
          />


          <div className="relative z-10 p-7 md:p-9">

            {/* Número */}
            <div className="flex items-center justify-between mb-8">

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: `rgba(${rgb},0.65)`,
                }}
              >
                PROTOCOL // 0{i + 1}
              </span>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.20)',
                }}
              >
                0{i + 1}
              </span>

            </div>


            {/* Icono */}
            <div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-all duration-500"
              style={{
                background: `rgba(${rgb},0.07)`,
                border: `1px solid rgba(${rgb},0.25)`,
                boxShadow: `0 0 20px rgba(${rgb},0.08)`,
              }}
            >
              <Icon
                size={22}
                strokeWidth={1.7}
                style={{
                  color: accent,
                  filter: `drop-shadow(0 0 8px rgba(${rgb},0.35))`,
                }}
              />
            </div>


            {/* Título */}
            <h3
              className="font-bold text-lg md:text-xl mb-3"
              style={{
                fontFamily: "'Sora', sans-serif",
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {v.title}
            </h3>


            {/* Descripción */}
            <p
              className="text-sm max-w-xl"
              style={{
                fontFamily: "'Sora', sans-serif",
                color: '#9d8ba0',
                lineHeight: 1.75,
              }}
            >
              {v.desc}
            </p>


            {/* Indicador inferior */}
            <div
              className="mt-7 flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                color: `rgba(${rgb},0.48)`,
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />

              PROTOCOLO ACTIVO
            </div>

          </div>
        </div>
      )
    })}

  </div>


  {/* ─────────────────────────────────────────
      LÍNEA INFERIOR DE SEGURIDAD
  ───────────────────────────────────────── */}

  <div className="relative z-10 flex items-center justify-center mt-10">

    <div
      className="hidden md:block h-px flex-1"
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))',
      }}
    />

    <div
      className="mx-5 flex items-center gap-3 px-5 py-2 rounded-full"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Shield
        size={13}
        style={{
          color: '#00eefc',
          filter: 'drop-shadow(0 0 6px rgba(0,238,252,0.5))',
        }}
      />

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        PROTECCIÓN CONTINUA · AIACO CONTABLE
      </span>
    </div>

    <div
      className="hidden md:block h-px flex-1"
      style={{
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
      }}
    />

  </div>

</section>

       {/* ── SERVICIOS ── */}
<section
  id="soluciones"
  className="relative w-full py-24 px-6 md:px-20 overflow-hidden"
  {...reveal(svcR)}
>

  {/* ── SVG DE FONDO ── */}
  <img
    src={contaBg}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
      opacity: 0.45,
      zIndex: 0,
    }}
  />

  {/* ── CAPA OSCURA ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'linear-gradient(180deg, rgba(7,11,20,0.35) 0%, rgba(7,11,20,0.55) 55%, rgba(7,11,20,0.78) 100%)',
      zIndex: 1,
    }}
  />

  {/* ── CONTENIDO DE LA SECCIÓN ── */}
  <div className="relative z-10 max-w-7xl mx-auto">

    {/* ENCABEZADO */}
    <div className="text-center mb-12">

      <h2
        className="font-bold mb-4"
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 40,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          textShadow: '0 4px 25px rgba(0,0,0,0.5)',
        }}
      >
        Soluciones de Próxima Generación
      </h2>

      <div
        style={{
          height: 3,
          width: 60,
          background: 'linear-gradient(90deg, #bd00ff, #00eefc)',
          margin: '0 auto',
          borderRadius: 9999,
        }}
      />

    </div>

    {/* TARJETAS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {accountingServices.map((s, i) => (
       <GlassCard
  key={i}
  glow={i % 2 === 0 ? 'purple' : 'cyan'}
  className={`p-8 relative overflow-hidden ${
    s.wide ? 'md:col-span-2' : ''
  }`}
>

          {/* Icono */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{
              background: `rgba(${
                i % 2 === 0 ? '189,0,255' : '0,238,252'
              },0.1)`,
              border: `1px solid rgba(${
                i % 2 === 0 ? '189,0,255' : '0,238,252'
              },0.3)`,
            }}
          >

            {i === 0 && (
              <Briefcase
                size={20}
                style={{ color: s.color }}
              />
            )}

            {i === 1 && (
              <CheckCircle2
                size={20}
                style={{ color: s.color }}
              />
            )}

            {i === 2 && (
              <Activity
                size={20}
                style={{ color: s.color }}
              />
            )}

            {i === 3 && (
              <Shield
                size={20}
                style={{ color: s.color }}
              />
            )}

            {i === 4 && (
              <Activity
                size={20}
                style={{ color: s.color }}
              />
            )}

          </div>

          {/* Título */}
          <h4
            className="font-bold text-xl mb-3"
            style={{
              fontFamily: "'Sora', sans-serif",
              color: s.color,
            }}
          >
            {s.title}
          </h4>

          {/* Descripción */}
          <p
            className="text-sm leading-relaxed"
            style={{
              color: '#9d8ba0',
            }}
          >
            {s.desc}
          </p>

        </GlassCard>
      ))}

    </div>

  </div>

</section>

      {/* ── PLANES ── */}
<section
  id="precios"
  className="py-24 px-6 md:px-20 max-w-7xl mx-auto"
  {...reveal(planR)}
>
  <h2
    className="font-bold text-center mb-20"
    style={{
      fontFamily: "'Sora', sans-serif",
      fontSize: 40,
      letterSpacing: '-0.02em',
    }}
  >
    Planes de Inteligencia Fiscal
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
    {accountingPlans.map((plan, i) => (
      <div
        key={i}
        className="group relative rounded-3xl p-8 flex flex-col items-center overflow-hidden transition-all duration-500"
        style={{
          background: `
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055) 0%,
              rgba(255,255,255,0.025) 35%,
              rgba(27,32,41,0.52) 65%,
              rgba(10,14,23,0.62) 100%
            )
          `,
          backdropFilter: 'blur(22px) saturate(125%)',
          WebkitBackdropFilter: 'blur(22px) saturate(125%)',

          border: plan.recommended
            ? '1px solid rgba(189,0,255,0.38)'
            : '1px solid rgba(255,255,255,0.10)',

          boxShadow: plan.recommended
            ? `
              inset 0 1px 1px rgba(255,255,255,0.10),
              inset 0 -1px 1px rgba(0,0,0,0.35),
              0 0 30px rgba(189,0,255,0.16),
              0 12px 40px rgba(0,0,0,0.30)
            `
            : `
              inset 0 1px 1px rgba(255,255,255,0.08),
              inset 0 -1px 1px rgba(0,0,0,0.35),
              0 12px 40px rgba(0,0,0,0.28)
            `,

          transform: plan.recommended
            ? 'scale(1.05)'
            : 'scale(1)',

          zIndex: plan.recommended ? 10 : 1,
        }}

        onMouseEnter={e => {
          e.currentTarget.style.transform = plan.recommended
            ? 'scale(1.07) translateY(-6px)'
            : 'scale(1.02) translateY(-6px)'

          e.currentTarget.style.boxShadow = plan.recommended
            ? `
              inset 0 1px 1px rgba(255,255,255,0.12),
              inset 0 -1px 1px rgba(0,0,0,0.4),
              0 0 35px rgba(189,0,255,0.25),
              0 20px 50px rgba(0,0,0,0.38)
            `
            : `
              inset 0 1px 1px rgba(255,255,255,0.12),
              inset 0 -1px 1px rgba(0,0,0,0.4),
              0 0 25px ${plan.color}22,
              0 20px 50px rgba(0,0,0,0.38)
            `
        }}

        onMouseLeave={e => {
          e.currentTarget.style.transform = plan.recommended
            ? 'scale(1.05)'
            : 'scale(1)'

          e.currentTarget.style.boxShadow = plan.recommended
            ? `
              inset 0 1px 1px rgba(255,255,255,0.10),
              inset 0 -1px 1px rgba(0,0,0,0.35),
              0 0 30px rgba(189,0,255,0.16),
              0 12px 40px rgba(0,0,0,0.30)
            `
            : `
              inset 0 1px 1px rgba(255,255,255,0.08),
              inset 0 -1px 1px rgba(0,0,0,0.35),
              0 12px 40px rgba(0,0,0,0.28)
            `
        }}
      >

        {/* Reflejo metálico superior */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)',
            opacity: 0.55,
          }}
        />

        {/* Brillo ambiental */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 260,
            height: 160,
            top: -100,
            right: -80,
            borderRadius: '50%',
            background:
              plan.color === '#00eefc'
                ? 'rgba(0,238,252,0.055)'
                : 'rgba(189,0,255,0.055)',
            filter: 'blur(55px)',
          }}
        />

        {/* Best Seller */}
        {plan.badge && (
          <div
            className="absolute -top-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: '#bd00ff',
              color: '#fff',
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: '0 0 18px rgba(189,0,255,0.35)',
            }}
          >
            {plan.badge}
          </div>
        )}

        {/* Contenido */}
        <div className="relative z-10 w-full flex flex-col items-center">

          <span
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: plan.color,
            }}
          >
            {plan.tier}
          </span>

          <h3
            className="font-bold text-2xl text-white mb-4"
            style={{
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {plan.name}
          </h3>

          <div
            className="font-black mb-1"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 40,
              color: '#00eefc',
            }}
          >
            {plan.price}{' '}
            <span
              className="text-sm font-normal"
              style={{
                color: '#9d8ba0',
              }}
            >
              MXN
            </span>
          </div>

          <span
            className="text-sm mb-6"
            style={{
              color: '#9d8ba0',
            }}
          >
            {plan.period}
          </span>

          <ul
            className="w-full flex flex-col gap-3 mb-8 pt-6"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            {plan.features.map((f, j) => (
              <li
                key={j}
                className="flex items-center gap-2 text-sm"
                style={{
                  color: f.ok
                    ? '#dfe2f0'
                    : '#514255',
                }}
              >
                {f.ok ? (
                  <CheckCircle2
                    size={16}
                    style={{
                      color: plan.color,
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <XCircle
                    size={16}
                    style={{
                      color: '#514255',
                      flexShrink: 0,
                    }}
                  />
                )}

                {f.text}
              </li>
            ))}
          </ul>

          <button
            onClick={() =>
              document
                .getElementById('contacto')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="w-full py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              borderRadius: 9999,
              fontFamily: "'JetBrains Mono', monospace",

              ...(plan.recommended
                ? {
                    background:
                      'linear-gradient(135deg, #bd00ff, #00eefc)',
                    color: '#fff',
                    boxShadow:
                      '0 0 20px rgba(189,0,255,0.4)',
                  }
                : {
                    border:
                      '1px solid rgba(255,255,255,0.20)',
                    color: '#dfe2f0',
                    background: 'rgba(255,255,255,0.025)',
                  }),
            }}
          >
            Seleccionar
          </button>

        </div>
      </div>
    ))}
  </div>
</section>

      {/* ── FLUJO OPERATIVO ── */}
<section
  id="proceso"
  className="relative w-full py-24 px-6 md:px-20 overflow-hidden"
  {...reveal(stepR)}
>

  {/* ── SVG DE FONDO ── */}
  <img
    src={contaBg}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
      opacity: 0.35,
      zIndex: 0,
    }}
  />

  {/* ── CAPA OSCURA ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'linear-gradient(180deg, rgba(7,11,20,0.40) 0%, rgba(7,11,20,0.58) 55%, rgba(7,11,20,0.80) 100%)',
      zIndex: 1,
    }}
  />

  {/* ── REFLEJO TECNOLÓGICO ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'radial-gradient(circle at 20% 30%, rgba(189,0,255,0.08), transparent 32%), radial-gradient(circle at 80% 65%, rgba(0,238,252,0.07), transparent 35%)',
      zIndex: 2,
    }}
  />

  {/* ── CONTENIDO ── */}
  <div className="relative z-10 max-w-7xl mx-auto">

    <h2
      className="font-bold text-center mb-16"
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 40,
        letterSpacing: '-0.02em',
      }}
    >
      Flujo Operativo
    </h2>

    <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">

      <div
        className="hidden md:block absolute"
        style={{
          top: 40,
          left: 0,
          width: '100%',
          height: 1,
          background:
            'linear-gradient(90deg, #bd00ff, #00eefc, #bd00ff)',
          opacity: 0.2,
          zIndex: 0,
        }}
      />

     {accountingSteps.map((s, i) => (

        <div
          key={i}
          className="flex-1 flex flex-col items-center text-center relative z-10"
        >

          <div
            className="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl mb-6 transition-all duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: 'rgba(27,32,41,0.4)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${s.color}`,
              color: s.color,
              boxShadow: `0 0 15px ${s.color}33`,
            }}
          >
            {s.num}
          </div>

          <h4
            className="font-bold text-xl mb-3 text-white"
            style={{
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {s.title}
          </h4>

          <p
            className="text-sm px-4 leading-relaxed"
            style={{
              color: '#9d8ba0',
            }}
          >
            {s.desc}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 px-6 md:px-20 max-w-4xl mx-auto" {...reveal(faqR)}>
          <h2 className="font-bold text-center mb-12" style={{ fontFamily: "'Sora', sans-serif", fontSize: 40, letterSpacing: '-0.02em' }}>
            Preguntas Frecuentes
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
          </div>
        </section>

      {/* ── CONTACTO ── */}
<section
  id="contacto"
  className="relative w-full py-24 px-6 md:px-20 overflow-hidden"
  {...reveal(ctaR)}
>

  {/* ── SVG DE FONDO ── */}
  <img
    src={contaBg}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
      opacity: 0.45,
      zIndex: 0,
    }}
  />

  {/* ── CAPA OSCURA ── */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'linear-gradient(180deg, rgba(7,11,20,0.35) 0%, rgba(7,11,20,0.55) 55%, rgba(7,11,20,0.78) 100%)',
      zIndex: 1,
    }}
  />

  {/* ── TARJETA DE CONTACTO ── */}
  <div
    className="relative z-10 max-w-7xl mx-auto rounded-3xl p-10 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden transition-all duration-500"
    style={{
      background: `
        linear-gradient(
          145deg,
          rgba(255,255,255,0.055),
          rgba(255,255,255,0.018)
        )
      `,
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor =
        'rgba(0,238,252,0.25)'

      e.currentTarget.style.boxShadow =
        '0 0 35px rgba(0,238,252,0.08), 0 20px 55px rgba(0,0,0,0.35)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor =
        'rgba(255,255,255,0.08)'

      e.currentTarget.style.boxShadow =
        '0 12px 40px rgba(0,0,0,0.25)'
    }}
  >
            <div>
              <h2 className="font-bold text-3xl text-white mb-4" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
                Inicia tu Transformación Fiscal
              </h2>
              <p className="mb-8" style={{ color: '#9d8ba0', fontSize: 15, lineHeight: 1.7 }}>
                Nuestro equipo de contadores certificados está listo para analizar tu situación y proponer la mejor estrategia fiscal.
              </p>
              <div className="flex flex-col gap-4">

  {/* WhatsApp */}
  <a
    href="https://wa.me/52216512345678"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 group"
    style={{ textDecoration: 'none' }}
  >
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: 'rgba(0,238,252,0.08)',
        border: '1px solid rgba(0,238,252,0.3)',
        color: '#00eefc',
      }}
    >
      <MessageCircle size={16} />
    </div>

    <span
      className="transition-all duration-300"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#9d8ba0',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#00eefc'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#9d8ba0'
      }}
    >
      Hablar por WhatsApp
    </span>
  </a>


  {/* Correo */}
  <a
    href="mailto:AIACO_E_M_P@hotmail.com"
    className="flex items-center gap-4 group"
    style={{ textDecoration: 'none' }}
  >
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: 'rgba(189,0,255,0.1)',
        border: '1px solid rgba(189,0,255,0.3)',
        color: '#ecb2ff',
      }}
    >
      <Mail size={16} />
    </div>

    <span
      className="transition-all duration-300"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#9d8ba0',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#ecb2ff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#9d8ba0'
      }}
    >
      AIACO_E_M_P@hotmail.com
    </span>
  </a>


  {/* Ubicación */}
  <div className="flex items-center gap-4">
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: 'rgba(189,0,255,0.1)',
        border: '1px solid rgba(189,0,255,0.3)',
        color: '#ecb2ff',
      }}
    >
      <MapPin size={16} />
    </div>

    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#9d8ba0',
      }}
    >
      CDMX, México
    </span>
  </div>

</div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="Nombre Completo" required style={inputStyle('name')}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="+52" style={inputStyle('phone')}
                  onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} />
              </div>
              <input value={form.email} type="email" onChange={e => setForm({...form, email: e.target.value})}
                placeholder="correo@ejemplo.com" required style={inputStyle('email')}
                onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
              <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})}
                style={{ ...inputStyle('interest'), appearance: 'none' }}
                onFocus={() => setFocused('interest')} onBlur={() => setFocused('')}>
                <option value="" style={{ background: '#1b2029' }}>Paquete de interés</option>
                <option value="basico"       style={{ background: '#1b2029' }}>Fiscal Básico — $1,500 MXN</option>
                <option value="profesional"  style={{ background: '#1b2029' }}>Fiscal Profesional — $3,000 MXN</option>
                <option value="plus"         style={{ background: '#1b2029' }}>Fiscal Plus — $5,500 MXN</option>
              </select>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                placeholder="Describe tu situación fiscal actual..." rows={4}
                style={{ ...inputStyle('message'), resize: 'none' }}
                onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
              <button type="submit"
                className="w-full py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105"
                style={{ borderRadius: 9999, background: 'linear-gradient(135deg, #bd00ff, #00eefc)', color: '#fff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em', boxShadow: '0 0 20px rgba(189,0,255,0.4)' }}>
                {sent ? '¡Solicitud enviada! ✓' : 'Enviar solicitud'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-20 py-10" style={{ borderTop: '1px solid rgba(81,66,85,0.3)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-black text-xl" style={{ fontFamily: "'Sora', sans-serif", color: '#ecb2ff' }}>AIACO</span>
          <div className="flex gap-6">
            {['Security Protocol', 'Privacy Policy', 'SAT Integration'].map(l => (
              <a key={l} href="#" className="text-xs uppercase tracking-widest transition-colors duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#9d8ba0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00eefc'}
                onMouseLeave={e => e.currentTarget.style.color = '#9d8ba0'}
              >{l}</a>
            ))}
          </div>
        </div>
        <div className="text-center text-xs uppercase tracking-widest mt-6 pt-6" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#514255', borderTop: '1px solid rgba(81,66,85,0.2)' }}>
          © 2025 AIACO Quantum Tax Systems. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
