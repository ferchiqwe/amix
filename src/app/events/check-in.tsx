import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { providers } from '@/services/providers';
import { colors, spacing } from '@/theme/tokens';

export default function EventCheckInScreen() {
  const { eventId = 'matcha-bloom' } = useLocalSearchParams<{ eventId?: string }>();
  const router = useRouter();
  const [done, setDone] = useState(false);
  return (
    <Screen
      eyebrow="CHECK-IN"
      title={done ? 'Llegaste ✦' : 'Tu entrada demo'}
      subtitle="El QR real se conectará con el proveedor de asistencia."
    >
      <View style={styles.stack}>
        <Notice tone="demo">
          Modo demostración: este QR no contiene datos reales ni valida acceso.
        </Notice>
        <AppCard style={styles.qr}>
          <AppText variant="hero" color={colors.burgundy}>
            ▦
          </AppText>
          <AppText variant="label">AMIX-{eventId.toUpperCase()}</AppText>
        </AppCard>
        {!done ? (
          <AppButton
            label="Simular check-in"
            onPress={() => void providers.checkIn.checkIn(eventId).then(() => setDone(true))}
          />
        ) : (
          <AppButton
            label="Crear reseña independiente"
            onPress={() => router.push(`/reviews/create?eventId=${eventId}`)}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  qr: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
  },
});
