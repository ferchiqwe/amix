import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function AudioCallScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="LLAMADA DEMO"
      title="00:00"
      subtitle="Mica · audio interno"
      safety
      notice="Modo demostración: no hay conexión, grabación ni acceso al micrófono."
      sections={[
        {
          title: 'Micrófono',
          body: 'Silenciado hasta que exista consentimiento y proveedor real.',
          icon: 'mic-off-outline',
        },
        {
          title: 'Metadatos mínimos',
          body: 'Solo duración y estado cuando exista producción; nunca el contenido.',
          icon: 'lock-closed-outline',
        },
      ]}
      actions={[
        { label: 'Abrir video demo', href: '/calls/video', variant: 'secondary' },
        { label: 'Finalizar', variant: 'danger', message: 'Llamada finalizada.' },
      ]}
    />
  );
}
