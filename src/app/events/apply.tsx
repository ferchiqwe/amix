import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function EventApplyScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="POSTULACIÓN"
      title="¿Te apuntas?"
      subtitle="La selección usa requisitos visibles, no promesas escondidas."
      sections={[
        {
          title: 'Tu postulación',
          body: 'Intereses compatibles · mayor de edad · identidad confirmada',
          icon: 'document-text-outline',
        },
        {
          title: 'Contenido voluntario',
          body: 'No es obligatorio publicar, etiquetar ni emitir una reseña positiva.',
          icon: 'camera-outline',
        },
      ]}
      actions={[
        { label: 'Enviar postulación demo', message: 'Postulación enviada en modo demostración.' },
      ]}
    />
  );
}
