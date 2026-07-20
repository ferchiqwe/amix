import { OnboardingPage } from '@/components/onboarding/OnboardingPage';

export default function LoginScreen() {
  return (
    <OnboardingPage
      step="04 · CUENTA DEMO"
      title="Guarda tus planes."
      subtitle="Email, Apple y Google quedarán conectados con Supabase Auth en producción."
      bullets={['Email de demostración', 'Sign in with Apple preparado', 'Google preparado']}
      nextHref="/(auth)/register"
      nextLabel="Crear cuenta demo"
      secondaryHref="/(tabs)/home"
      secondaryLabel="Ya tengo cuenta · entrar"
    />
  );
}
