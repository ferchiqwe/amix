import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function BlockedUsersScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="BLOQUEOS"
      title="Fuera de tu espacio"
      subtitle="Un bloqueo impide mensajes, llamadas, visualización mutua y recomendaciones."
      safety
      sections={[
        {
          title: 'Lista local demo',
          body: 'Las personas que bloquees durante esta sesión aparecerán aquí cuando el backend esté conectado.',
          icon: 'ban-outline',
        },
        {
          title: 'Grupos pequeños',
          body: 'AMIX evita coincidencias intencionales entre cuentas bloqueadas.',
          icon: 'people-outline',
        },
      ]}
      actions={[{ label: 'Entendido', message: 'No hay bloqueos persistentes en este demo.' }]}
    />
  );
}
