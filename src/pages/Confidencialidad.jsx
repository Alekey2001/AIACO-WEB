import LegalPageLayout from '../components/layout/LegalPageLayout'

const sections = [
  { title: '01. Información de los proyectos', body: 'El desarrollo de soluciones digitales puede involucrar documentación técnica, código fuente y conocimiento del negocio. Este apartado delimitará qué información se considera confidencial en los acuerdos celebrados para cada colaboración.' },
  { title: '02. Acceso y uso autorizado', body: 'La versión definitiva describirá quién puede acceder a la información y para qué actividades. Las responsabilidades de equipos, colaboradores y proveedores se establecerán conforme a su participación y a los acuerdos aplicables.' },
  { title: '03. Intercambio y cierre de la colaboración', body: 'Aquí se explicarán los canales autorizados para compartir materiales y el tratamiento previsto al finalizar un proyecto. La entrega, devolución o eliminación de información deberá ajustarse a las condiciones contractuales verificadas.' },
  { title: '04. Consultas y acuerdos específicos', body: 'Los compromisos de confidencialidad se concretarán en los documentos correspondientes a cada servicio. Esta página de ejemplo sirve como estructura informativa y no sustituye los acuerdos que las partes revisen y formalicen.' },
]

export default function Confidencialidad() {
  return <LegalPageLayout title="Confidencialidad" intro="Una base informativa sobre el manejo de documentación, activos de software y conocimiento compartido durante una colaboración con AIACO." sections={sections} />
}
