import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function PermissionsScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="PERMISOS EN CONTEXTO"
      title="Nada de pedir todo al abrir"
      subtitle="Cada permiso aparece solo cuando activas la función que lo necesita."
      sections={[
        {
          title: 'Cámara',
          body: 'Al verificar identidad o adjuntar contenido.',
          icon: 'camera-outline',
        },
        {
          title: 'Ubicación',
          body: 'Al abrir Girl Map o iniciar Modo Seguro.',
          icon: 'location-outline',
        },
        { title: 'Micrófono', body: 'Al empezar una llamada interna real.', icon: 'mic-outline' },
        {
          title: 'Notificaciones',
          body: 'Después de explicar recordatorios, check-ins y cambios de lugar.',
          icon: 'notifications-outline',
        },
      ]}
      actions={[
        {
          label: 'Abrir ajustes del sistema',
          variant: 'secondary',
          message: 'En producción abrirá la configuración del dispositivo.',
        },
      ]}
    />
  );
}
