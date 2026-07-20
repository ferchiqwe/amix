import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function NotificationsScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="NOTIFICACIONES"
      title="Lo importante, no el ruido"
      subtitle="Los permisos se piden cuando entiendes para qué sirven."
      sections={[
        {
          title: 'Plan confirmado',
          body: 'Matcha, cámara y chisme · domingo 4:30 p. m.',
          icon: 'calendar-outline',
        },
        {
          title: 'Check-in pendiente',
          body: 'Matcha Bloom Day · recuerda confirmar asistencia.',
          icon: 'qr-code-outline',
        },
        {
          title: 'Dato actualizado',
          body: 'Café Lila actualizó sus horarios y amenidades.',
          icon: 'map-outline',
        },
      ]}
      actions={[
        { label: 'Configurar notificaciones', href: '/settings/permissions', variant: 'secondary' },
      ]}
    />
  );
}
