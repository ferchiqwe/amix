import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function PrivacyScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="PRIVACIDAD"
      title="Guardar menos también es seguridad"
      subtitle="AMIX evita retener datos sensibles que no necesita."
      safety
      sections={[
        {
          title: 'Identidad',
          body: 'Producción almacenará resultado, fecha, identificador cifrado, nivel y estado; no biometría cruda.',
          icon: 'id-card-outline',
        },
        {
          title: 'Ubicación',
          body: 'Temporal, con consentimiento, expiración y retención mínima.',
          icon: 'location-outline',
        },
        {
          title: 'Marcas',
          body: 'Nunca reciben DNI, teléfonos, chats, documentos ni contactos de confianza.',
          icon: 'business-outline',
        },
        {
          title: 'Tus derechos',
          body: 'Acceso, exportación, eliminación, consentimientos y retención.',
          icon: 'document-lock-outline',
        },
      ]}
      actions={[
        {
          label: 'Ver términos demo',
          variant: 'secondary',
          message: 'Documento legal pendiente de revisión profesional.',
        },
      ]}
    />
  );
}
