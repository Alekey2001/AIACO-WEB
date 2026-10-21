import LegalPageLayout from '../components/layout/LegalPageLayout'

const sections = [
  { title: '01. Alcance y tratamiento de información', body: 'Este espacio describirá cómo se gestiona la información en los servicios digitales de AIACO. La versión definitiva identificará los datos involucrados, los canales de recepción y las responsabilidades aplicables a cada proyecto de software.' },
  { title: '02. Finalidades y transparencia', body: 'La comunicación con clientes, la atención de solicitudes y la operación de plataformas requieren finalidades claras. Aquí se documentarán esas finalidades y los criterios de uso, evitando recopilar información que no resulte necesaria para el servicio.' },
  { title: '03. Conservación y proveedores', body: 'Esta sección detallará los periodos de conservación y la participación de proveedores tecnológicos. Las condiciones concretas de almacenamiento, transferencias y eliminación se incorporarán después de revisar la operación real de cada solución.' },
  { title: '04. Solicitudes y actualización del documento', body: 'El documento aprobado incluirá un canal de contacto verificado para consultas sobre privacidad, así como el procedimiento de atención. También indicará su fecha de vigencia y la forma de comunicar cambios relevantes.' },
]

export default function PoliticasPrivacidad() {
  return <LegalPageLayout title="Políticas de Privacidad" intro="Una estructura de referencia para comunicar el uso responsable de la información en nuestros proyectos de software y servicios digitales." sections={sections} />
}
