import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function DataExportScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="EXPORTAR DATOS"
      title="Una copia que puedas entender"
      subtitle="La exportación real se generará de forma privada y con caducidad."
      sections={[
        {
          title: 'Incluye',
          body: 'Perfil, intereses, planes, reseñas y preferencias permitidas.',
          icon: 'archive-outline',
        },
        {
          title: 'Protección',
          body: 'Enlace privado, autenticación y vencimiento. No se genera un archivo real en este MVP.',
          icon: 'lock-closed-outline',
        },
      ]}
      actions={[
        {
          label: 'Solicitar exportación demo',
          message: 'Solicitud registrada. No se creó ningún archivo real.',
        },
      ]}
    />
  );
}
