import {
  useMemo,
  useState,
} from 'react'

import ContentContext from './contentContext'

const initialContent = {
 main_hero_title: {
  value: 'AIACO',
  category: 'general',
},

main_hero_services: {
  value:
    'AI · Apps · Cybersecurity · Online Solutions',
  category: 'general',
},

main_hero_description: {
  value:
    'Artificial Intelligence, Apps, Cybersecurity & Online solutions,',
  category: 'general',
},

main_hero_slogan: {
  value:
    '"Construimos el futuro digital con confianza."',
  category: 'general',
},

main_hero_web_button: {
  value: 'Haz tu sitio web',
  category: 'general',
},

main_hero_accounting_button: {
  value: 'Cotiza tu contabilidad',
  category: 'general',
},
main_technology_eyebrow: {
  value: 'Nuestra Tecnología',
  category: 'general',
},

main_technology_title_line_1: {
  value: 'La siguiente generación',
  category: 'general',
},

main_technology_title_line_2: {
  value: 'de Tecnología',
  category: 'general',
},

main_technology_card_1_title: {
  value:
    'Sitios Web Full Stack para Empresas y Emprendedores',
  category: 'general',
},

main_technology_card_1_description: {
  value:
    'Sitios Web Full Stack con nuestra propuesta de construcción e innovación, con tecnología de vanguardia para potenciar tu negocio digital.',
  category: 'general',
},

main_technology_card_2_title: {
  value:
    'seguridad tecnológica cyberseguridad',
  category: 'general',
},

main_technology_card_2_description: {
  value:
    'Servicios de seguridad tecnológica y cyberseguridad para proteger tu infraestructura digital y datos sensibles.',
  category: 'general',
},
main_services_eyebrow: {
  value: 'Servicios',
  category: 'general',
},

main_services_title: {
  value: 'Nuestros Servicios',
  category: 'general',
},

main_service_1_title: {
  value: 'Inteligencia Artificial',
  category: 'general',
},

main_service_1_description: {
  value:
    'Soluciones de IA personalizadas para automatizar procesos, analizar datos y potenciar tu negocio con tecnología de vanguardia.',
  category: 'general',
},

main_service_2_title: {
  value: 'Ciberseguridad',
  category: 'general',
},

main_service_2_description: {
  value:
    'Protección integral para tu infraestructura digital. Auditorías, pentesting y soluciones de seguridad avanzadas.',
  category: 'general',
},

main_service_3_title: {
  value: 'Sitios Web y Apps',
  category: 'general',
},

main_service_3_description: {
  value:
    'Desarrollo Full Stack moderno. Sitios rápidos, seguros y escalables para empresas y emprendedores.',
  category: 'general',
},

main_service_4_title: {
  value: 'AIACO GAMES',
  category: 'general',
},

main_service_4_description: {
  value:
    'Desarrollo de videojuegos, modelos 3D y servicios gaming. Llevamos tus ideas al siguiente nivel del entretenimiento digital.',
  category: 'general',
},

main_services_learn_more: {
  value: 'Aprender más',
  category: 'general',
},main_portfolio_eyebrow: {
  value: 'Portfolio',
  category: 'general',
},

main_portfolio_title: {
  value: 'Proyectos Destacados',
  category: 'general',
},
main_project_1_title: {
  value: 'Desarrollo Web con Inteligencia Artificial',
  category: 'general',
},

main_project_1_category: {
  value: 'Web & IA',
  category: 'general',
},

main_project_1_description: {
  value:
    'Desarrollo de sitios web personalizados y de alto rendimiento. Integramos Inteligencia Artificial para automatizar procesos y optimizar la experiencia de usuario (UX).',
  category: 'general',
},

main_project_1_tags: {
  value: 'Python, TensorFlow, React, Next.js, IA',
  category: 'general',
},

main_project_2_title: {
  value: 'CyberShield Pro',
  category: 'general',
},

main_project_2_category: {
  value: 'Ciberseguridad',
  category: 'general',
},

main_project_2_description: {
  value:
    'Plataforma de monitoreo en tiempo real y detección de vulnerabilidades. Diseñada para blindar y optimizar la seguridad de infraestructura en la nube.',
  category: 'general',
},

main_project_2_tags: {
  value: 'Node.js, Docker, AWS, SIEM, SecOps, scanning',
  category: 'general',
},

main_project_3_title: {
  value: 'Panel de Automatización Empresarial',
  category: 'general',
},

main_project_3_category: {
  value: 'APPS & Desarrollo Full-Stack',
  category: 'general',
},

main_project_3_description: {
  value:
    'Dashboard Full-Stack diseñado para centralizar operaciones y optimizar flujos de trabajo en tiempo real.',
  category: 'general',
},

main_project_3_tags: {
  value: 'React, Node.js, MongoDB, android, ios',
  category: 'general',
},

main_project_4_title: {
  value: 'AIACO Games: Nytheraultimus',
  category: 'general',
},

main_project_4_category: {
  value: 'Videojuegos',
  category: 'general',
},

main_project_4_description: {
  value:
    'Un ambicioso ecosistema competitivo multijugador, MMORPG, historia futurista con elementos de ciencia ficción y fantasía.',
  category: 'general',
},

main_project_4_tags: {
  value: 'mmorpg, fantasy, 3D',
  category: 'general',
},

  accounting_hero_title: {
    value: 'AIACO CONTABLE',
    category: 'contabilidad',
  },

 accounting_hero_description: {
  value:
    'Contabilidad Inteligente y Blindaje Fiscal para Empresas. Automatización total de CFDI. Evita multas del SAT. Flujo de caja optimizado con IA y expertos.',
  category: 'contabilidad',
},

accounting_kpi_confidentiality_value: {
  value: '100%',
  category: 'contabilidad',
},

accounting_kpi_confidentiality_label: {
  value: 'Confidencialidad',
  category: 'contabilidad',
},

accounting_kpi_response_value: {
  value: '24h',
  category: 'contabilidad',
},

accounting_kpi_response_label: {
  value: 'Tiempo de respuesta',
  category: 'contabilidad',
},

accounting_kpi_declarations_value: {
  value: '12/año',
  category: 'contabilidad',
},

accounting_kpi_declarations_label: {
  value: 'Declaraciones',
  category: 'contabilidad',
},

accounting_value_confidentiality_title: {
  value: 'Confidencialidad total',
  category: 'contabilidad',
},

accounting_value_confidentiality_description: {
  value:
    'Resguardo absoluto de tu información fiscal bajo protocolos encriptados.',
  category: 'contabilidad',
},

accounting_value_business_title: {
  value: 'Personas físicas y negocios',
  category: 'contabilidad',
},

accounting_value_business_description: {
  value:
    'Adaptamos nuestras estrategias al tamaño de tu operación comercial.',
  category: 'contabilidad',
},

accounting_value_communication_title: {
  value: 'Comunicación directa',
  category: 'contabilidad',
},

accounting_value_communication_description: {
  value:
    'Sin intermediarios ni demoras, atención personalizada vía WhatsApp y email.',
  category: 'contabilidad',
},

accounting_value_tracking_title: {
  value: 'Seguimiento continuo',
  category: 'contabilidad',
},

accounting_value_tracking_description: {
  value:
    'Monitoreo 24/7 de tu estatus ante el SAT para prevenir irregularidades.',
  category: 'contabilidad',
},
web_video_hero_title: {
  value: 'AIACO Web',
  category: 'sitios_web',
},

web_video_hero_description: {
  value: 'Construimos El Futuro Digital Con Inteligencia : Full Stack, escalable y potenciado con IA.',
  category: 'sitios_web',
},

web_video_hero_button: {
  value: 'Comenzar Ahora',
  category: 'sitios_web',
},

web_video_hero_marquee_title: {
  value: 'Tecnologías que dominamos',
  category: 'sitios_web',
},

web_hero_title: {
  value: 'Transformamos tus\nideas en activos digitales\nde alto rendimiento',
  category: 'sitios_web',
},

web_hero_description: {
  value: 'Desarrollamos sitios web, plataformas escalables e integraciones de IA diseñadas para potenciar tu crecimiento.',
  category: 'sitios_web',
},

web_hero_primary_button: {
  value: 'Comenzar Ahora',
  category: 'sitios_web',
},

web_hero_secondary_button: {
  value: 'Ver Paquetes',
  category: 'sitios_web',
},

web_projects_eyebrow: {
  value: 'Nuestros proyectos',
  category: 'sitios_web',
},

web_projects_title: {
  value: 'Proyectos Destacados',
  category: 'sitios_web',
},

web_projects_description: {
  value: 'Soluciones digitales únicas, sin plantillas, sin límites.',
  category: 'sitios_web',
},

web_project_1_label: {
  value: 'Dashboard Empresarial',
  category: 'sitios_web',
},

web_project_2_label: {
  value: 'App Fintech',
  category: 'sitios_web',
},

web_project_3_label: {
  value: 'E-Commerce',
  category: 'sitios_web',
},

web_about_eyebrow: {
  value: 'Quiénes somos',
  category: 'sitios_web',
},

web_about_title: {
  value: 'Sobre AIACO',
  category: 'sitios_web',
},

web_about_description: {
  value: 'Somos una agencia de tecnología especializada en Inteligencia Artificial, Aplicaciones Web, Ciberseguridad y Soluciones Digitales. Nuestro equipo combina experiencia técnica con visión creativa para construir el futuro digital de nuestros clientes.',
  category: 'sitios_web',
},

web_stat_1_value: {
  value: '+10',
  category: 'sitios_web',
},

web_stat_1_label: {
  value: 'Proyectos entregados',
  category: 'sitios_web',
},

web_stat_2_value: {
  value: '100%',
  category: 'sitios_web',
},

web_stat_2_label: {
  value: 'Clientes satisfechos',
  category: 'sitios_web',
},

web_stat_3_value: {
  value: '24/7',
  category: 'sitios_web',
},

web_stat_3_label: {
  value: 'Soporte disponible',
  category: 'sitios_web',
},

web_mission_title: {
  value: 'Nuestra Misión',
  category: 'sitios_web',
},

web_mission_description: {
  value: 'Democratizar el acceso a tecnología de vanguardia para empresas y emprendedores, entregando soluciones digitales que generan impacto real y crecimiento sostenible.',
  category: 'sitios_web',
},

web_vision_title: {
  value: 'Nuestra Visión',
  category: 'sitios_web',
},

web_vision_description: {
  value: 'Ser la agencia tecnológica líder en Latinoamérica, reconocida por transformar ideas en productos digitales que definen el futuro de los negocios.',
  category: 'sitios_web',
},

web_packages_eyebrow: {
  value: 'paquetes de servicios',
  category: 'sitios_web',
},

web_packages_title: {
  value: 'Soluciones Next-Gen',
  category: 'sitios_web',
},

web_packages_description: {
  value: 'Selecciona tu tipo de proyecto y descubre el paquete ideal para ti.',
  category: 'sitios_web',
},

web_package_1_label: {
  value: 'Impulso Digital (Entry)',
  category: 'sitios_web',
},

web_package_1_name: {
  value: 'Impulso Digital',
  category: 'sitios_web',
},

web_package_1_price: {
  value: '$12,000+ MXN',
  category: 'sitios_web',
},

web_package_1_description: {
  value: 'Presencia profesional de alto impacto para marcas que buscan destacar.',
  category: 'sitios_web',
},

web_package_1_features: {
  value: 'Landing Page de Alta Conversión\nDiseño UI/UX Responsivo (Mobile First)\nOptimización de Velocidad y SEO Técnico\nFormulario de contacto avanzado\n1 Mes de soporte técnico',
  category: 'sitios_web',
},

web_package_1_button: {
  value: 'Iniciar Proyecto',
  category: 'sitios_web',
},

web_package_2_label: {
  value: 'Crecimiento Pro',
  category: 'sitios_web',
},

web_package_2_name: {
  value: 'Crecimiento Pro',
  category: 'sitios_web',
},

web_package_2_price: {
  value: '$28,000+ MXN',
  category: 'sitios_web',
},

web_package_2_description: {
  value: 'Plataforma escalable para negocios que necesitan gestionar contenido y ventas.',
  category: 'sitios_web',
},

web_package_2_features: {
  value: 'Sitio Fullstack a Medida\nPanel de Administración Autogestionable\nIntegración de Pagos y Carrito\nAnalítica de datos y CRM básico\n3 Meses de mantenimiento y soporte',
  category: 'sitios_web',
},

web_package_2_button: {
  value: 'Potenciar mi Negocio',
  category: 'sitios_web',
},

web_package_2_badge: {
  value: '★ Más consumido',
  category: 'sitios_web',
},

web_package_3_label: {
  value: 'Escala Inteligente (Enterprise)',
  category: 'sitios_web',
},

web_package_3_name: {
  value: 'Escala Inteligente',
  category: 'sitios_web',
},

web_package_3_price: {
  value: '$50,000+ MXN',
  category: 'sitios_web',
},

web_package_3_description: {
  value: 'Soluciones de vanguardia con Inteligencia Artificial para líderes de mercado.',
  category: 'sitios_web',
},

web_package_3_features: {
  value: 'Desarrollo Fullstack Premium\nIntegración de IA (Chatbots/Automatización)\nInfraestructura en la Nube (AWS/Cloud)\nSeguridad DevSecOps Reforzada\n6 Meses de soporte y optimización continua',
  category: 'sitios_web',
},

web_package_3_button: {
  value: 'Agendar Consultoría',
  category: 'sitios_web',
},

web_checklist_title: {
  value: 'Domina tu Lanzamiento Digital',
  category: 'sitios_web',
},

web_checklist_description: {
  value: 'Descarga el checklist estratégico de 50 puntos que utilizan los expertos para garantizar sitios web de alto rendimiento y cero errores.',
  category: 'sitios_web',
},

web_checklist_button: {
  value: 'Descargar mi Guía de Éxito',
  category: 'sitios_web',
},
  media_title: {
    value: 'AIACO MEDIA',
    category: 'media',
  },
  accounting_service_1_title: {
  value: 'Servicios Contables',
  category: 'contabilidad',
},

accounting_service_1_description: {
  value:
    'Contables y fiscales sin procesos complicados. Gestión integral de tus libros.',
  category: 'contabilidad',
},

accounting_service_2_title: {
  value: 'Declaraciones',
  category: 'contabilidad',
},

accounting_service_2_description: {
  value:
    'Mensuales y anuales. Cumplimiento en tiempo según tu paquete y régimen fiscal actual.',
  category: 'contabilidad',
},

accounting_service_3_title: {
  value: 'Emisión CFDI',
  category: 'contabilidad',
},

accounting_service_3_description: {
  value:
    'Control de facturas con límites claros por paquete. Recuperación masiva de comprobantes.',
  category: 'contabilidad',
},

accounting_service_4_title: {
  value: 'e.firma y SAT',
  category: 'contabilidad',
},

accounting_service_4_description: {
  value:
    'Acompañamiento experto para trámites presenciales, generación y renovación de firmas.',
  category: 'contabilidad',
},

accounting_service_5_title: {
  value: 'Devoluciones ISR',
  category: 'contabilidad',
},

accounting_service_5_description: {
  value:
    'Gestión automática de saldos a favor con seguimiento detallado en el portal del SAT.',
  category: 'contabilidad',
},
accounting_plan_basic_tier: {
  value: 'Entry Level',
  category: 'contabilidad',
},

accounting_plan_basic_name: {
  value: 'Fiscal Básico',
  category: 'contabilidad',
},

accounting_plan_basic_price: {
  value: '1500',
  category: 'contabilidad',
},

accounting_plan_basic_period: {
  value: 'pago anual',
  category: 'contabilidad',
},

accounting_plan_basic_feature_1: {
  value: 'Declaración Anual',
  category: 'contabilidad',
},

accounting_plan_basic_feature_2: {
  value: 'Diagnóstico inicial',
  category: 'contabilidad',
},

accounting_plan_basic_feature_3: {
  value: 'Mensualidades',
  category: 'contabilidad',
},

accounting_plan_professional_tier: {
  value: 'Core Growth',
  category: 'contabilidad',
},

accounting_plan_professional_name: {
  value: 'Fiscal Profesional',
  category: 'contabilidad',
},

accounting_plan_professional_price: {
  value: '3000',
  category: 'contabilidad',
},

accounting_plan_professional_period: {
  value: 'pago mensual',
  category: 'contabilidad',
},

accounting_plan_professional_badge: {
  value: 'Best Seller',
  category: 'contabilidad',
},

accounting_plan_professional_feature_1: {
  value: 'Mensual + Anual',
  category: 'contabilidad',
},

accounting_plan_professional_feature_2: {
  value: 'Facturación CFDI',
  category: 'contabilidad',
},

accounting_plan_professional_feature_3: {
  value: 'Opinión de cumplimiento',
  category: 'contabilidad',
},

accounting_plan_professional_feature_4: {
  value: '24h Soporte',
  category: 'contabilidad',
},

accounting_plan_plus_tier: {
  value: 'Quantum Max',
  category: 'contabilidad',
},

accounting_plan_plus_name: {
  value: 'Fiscal Plus',
  category: 'contabilidad',
},

accounting_plan_plus_price: {
  value: '5500',
  category: 'contabilidad',
},

accounting_plan_plus_period: {
  value: 'pago mensual',
  category: 'contabilidad',
},

accounting_plan_plus_feature_1: {
  value: 'Todo en Profesional',
  category: 'contabilidad',
},

accounting_plan_plus_feature_2: {
  value: 'IMSS / Infonavit',
  category: 'contabilidad',
},

accounting_plan_plus_feature_3: {
  value: 'Asesoría Ilimitada',
  category: 'contabilidad',
},

accounting_plan_plus_feature_4: {
  value: 'Representación SAT',
  category: 'contabilidad',
},
accounting_process_1_title: {
  value: 'Diagnóstico',
  category: 'contabilidad',
},

accounting_process_1_description: {
  value:
    'Análisis exhaustivo de tu historial fiscal para identificar brechas y oportunidades.',
  category: 'contabilidad',
},

accounting_process_2_title: {
  value: 'Orden y ejecución',
  category: 'contabilidad',
},

accounting_process_2_description: {
  value:
    'Implementación de sistemas de control y presentación puntual de declaraciones.',
  category: 'contabilidad',
},

accounting_process_3_title: {
  value: 'Seguimiento',
  category: 'contabilidad',
},

accounting_process_3_description: {
  value:
    'Monitoreo continuo y ajustes estratégicos para optimizar tu carga tributaria.',
  category: 'contabilidad',
},
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(initialContent)

  const value = useMemo(
    () => ({
      content,

      getContent: (key, fallback = '') => {
        return content[key]?.value ?? fallback
      },

      getContentEntry: key => {
        return content[key] ?? null
      },

      updateContent: (
        key,
        newValue,
        category
      ) => {
        setContent(current => ({
          ...current,

          [key]: {
            value: newValue,
            category:
              category ??
              current[key]?.category ??
              'general',
          },
        }))
      },
    }),
    [content]
  )

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}