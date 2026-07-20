import { OnboardingPage } from '@/components/onboarding/OnboardingPage';

export default function IntroScreen() {
  return (
    <OnboardingPage
      step="02 · CÓMO FUNCIONA"
      title="Un plan primero. La conversación después."
      subtitle="AMIX no es una app de citas ni una fila infinita de caras."
      bullets={[
        'Elige una actividad que sí te emocione',
        'Mira quién tiene intereses compatibles',
        'Primera salida siempre en un lugar público',
      ]}
      nextHref="/(auth)/age-check"
    />
  );
}
