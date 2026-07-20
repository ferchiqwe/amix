import { OnboardingPage } from '@/components/onboarding/OnboardingPage';

export default function SocialStyleScreen() {
  return (
    <OnboardingPage
      step="08 · TU ENERGÍA"
      title="Mi plan perfecto empieza con…"
      subtitle="Un mini cuestionario editorial para encontrar ritmos compatibles, no personas idénticas."
      bullets={[
        'Un cafecito y una conversación real',
        'Presupuesto habitual: S/ 30–70',
        'Energía social: creativa y conversadora',
      ]}
      nextHref="/(auth)/verification"
      nextLabel="Guardar respuestas"
    />
  );
}
