import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function ReviewDetailScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="RESEÑA"
      title="Lo que otra chica pensó en contarte"
      subtitle="Opinión independiente con evidencia y contexto aproximado."
      badge="Publicada · identidad confirmada"
      sections={[
        {
          title: 'Ambiente y comodidad',
          body: 'Buena luz, música moderada y mesas con espacio para cartera.',
          icon: 'sparkles-outline',
        },
        {
          title: 'Contexto',
          body: 'Visita de tarde · julio · consumo pagado por la autora.',
          icon: 'calendar-outline',
        },
        {
          title: '¿Volvería?',
          body: 'Sí, especialmente para una primera salida corta.',
          icon: 'heart-outline',
        },
      ]}
      actions={[
        {
          label: 'Reportar información objetiva',
          variant: 'secondary',
          message: 'Solicitud registrada en modo demostración.',
        },
      ]}
    />
  );
}
