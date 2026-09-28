import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Save,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContentContext } from '../../content/useContentContext'

const SECTION_CONFIG = [
  {
    id: 'hero',
    title: 'Hero principal',
    description:
      'Título y descripción principal de AIACO Contable.',
    keys: [
      {
        key: 'accounting_hero_title',
        label: 'Título principal',
      },
      {
        key: 'accounting_hero_description',
        label: 'Descripción principal',
      },
    ],
  },

  {
    id: 'kpis',
    title: 'Indicadores KPI',
    description:
      'Valores visibles debajo del Hero.',
    keys: [
      {
        key: 'accounting_kpi_confidentiality_value',
        label: 'Confidencialidad — Valor',
      },
      {
        key: 'accounting_kpi_confidentiality_label',
        label: 'Confidencialidad — Etiqueta',
      },
      {
        key: 'accounting_kpi_response_value',
        label: 'Tiempo de respuesta — Valor',
      },
      {
        key: 'accounting_kpi_response_label',
        label: 'Tiempo de respuesta — Etiqueta',
      },
      {
        key: 'accounting_kpi_declarations_value',
        label: 'Declaraciones — Valor',
      },
      {
        key: 'accounting_kpi_declarations_label',
        label: 'Declaraciones — Etiqueta',
      },
    ],
  },

  {
    id: 'protection',
    title: 'Protección fiscal',
    description:
      'Bloques de valor y beneficios principales.',
    keys: [
      {
        key: 'accounting_value_confidentiality_title',
        label: 'Confidencialidad — Título',
      },
      {
        key: 'accounting_value_confidentiality_description',
        label: 'Confidencialidad — Descripción',
      },
      {
        key: 'accounting_value_business_title',
        label: 'Personas físicas y negocios — Título',
      },
      {
        key: 'accounting_value_business_description',
        label: 'Personas físicas y negocios — Descripción',
      },
      {
        key: 'accounting_value_communication_title',
        label: 'Comunicación directa — Título',
      },
      {
        key: 'accounting_value_communication_description',
        label: 'Comunicación directa — Descripción',
      },
      {
        key: 'accounting_value_tracking_title',
        label: 'Seguimiento continuo — Título',
      },
      {
        key: 'accounting_value_tracking_description',
        label: 'Seguimiento continuo — Descripción',
      },
    ],
  },

  {
    id: 'services',
    title: 'Servicios',
    description:
      'Tarjetas de servicios contables.',
    keys: [
      {
        key: 'accounting_service_1_title',
        label: 'Servicio 01 — Título',
      },
      {
        key: 'accounting_service_1_description',
        label: 'Servicio 01 — Descripción',
      },
      {
        key: 'accounting_service_2_title',
        label: 'Servicio 02 — Título',
      },
      {
        key: 'accounting_service_2_description',
        label: 'Servicio 02 — Descripción',
      },
      {
        key: 'accounting_service_3_title',
        label: 'Servicio 03 — Título',
      },
      {
        key: 'accounting_service_3_description',
        label: 'Servicio 03 — Descripción',
      },
      {
        key: 'accounting_service_4_title',
        label: 'Servicio 04 — Título',
      },
      {
        key: 'accounting_service_4_description',
        label: 'Servicio 04 — Descripción',
      },
      {
        key: 'accounting_service_5_title',
        label: 'Servicio 05 — Título',
      },
      {
        key: 'accounting_service_5_description',
        label: 'Servicio 05 — Descripción',
      },
    ],
  },

  {
    id: 'plans',
    title: 'Planes y precios',
    description:
      'Información comercial de los paquetes contables.',
    keys: [
      {
        key: 'accounting_plan_basic_tier',
        label: 'Fiscal Básico — Nivel',
      },
      {
        key: 'accounting_plan_basic_name',
        label: 'Fiscal Básico — Nombre',
      },
      {
        key: 'accounting_plan_basic_price',
        label: 'Fiscal Básico — Precio',
        type: 'price',
      },
      {
        key: 'accounting_plan_basic_period',
        label: 'Fiscal Básico — Periodo',
      },
      {
        key: 'accounting_plan_basic_feature_1',
        label: 'Fiscal Básico — Beneficio 1',
      },
      {
        key: 'accounting_plan_basic_feature_2',
        label: 'Fiscal Básico — Beneficio 2',
      },
      {
        key: 'accounting_plan_basic_feature_3',
        label: 'Fiscal Básico — Beneficio 3',
      },

      {
        key: 'accounting_plan_professional_tier',
        label: 'Fiscal Profesional — Nivel',
      },
      {
        key: 'accounting_plan_professional_name',
        label: 'Fiscal Profesional — Nombre',
      },
      {
        key: 'accounting_plan_professional_price',
        label: 'Fiscal Profesional — Precio',
        type: 'price',
      },
      {
        key: 'accounting_plan_professional_period',
        label: 'Fiscal Profesional — Periodo',
      },
      {
        key: 'accounting_plan_professional_badge',
        label: 'Fiscal Profesional — Etiqueta',
      },
      {
        key: 'accounting_plan_professional_feature_1',
        label: 'Fiscal Profesional — Beneficio 1',
      },
      {
        key: 'accounting_plan_professional_feature_2',
        label: 'Fiscal Profesional — Beneficio 2',
      },
      {
        key: 'accounting_plan_professional_feature_3',
        label: 'Fiscal Profesional — Beneficio 3',
      },
      {
        key: 'accounting_plan_professional_feature_4',
        label: 'Fiscal Profesional — Beneficio 4',
      },

      {
        key: 'accounting_plan_plus_tier',
        label: 'Fiscal Plus — Nivel',
      },
      {
        key: 'accounting_plan_plus_name',
        label: 'Fiscal Plus — Nombre',
      },
      {
        key: 'accounting_plan_plus_price',
        label: 'Fiscal Plus — Precio',
        type: 'price',
      },
      {
        key: 'accounting_plan_plus_period',
        label: 'Fiscal Plus — Periodo',
      },
      {
        key: 'accounting_plan_plus_feature_1',
        label: 'Fiscal Plus — Beneficio 1',
      },
      {
        key: 'accounting_plan_plus_feature_2',
        label: 'Fiscal Plus — Beneficio 2',
      },
      {
        key: 'accounting_plan_plus_feature_3',
        label: 'Fiscal Plus — Beneficio 3',
      },
      {
        key: 'accounting_plan_plus_feature_4',
        label: 'Fiscal Plus — Beneficio 4',
      },
    ],
  },

  {
    id: 'process',
    title: 'Proceso',
    description:
      'Pasos visibles en la sección de proceso.',
    keys: [
      {
        key: 'accounting_process_1_title',
        label: 'Paso 01 — Título',
      },
      {
        key: 'accounting_process_1_description',
        label: 'Paso 01 — Descripción',
      },
      {
        key: 'accounting_process_2_title',
        label: 'Paso 02 — Título',
      },
      {
        key: 'accounting_process_2_description',
        label: 'Paso 02 — Descripción',
      },
      {
        key: 'accounting_process_3_title',
        label: 'Paso 03 — Título',
      },
      {
        key: 'accounting_process_3_description',
        label: 'Paso 03 — Descripción',
      },
    ],
  },
]

export default function AccountingContentManager() {
  const navigate = useNavigate()

  const {
    content,
    updateContent,
  } = useContentContext()
  const [drafts, setDrafts] = useState({})

const [savedField, setSavedField] = useState(null)

  const [openSections, setOpenSections] = useState({
    hero: true,
    kpis: true,
    protection: true,
    services: false,
    plans: false,
    process: false,
  })

  const accountingSections = useMemo(() => {
    return SECTION_CONFIG.map(section => ({
      ...section,

      keys: section.keys.filter(item => {
        return content[item.key]?.category === 'contabilidad'
      }),
    })).filter(section => section.keys.length > 0)
  }, [content])

  const toggleSection = sectionId => {
    setOpenSections(current => ({
      ...current,
      [sectionId]: !current[sectionId],
    }))
  }
const handleDraftChange = (key, value) => {
  setDrafts(current => ({
    ...current,
    [key]: value,
  }))
}

const handleSaveField = (
  key,
  category,
  originalValue
) => {
  const value =
    drafts[key] ?? originalValue

  updateContent(
    key,
    value,
    category
  )

  setSavedField(key)

  setTimeout(() => {
    setSavedField(current =>
      current === key
        ? null
        : current
    )
  }, 2200)
}
  return (
    <main
  className="relative min-h-screen overflow-hidden px-6 py-10"
  style={{
    background: `
      radial-gradient(
        circle at 15% 10%,
        rgba(0,238,252,0.10),
        transparent 32%
      ),
      radial-gradient(
        circle at 88% 18%,
        rgba(189,0,255,0.10),
        transparent 34%
      ),
      linear-gradient(
        145deg,
        #0c1b2b 0%,
        #091625 38%,
        #081321 68%,
        #0a1624 100%
      )
    `,
    color: '#ffffff',
  }}
>
  {/* Cuadrícula tecnológica */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(255,255,255,0.018) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0.018) 1px,
        transparent 1px
      )
    `,
    backgroundSize: '48px 48px',
    maskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 90%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 90%)',
  }}
/>
      <div
  className="absolute pointer-events-none"
  style={{
    width: 650,
    height: 650,
    top: -250,
    right: -180,
    borderRadius: '50%',
    background: '#00eefc',
    filter: 'blur(190px)',
    opacity: 0.11,
  }}
/>

<div
  className="absolute pointer-events-none"
  style={{
    width: 550,
    height: 550,
    top: 420,
    left: -250,
    borderRadius: '50%',
    background: '#bd00ff',
    filter: 'blur(200px)',
    opacity: 0.075,
  }}
/>
      <div className="relative z-10 max-w-7xl mx-auto">

        <button
          onClick={() => navigate('/panel')}
          className="flex items-center gap-2"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.48)',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft
            size={17}
            strokeWidth={1.7}
          />

          Volver al panel
        </button>

        <section className="mt-14">

          <div
            className="inline-flex items-center gap-2"
            style={{
              color: '#00eefc',
            }}
          >
            <Calculator
              size={18}
              strokeWidth={1.7}
            />

            <span
              style={{
                fontFamily:
                  "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.18em',
              }}
            >
              AIACO // CONTABILIDAD CMS
            </span>
          </div>

          <h1
            className="mt-5"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(38px, 6vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
            }}
          >
            Contenido Contable
          </h1>

          <p
            className="mt-4 max-w-2xl"
            style={{
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            Administra el contenido público de AIACO Contable
            organizado por secciones.
          </p>

        </section>

        <section
          className="mt-8 rounded-2xl px-5 py-4"
          style={{
            background: 'rgba(0,238,252,0.035)',
            border: '1px solid rgba(0,238,252,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.10em',
              color: '#00eefc',
            }}
          >
            ACCESS SCOPE // CONTABILIDAD
          </p>

          <p
            className="mt-2"
            style={{
              color: 'rgba(255,255,255,0.42)',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            Solo puedes modificar contenido autorizado de
            AIACO Contable.
          </p>
        </section>

        <section className="mt-8 flex flex-col gap-5">

          {accountingSections.map(section => {
            const isOpen = openSections[section.id]

            return (
              <div
                key={section.id}
                className="rounded-3xl overflow-hidden"
                style={{
  background:
    'linear-gradient(145deg, rgba(16,36,55,0.72), rgba(8,21,36,0.76))',

  border:
    '1px solid rgba(126,210,255,0.10)',

  boxShadow:
    '0 18px 55px rgba(0,0,0,0.18)',

  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
}}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-5 text-left"
                  style={{
  background:
    isOpen
      ? 'linear-gradient(90deg, rgba(0,238,252,0.055), rgba(189,0,255,0.035))'
      : 'rgba(255,255,255,0.018)',

  border: 'none',
  color: '#ffffff',
  cursor: 'pointer',
}}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 18,
                        fontWeight: 650,
                      }}
                    >
                      {section.title}
                    </p>

                    <p
                      className="mt-1"
                      style={{
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: 12,
                      }}
                    >
                      {section.description}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-3"
                    style={{
                      color: '#00eefc',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'JetBrains Mono', monospace",
                        fontSize: 9,
                      }}
                    >
                      {section.keys.length} CAMPOS
                    </span>

                    {isOpen
                      ? <ChevronUp size={18} />
                      : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5"
                    style={{
                      borderTop:
                        '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {section.keys.map(item => {
                      const entry = content[item.key]

                      if (!entry) {
                        return null
                      }

                      const isPrice =
                        item.type === 'price'

                      return (
                        <div
                          key={item.key}
                          className="rounded-2xl p-5"
                          style={{
                            background:
                              'rgba(255,255,255,0.018)',
                            border:
                              '1px solid rgba(255,255,255,0.07)',
                          }}
                        >
                          <div className="flex items-center gap-3">

                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{
                                background:
                                  isPrice
                                    ? 'rgba(236,178,255,0.08)'
                                    : 'rgba(0,238,252,0.06)',
                                border:
                                  isPrice
                                    ? '1px solid rgba(236,178,255,0.18)'
                                    : '1px solid rgba(0,238,252,0.14)',
                                color:
                                  isPrice
                                    ? '#ecb2ff'
                                    : '#00eefc',
                              }}
                            >
                              <FileText
                                size={16}
                                strokeWidth={1.7}
                              />
                            </div>

                            <div>
                              <p
                                style={{
                                  fontFamily:
                                    "'Sora', sans-serif",
                                  fontSize: 13,
                                  fontWeight: 600,
                                }}
                              >
                                {item.label}
                              </p>

                              <p
                                className="mt-1"
                                style={{
                                  fontFamily:
                                    "'JetBrains Mono', monospace",
                                  fontSize: 8,
                                  color:
                                    'rgba(255,255,255,0.20)',
                                }}
                              >
                                {item.key}
                              </p>
                            </div>

                          </div>

                          {isPrice ? (
                            <div className="mt-4">

                              <div
                                className="flex items-center rounded-xl overflow-hidden"
                                style={{
                                  background:
                                    'rgba(255,255,255,0.025)',
                                  border:
                                    '1px solid rgba(236,178,255,0.16)',
                                }}
                              >
                                <span
                                  className="px-4"
                                  style={{
                                    color: '#ecb2ff',
                                    fontWeight: 700,
                                  }}
                                >
                                  $
                                </span>

                                <input
                                  type="number"
                                  min="0"
                                  step="1"
                                 value={
  drafts[item.key] ??
  entry.value
}
                                 onChange={event =>
  handleDraftChange(
    item.key,
    event.target.value
  )
}
                                  className="w-full px-2 py-3 outline-none"
                                  style={{
                                    background:
                                      'transparent',
                                    border: 'none',
                                    color: '#ffffff',
                                  }}
                                />

                                <span
                                  className="px-4"
                                  style={{
                                    fontFamily:
                                      "'JetBrains Mono', monospace",
                                    fontSize: 9,
                                    color:
                                      'rgba(255,255,255,0.30)',
                                  }}
                                >
                                  MXN
                                </span>
                              </div>

                            </div>
                          ) : (
                            <textarea
                              value={
  drafts[item.key] ??
  entry.value
}
                              onChange={event =>
  handleDraftChange(
    item.key,
    event.target.value
  )
}
                              rows={
                                item.key.includes('description')
                                  ? 4
                                  : 2
                              }
                              className="mt-4 w-full rounded-xl px-4 py-3 outline-none"
                              style={{
                                resize: 'vertical',
                                background:
                                  'rgba(255,255,255,0.025)',
                                border:
                                  '1px solid rgba(255,255,255,0.08)',
                                color: '#ffffff',
                                lineHeight: 1.7,
                                fontSize: 13,
                              }}
                            />
                          )}

                         <div className="mt-5 flex items-center justify-between gap-4">

  <div>
    {drafts[item.key] !== undefined &&
      drafts[item.key] !== entry.value &&
      savedField !== item.key && (
        <span
          style={{
            fontFamily:
              "'JetBrains Mono', monospace",
            fontSize: 9,
            color:
              'rgba(255,255,255,0.32)',
            letterSpacing:
              '0.08em',
          }}
        >
          CAMBIOS SIN GUARDAR
        </span>
      )}

    {savedField === item.key && (
      <span
        className="flex items-center gap-2"
        style={{
          fontFamily:
            "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#5fffd2',
          letterSpacing:
            '0.08em',
        }}
      >
        <CheckCircle2
          size={14}
          strokeWidth={2}
        />

        CAMBIOS GUARDADOS
      </span>
    )}
  </div>

  <button
    type="button"
    onClick={() =>
      handleSaveField(
        item.key,
        entry.category,
        entry.value
      )
    }
    disabled={
      drafts[item.key] === undefined ||
      drafts[item.key] === entry.value
    }
    className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300"
    style={{
      background:
        drafts[item.key] !== undefined &&
        drafts[item.key] !== entry.value
          ? 'linear-gradient(135deg, rgba(0,238,252,0.16), rgba(189,0,255,0.14))'
          : 'rgba(255,255,255,0.025)',

      border:
        drafts[item.key] !== undefined &&
        drafts[item.key] !== entry.value
          ? '1px solid rgba(0,238,252,0.30)'
          : '1px solid rgba(255,255,255,0.07)',

      color:
        drafts[item.key] !== undefined &&
        drafts[item.key] !== entry.value
          ? '#00eefc'
          : 'rgba(255,255,255,0.22)',

      cursor:
        drafts[item.key] !== undefined &&
        drafts[item.key] !== entry.value
          ? 'pointer'
          : 'not-allowed',

      fontFamily:
        "'JetBrains Mono', monospace",

      fontSize: 9,
      letterSpacing: '0.08em',
    }}
  >
    <Save
      size={14}
      strokeWidth={1.8}
    />

    GUARDAR CAMBIOS
  </button>

</div>
 </div>
                      )
                    })}

                  </div>
                )}
              </div>
            )
          })}

        </section>

      </div>
    </main>
  )
}