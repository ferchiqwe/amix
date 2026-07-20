import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function SafetyHomeScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="MODO SEGURO"
      title="Acompañamiento con fecha de caducidad"
      subtitle="Comparte un plan con una persona de confianza y define cuándo esperas llegar."
      safety
      notice="Modo demostración. Estas funciones todavía no reemplazan a los servicios de emergencia."
      sections={[
        {
          title: 'Contacto de confianza',
          body: 'Privado, cifrado y nunca visible para otras usuarias.',
          icon: 'people-outline',
        },
        {
          title: 'Hora esperada',
          body: 'Recibe un check-in y avisa si el plan cambia.',
          icon: 'time-outline',
        },
        {
          title: 'Ubicación temporal',
          body: 'Solo con consentimiento, expira y no se guarda indefinidamente.',
          icon: 'location-outline',
        },
      ]}
      actions={[
        { label: 'Iniciar salida demo', href: '/safety/active-session' },
        { label: 'Configurar contacto', href: '/safety/trusted-contacts', variant: 'secondary' },
        { label: 'Camina conmigo', href: '/safety/walk-with-me', variant: 'secondary' },
      ]}
    />
  );
}
