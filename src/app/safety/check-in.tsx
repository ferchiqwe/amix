import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function SafetyCheckInScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="CHECK-IN DE SEGURIDAD"
      title="¿Todo bien?"
      subtitle="Una respuesta basta. No necesitas justificar que quieras irte."
      safety
      sections={[
        {
          title: 'Estoy bien',
          body: 'La sesión continúa hasta la hora prevista.',
          icon: 'checkmark-circle-outline',
        },
        {
          title: 'Cambió el lugar',
          body: 'Se registra el cambio y se prepara un aviso al contacto de confianza.',
          icon: 'swap-horizontal-outline',
        },
        {
          title: 'Quiero terminar',
          body: 'Puedes cerrar la salida sin penalización automática.',
          icon: 'exit-outline',
        },
      ]}
      actions={[
        { label: 'Estoy bien', message: 'Check-in registrado en modo demostración.' },
        {
          label: 'Cambió el lugar',
          variant: 'secondary',
          message: 'Cambio de lugar registrado en modo demostración.',
        },
        { label: 'Necesito ayuda', href: '/safety/active-session', variant: 'danger' },
      ]}
    />
  );
}
