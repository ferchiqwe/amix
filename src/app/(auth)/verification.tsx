import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { providers } from '@/services/providers';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, spacing } from '@/theme/tokens';

const steps = ['Documento', 'Selfie en vivo', 'Prueba de vida', 'Comparación facial'];

export default function VerificationScreen() {
  const router = useRouter();
  const finish = useAmixStore((state) => state.finishOnboarding);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);
    const result = await providers.identity.start();
    setVerified(result.status === 'verified');
    setLoading(false);
  };

  return (
    <Screen
      eyebrow="09 · IDENTIDAD"
      title="Identidad confirmada, no seguridad absoluta"
      subtitle="Verificar significa que la plataforma conoce tu identidad. No garantiza el comportamiento de una persona."
    >
      <View style={styles.stack}>
        <Notice tone="demo">
          Modo demostración: la verificación real todavía no está conectada.
        </Notice>
        {steps.map((step, index) => (
          <AppCard key={step} style={styles.step}>
            <AppText variant="label" color={verified ? colors.success : colors.fuchsia}>
              {verified ? '✓' : `${index + 1}`}
            </AppText>
            <AppText>{step}</AppText>
          </AppCard>
        ))}
        {!verified ? (
          <AppButton label="Simular verificación" loading={loading} onPress={() => void verify()} />
        ) : (
          <AppButton
            label="Entrar a AMIX"
            onPress={() => {
              finish();
              router.replace('/(tabs)/home');
            }}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.md },
  step: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
});
