import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function IncomingCallScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="LLAMADA ENTRANTE"
      title="Mica te llama dentro de AMIX"
      subtitle="Tu número nunca se comparte."
      sections={[
        {
          title: 'Audio interno',
          body: 'La llamada real necesitará un proveedor; esta pantalla no abre el micrófono.',
          icon: 'call-outline',
        },
      ]}
      actions={[
        { label: 'Aceptar demo', href: '/calls/audio' },
        {
          label: 'Rechazar',
          variant: 'danger',
          message: 'Llamada rechazada en modo demostración.',
        },
      ]}
    />
  );
}
