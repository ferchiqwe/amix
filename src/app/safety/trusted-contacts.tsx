import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function TrustedContactsScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="CONTACTO DE CONFIANZA"
      title="Una persona que sí toma acción"
      subtitle="Este dato es privado y nunca se comparte con marcas ni otras usuarias."
      safety
      sections={[
        {
          title: 'Contacto demo',
          body: 'Familiar · termina en ••42 · sin número real almacenado',
          icon: 'person-circle-outline',
        },
        {
          title: 'Qué recibe',
          body: 'Nombre del plan, hora esperada y alertas que tú autorices.',
          icon: 'notifications-outline',
        },
        {
          title: 'Qué no recibe',
          body: 'Tus chats, documento, historial ni ubicación permanente.',
          icon: 'lock-closed-outline',
        },
      ]}
      actions={[
        {
          label: 'Guardar contacto demo',
          message: 'Contacto guardado solo durante esta demostración.',
        },
      ]}
    />
  );
}
