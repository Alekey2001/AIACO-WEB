import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Globe2,
  Monitor,
  Music2,
  Save,
  Shield,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'

import { useContentContext } from '../../content/useContentContext'

const SITE_CONFIG = [
  {
    id: 'main',
    title: 'AIACO Principal',
    description:
      'Contenido general de la página principal de AIACO.',
    icon: Globe2,
    categories: ['general'],
  },

  {
    id: 'web',
    title: 'AIACO Web',
    description:
      'Contenido comercial y público de la plataforma de sitios web.',
    icon: Monitor,
    categories: ['sitios_web'],
  },

  {
    id: 'accounting',
    title: 'AIACO Contable',
    description:
      'Contenido comercial y operativo de la plataforma contable.',
    icon: Monitor,
    categories: ['contabilidad'],
  },

  {
    id: 'media',
    title: 'AIACO Media',
    description:
      'Contenido relacionado con AIACO Media.',
    icon: Music2,
    categories: ['media'],
  },
]
function getFriendlyLabel(key) {
  const labels = {

    main_project_1_title:
  'Portfolio — Proyecto 01 — Título',

main_project_1_category:
  'Portfolio — Proyecto 01 — Categoría',

main_project_1_description:
  'Portfolio — Proyecto 01 — Descripción',

main_project_1_tags:
  'Portfolio — Proyecto 01 — Tags',

main_project_2_title:
  'Portfolio — Proyecto 02 — Título',

main_project_2_category:
  'Portfolio — Proyecto 02 — Categoría',

main_project_2_description:
  'Portfolio — Proyecto 02 — Descripción',

main_project_2_tags:
  'Portfolio — Proyecto 02 — Tags',

main_project_3_title:
  'Portfolio — Proyecto 03 — Título',

main_project_3_category:
  'Portfolio — Proyecto 03 — Categoría',

main_project_3_description:
  'Portfolio — Proyecto 03 — Descripción',

main_project_3_tags:
  'Portfolio — Proyecto 03 — Tags',

main_project_4_title:
  'Portfolio — Proyecto 04 — Título',

main_project_4_category:
  'Portfolio — Proyecto 04 — Categoría',

main_project_4_description:
  'Portfolio — Proyecto 04 — Descripción',

main_project_4_tags:
  'Portfolio — Proyecto 04 — Tags',
    main_portfolio_eyebrow:
  'Portfolio — Etiqueta superior',

main_portfolio_title:
  'Portfolio — Título principal',
    main_services_eyebrow:
  'Servicios — Etiqueta superior',

main_services_title:
  'Servicios — Título principal',

main_service_1_title:
  'Servicio 01 — Inteligencia Artificial — Título',

main_service_1_description:
  'Servicio 01 — Inteligencia Artificial — Descripción',

main_service_2_title:
  'Servicio 02 — Ciberseguridad — Título',

main_service_2_description:
  'Servicio 02 — Ciberseguridad — Descripción',

main_service_3_title:
  'Servicio 03 — Sitios Web y Apps — Título',

main_service_3_description:
  'Servicio 03 — Sitios Web y Apps — Descripción',

main_service_4_title:
  'Servicio 04 — AIACO Games — Título',

main_service_4_description:
  'Servicio 04 — AIACO Games — Descripción',

main_services_learn_more:
  'Servicios — Texto “Aprender más”',
  main_hero_title:
  'Hero principal — Marca',

main_hero_services:
  'Hero principal — Servicios',

main_hero_description:
  'Hero principal — Descripción',

main_hero_slogan:
  'Hero principal — Eslogan',

main_hero_web_button:
  'Hero principal — Botón Sitio Web',

main_hero_accounting_button:
  'Hero principal — Botón Contabilidad',
  main_technology_eyebrow:
  'Tecnología — Etiqueta superior',

main_technology_title_line_1:
  'Tecnología — Título línea 1',

main_technology_title_line_2:
  'Tecnología — Título línea 2',

main_technology_card_1_title:
  'Tecnología — Tarjeta 01 — Título',

main_technology_card_1_description:
  'Tecnología — Tarjeta 01 — Descripción',

main_technology_card_2_title:
  'Tecnología — Tarjeta 02 — Título',

main_technology_card_2_description:
  'Tecnología — Tarjeta 02 — Descripción',
    web_video_hero_title:
      'Video Hero — Título',

    web_video_hero_description:
      'Video Hero — Descripción',

    web_video_hero_button:
      'Video Hero — Botón',

    web_video_hero_marquee_title:
      'Video Hero — Tecnologías — Título',

    web_hero_title:
      'Hero principal — Título',

    web_hero_description:
      'Hero principal — Descripción',

    web_hero_primary_button:
      'Hero principal — Botón principal',

    web_hero_secondary_button:
      'Hero principal — Botón secundario',

    web_projects_eyebrow:
      'Proyectos — Etiqueta superior',

    web_projects_title:
      'Proyectos — Título principal',

    web_projects_description:
      'Proyectos — Descripción',

    web_project_1_label:
      'Proyectos — Proyecto 01 — Nombre',

    web_project_2_label:
      'Proyectos — Proyecto 02 — Nombre',

    web_project_3_label:
      'Proyectos — Proyecto 03 — Nombre',

    web_about_eyebrow:
      'Nosotros — Etiqueta superior',

    web_about_title:
      'Nosotros — Título principal',

    web_about_description:
      'Nosotros — Descripción',

    web_stat_1_value:
      'Nosotros — Estadística 01 — Valor',

    web_stat_1_label:
      'Nosotros — Estadística 01 — Etiqueta',

    web_stat_2_value:
      'Nosotros — Estadística 02 — Valor',

    web_stat_2_label:
      'Nosotros — Estadística 02 — Etiqueta',

    web_stat_3_value:
      'Nosotros — Estadística 03 — Valor',

    web_stat_3_label:
      'Nosotros — Estadística 03 — Etiqueta',

    web_mission_title:
      'Nosotros — Misión — Título',

    web_mission_description:
      'Nosotros — Misión — Descripción',

    web_vision_title:
      'Nosotros — Visión — Título',

    web_vision_description:
      'Nosotros — Visión — Descripción',

    web_packages_eyebrow:
      'Paquetes — Etiqueta superior',

    web_packages_title:
      'Paquetes — Título principal',

    web_packages_description:
      'Paquetes — Descripción',

    web_package_1_label:
      'Paquete 01 — Categoría',

    web_package_1_name:
      'Paquete 01 — Nombre',

    web_package_1_price:
      'Paquete 01 — Precio',

    web_package_1_description:
      'Paquete 01 — Descripción',

    web_package_1_features:
      'Paquete 01 — Características',

    web_package_1_button:
      'Paquete 01 — Botón',

    web_package_2_label:
      'Paquete 02 — Categoría',

    web_package_2_name:
      'Paquete 02 — Nombre',

    web_package_2_price:
      'Paquete 02 — Precio',

    web_package_2_description:
      'Paquete 02 — Descripción',

    web_package_2_features:
      'Paquete 02 — Características',

    web_package_2_button:
      'Paquete 02 — Botón',

    web_package_2_badge:
      'Paquete 02 — Insignia',

    web_package_3_label:
      'Paquete 03 — Categoría',

    web_package_3_name:
      'Paquete 03 — Nombre',

    web_package_3_price:
      'Paquete 03 — Precio',

    web_package_3_description:
      'Paquete 03 — Descripción',

    web_package_3_features:
      'Paquete 03 — Características',

    web_package_3_button:
      'Paquete 03 — Botón',

    web_checklist_title:
      'Checklist — Título',

    web_checklist_description:
      'Checklist — Descripción',

    web_checklist_button:
      'Checklist — Botón',
    accounting_hero_title:
      'Hero — Título',

    accounting_hero_description:
      'Hero — Descripción',

    accounting_kpi_confidentiality_value:
      'KPI Confidencialidad — Valor',

    accounting_kpi_confidentiality_label:
      'KPI Confidencialidad — Etiqueta',

    accounting_kpi_response_value:
      'KPI Tiempo de respuesta — Valor',

    accounting_kpi_response_label:
      'KPI Tiempo de respuesta — Etiqueta',

    accounting_kpi_declarations_value:
      'KPI Declaraciones — Valor',

    accounting_kpi_declarations_label:
      'KPI Declaraciones — Etiqueta',

    media_title:
      'Título principal de Media',

  }

  if (labels[key]) {
    return labels[key]
  }

  return key
    .replace(/^accounting_/, '')
    .replace(/^media_/, '')
    .replace(/^hero_/, '')
    .split('_')
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(' ')
}

export default function ContentManager() {
  const navigate = useNavigate()

  const {
    content,
    updateContent,
  } = useContentContext()

 const [openSites, setOpenSites] =
  useState({
    main: true,
    web: false,
    accounting: false,
    media: false,
  })

  const [drafts, setDrafts] =
    useState({})

  const [savedField, setSavedField] =
    useState(null)

  const sites = useMemo(() => {
    return SITE_CONFIG.map(site => ({
      ...site,

      entries: Object.entries(content)
        .filter(([, entry]) =>
          site.categories.includes(
            entry.category
          )
        ),
    })).filter(site =>
      site.entries.length > 0
    )
  }, [content])

  const toggleSite = siteId => {
    setOpenSites(current => ({
      ...current,
      [siteId]: !current[siteId],
    }))
  }

  const handleDraftChange = (
    key,
    value
  ) => {
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
          backgroundSize:
            '48px 48px',

          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 90%)',

          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 90%)',
        }}
      />

      {/* Glow cyan */}
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

      {/* Glow púrpura */}
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
          onClick={() =>
            navigate('/panel')
          }
          className="flex items-center gap-2"
          style={{
            background:
              'transparent',
            border: 'none',
            color:
              'rgba(255,255,255,0.48)',
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
              color: '#ecb2ff',
            }}
          >
            <Shield
              size={18}
              strokeWidth={1.7}
            />

            <span
              style={{
                fontFamily:
                  "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing:
                  '0.18em',
              }}
            >
              AIACO // SUPER ADMIN CMS
            </span>
          </div>

          <h1
            className="mt-5"
            style={{
              fontFamily:
                "'Sora', sans-serif",
              fontSize:
                'clamp(38px, 6vw, 64px)',
              fontWeight: 700,
              letterSpacing:
                '-0.05em',
            }}
          >
            Gestión Global de Contenido
          </h1>

          <p
            className="mt-4 max-w-2xl"
            style={{
              color:
                'rgba(255,255,255,0.42)',
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            Administra el contenido público
            de todo el ecosistema AIACO,
            organizado por plataforma.
          </p>

        </section>

        <section
          className="mt-8 rounded-2xl px-5 py-4"
          style={{
            background:
              'rgba(236,178,255,0.035)',

            border:
              '1px solid rgba(236,178,255,0.12)',
          }}
        >
          <p
            style={{
              fontFamily:
                "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing:
                '0.10em',
              color: '#ecb2ff',
            }}
          >
            ACCESS SCOPE // GLOBAL
          </p>

          <p
            className="mt-2"
            style={{
              color:
                'rgba(255,255,255,0.42)',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            Como Super Administrador puedes
            modificar contenido de todas las
            plataformas AIACO.
          </p>
        </section>

        <section className="mt-8 flex flex-col gap-5">

          {sites.map(site => {
            const isOpen =
              openSites[site.id]

            const SiteIcon =
              site.icon

            return (
              <div
                key={site.id}
                className="rounded-3xl overflow-hidden"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(16,36,55,0.72), rgba(8,21,36,0.76))',

                  border:
                    '1px solid rgba(126,210,255,0.10)',

                  boxShadow:
                    '0 18px 55px rgba(0,0,0,0.18)',

                  backdropFilter:
                    'blur(20px)',

                  WebkitBackdropFilter:
                    'blur(20px)',
                }}
              >

                <button
                  onClick={() =>
                    toggleSite(
                      site.id
                    )
                  }
                  className="w-full px-6 py-6 flex items-center justify-between gap-5 text-left"
                  style={{
                    background:
                      isOpen
                        ? 'linear-gradient(90deg, rgba(189,0,255,0.055), rgba(0,238,252,0.040))'
                        : 'rgba(255,255,255,0.018)',

                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background:
                          'rgba(255,255,255,0.035)',

                        border:
                          '1px solid rgba(255,255,255,0.08)',

                        color:
                          site.id === 'accounting'
                            ? '#00eefc'
                            : '#ecb2ff',
                      }}
                    >
                      <SiteIcon
                        size={21}
                        strokeWidth={1.6}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          fontFamily:
                            "'Sora', sans-serif",
                          fontSize: 19,
                          fontWeight: 650,
                        }}
                      >
                        {site.title}
                      </p>

                      <p
                        className="mt-1"
                        style={{
                          color:
                            'rgba(255,255,255,0.35)',

                          fontSize: 12,
                        }}
                      >
                        {site.description}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      style={{
                        fontFamily:
                          "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color:
                          'rgba(255,255,255,0.32)',
                      }}
                    >
                      {site.entries.length}
                      {' '}
                      CAMPOS
                    </span>

                    {isOpen
                      ? (
                        <ChevronUp
                          size={18}
                          color="#00eefc"
                        />
                      )
                      : (
                        <ChevronDown
                          size={18}
                          color="#00eefc"
                        />
                      )}
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

                    {site.entries.map(
                      ([
                        key,
                        entry,
                      ]) => {
                        const draft =
                          drafts[key]

                        const hasChanges =
                          draft !== undefined &&
                          draft !==
                            entry.value

                        const isSaved =
                          savedField ===
                          key

                        const isPrice =
                          key.includes(
                            '_price'
                          )

                        return (
                          <div
                            key={key}
                            className="rounded-2xl p-5"
                            style={{
                              background:
                                'rgba(255,255,255,0.018)',

                              border:
                                hasChanges
                                  ? '1px solid rgba(0,238,252,0.22)'
                                  : '1px solid rgba(255,255,255,0.07)',
                            }}
                          >

                            <div className="flex items-center gap-3">

                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{
                                  background:
                                    'rgba(0,238,252,0.06)',

                                  border:
                                    '1px solid rgba(0,238,252,0.14)',

                                  color:
                                    '#00eefc',
                                }}
                              >
                                <FileText
                                  size={16}
                                  strokeWidth={
                                    1.7
                                  }
                                />
                              </div>

                              <div>
                                <p
                                  style={{
                                    fontFamily:
                                      "'Sora', sans-serif",

                                    fontSize:
                                      13,

                                    fontWeight:
                                      600,
                                  }}
                                >
                                  {getFriendlyLabel(
                                    key
                                  )}
                                </p>

                                <p
                                  className="mt-1"
                                  style={{
                                    fontFamily:
                                      "'JetBrains Mono', monospace",

                                    fontSize:
                                      8,

                                    color:
                                      'rgba(255,255,255,0.20)',
                                  }}
                                >
                                  {key}
                                </p>
                              </div>

                            </div>

                            {isPrice ? (
                              <div
                                className="mt-4 flex items-center rounded-xl overflow-hidden"
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
                                    color:
                                      '#ecb2ff',

                                    fontWeight:
                                      700,
                                  }}
                                >
                                  $
                                </span>

                                <input
                                  type="number"
                                  min="0"
                                  step="1"
                                  value={
                                    draft ??
                                    entry.value
                                  }
                                  onChange={
                                    event =>
                                      handleDraftChange(
                                        key,
                                        event
                                          .target
                                          .value
                                      )
                                  }
                                  className="w-full px-2 py-3 outline-none"
                                  style={{
                                    background:
                                      'transparent',

                                    border:
                                      'none',

                                    color:
                                      '#ffffff',
                                  }}
                                />

                                <span
                                  className="px-4"
                                  style={{
                                    fontFamily:
                                      "'JetBrains Mono', monospace",

                                    fontSize:
                                      9,

                                    color:
                                      'rgba(255,255,255,0.30)',
                                  }}
                                >
                                  MXN
                                </span>

                              </div>
                            ) : (
                              <textarea
                                value={
                                  draft ??
                                  entry.value
                                }
                                onChange={
                                  event =>
                                    handleDraftChange(
                                      key,
                                      event
                                        .target
                                        .value
                                    )
                                }
                                rows={
                                  key.includes(
                                    'description'
                                  )
                                    ? 4
                                    : 2
                                }
                                className="mt-4 w-full rounded-xl px-4 py-3 outline-none"
                                style={{
                                  resize:
                                    'vertical',

                                  background:
                                    'rgba(7,18,32,0.55)',

                                  border:
                                    '1px solid rgba(255,255,255,0.10)',

                                  color:
                                    '#ffffff',

                                  lineHeight:
                                    1.7,

                                  fontSize:
                                    13,
                                }}
                              />
                            )}

                            <div className="mt-5 flex items-center justify-between gap-4">

                              <div>

                                {hasChanges &&
                                  !isSaved && (
                                    <span
                                      style={{
                                        fontFamily:
                                          "'JetBrains Mono', monospace",

                                        fontSize:
                                          9,

                                        color:
                                          'rgba(255,255,255,0.32)',

                                        letterSpacing:
                                          '0.08em',
                                      }}
                                    >
                                      CAMBIOS SIN GUARDAR
                                    </span>
                                  )}

                                {isSaved && (
                                  <span
                                    style={{
                                      fontFamily:
                                        "'JetBrains Mono', monospace",

                                      fontSize:
                                        9,

                                      color:
                                        '#5fffd2',

                                      letterSpacing:
                                        '0.08em',
                                    }}
                                  >
                                    CAMBIOS GUARDADOS
                                  </span>
                                )}

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleSaveField(
                                    key,
                                    entry.category,
                                    entry.value
                                  )
                                }
                                disabled={
                                  !hasChanges
                                }
                                className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300"
                                style={{
                                  background:
                                    hasChanges
                                      ? 'linear-gradient(135deg, rgba(0,238,252,0.16), rgba(189,0,255,0.14))'
                                      : 'rgba(255,255,255,0.025)',

                                  border:
                                    hasChanges
                                      ? '1px solid rgba(0,238,252,0.30)'
                                      : '1px solid rgba(255,255,255,0.07)',

                                  color:
                                    hasChanges
                                      ? '#00eefc'
                                      : 'rgba(255,255,255,0.22)',

                                  cursor:
                                    hasChanges
                                      ? 'pointer'
                                      : 'not-allowed',

                                  fontFamily:
                                    "'JetBrains Mono', monospace",

                                  fontSize: 9,

                                  letterSpacing:
                                    '0.08em',
                                }}
                              >
                                <Save
                                  size={14}
                                  strokeWidth={
                                    1.8
                                  }
                                />

                                GUARDAR
                              </button>

                            </div>

                          </div>
                        )
                      }
                    )}

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
