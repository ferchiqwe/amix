import { OnboardingPage } from '@/components/onboarding/OnboardingPage';

export default function WelcomeScreen() {
  return (
    <OnboardingPage
      step="01 · BIENVENIDA"
      title="Tus amigas no pueden. Tú sí."
      subtitle="Encuentra primero algo que quieras vivir. Después descubre quién más quiere hacerlo."
      bullets={[
        'Descubre planes reales en Lima',
        'Encuentra lugares útiles para salir',
        'Conversa antes de conocer a alguien',
      ]}
      nextHref="/(auth)/intro"
      secondaryHref="/(tabs)/home"
      secondaryLabel="Entrar al demo"
    />
  );
}
