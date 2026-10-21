import LegalPageLayout from '../components/layout/LegalPageLayout'

const sections = [
  { title: '01. Diseño y desarrollo seguro', body: 'Este apartado presentará los criterios de seguridad que se acuerden para cada solución: revisión de requisitos, evaluación de riesgos y validación de cambios. Los controles específicos deberán corresponder al alcance técnico y operativo del proyecto.' },
  { title: '02. Accesos y protección de entornos', body: 'Aquí se documentarán los mecanismos de autorización, la separación de entornos y la gestión de credenciales que hayan sido verificados. El objetivo editorial es explicar cada responsabilidad con claridad, sin revelar configuraciones sensibles.' },
  { title: '03. Continuidad y respuesta a incidentes', body: 'La versión final describirá los canales de reporte, los responsables de coordinación y las acciones previstas para responder a incidentes. Los tiempos de atención y las condiciones de recuperación se definirán en los acuerdos correspondientes.' },
  { title: '04. Revisión y mejora continua', body: 'Las revisiones técnicas permiten identificar oportunidades de mejora en software, infraestructura y procesos. Este espacio recogerá la periodicidad y el alcance de las prácticas efectivamente adoptadas, sin implicar certificaciones ni garantías no acreditadas.' },
]

export default function ProtocolosSeguridad() {
  return <LegalPageLayout title="Protocolos de Seguridad" intro="Un marco de comunicación para explicar la protección de plataformas, la gestión de accesos y la continuidad de los servicios tecnológicos." sections={sections} />
}
