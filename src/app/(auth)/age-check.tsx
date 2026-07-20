import { OnboardingPage } from '@/components/onboarding/OnboardingPage';

export default function AgeCheckScreen() {
  return (
    <OnboardingPage
      step="03 · EDAD"
      title="AMIX es para mayores de 18."
      subtitle="Necesitamos confirmar que formas parte de una comunidad adulta."
      bullets={[
        'Tengo 18 años o más',
        'Entiendo que AMIX no promete seguridad absoluta',
        'Acepto respetar las reglas de comunidad',
      ]}
      nextHref="/(auth)/login"
      nextLabel="Confirmo que soy mayor de edad"
    />
  );
}
