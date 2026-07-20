import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { colors, spacing } from '@/theme/tokens';

export default function ActiveSafetySessionScreen() {
  const router = useRouter();
  const [sos, setSos] = useState(false);
  const trigger = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setSos(true);
    Alert.alert('SOS simulado', 'No se contactó a emergencias ni se envió ubicación real.');
  };
  return (
    <Screen
      eyebrow="SALIDA ACTIVA"
      title={sos ? 'SOS simulado activado' : 'Todo va según lo previsto'}
      subtitle="Matcha, cámara y chisme · llegada esperada 7:30 p. m."
    >
      <View style={styles.stack}>
        <Notice tone="safety">
          Modo demostración. Esta función todavía no reemplaza a los servicios de emergencia.
        </Notice>
        <AppCard style={styles.status}>
          <AppText variant="label" color={colors.success}>
            SESIÓN ACTIVA
          </AppText>
          <AppText>Contacto demo avisado · ubicación no compartida</AppText>
          <AppText>Próximo check-in: 6:45 p. m.</AppText>
        </AppCard>
        <AppButton label="Hacer check-in" onPress={() => router.push('/safety/check-in')} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mantén presionado tres segundos para simular SOS"
          delayLongPress={3000}
          onLongPress={trigger}
          style={[styles.sos, sos && styles.sosActive]}
        >
          <AppText variant="title" color={colors.white}>
            Mantén 3 s para SOS
          </AppText>
          <AppText color={colors.white}>Suelta antes para cancelar</AppText>
        </Pressable>
        {sos ? (
          <AppButton
            label="Cancelar SOS simulado"
            variant="secondary"
            onPress={() => setSos(false)}
          />
        ) : null}
        <AppButton
          label="Llegué bien · finalizar"
          variant="secondary"
          onPress={() => router.back()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  status: { gap: spacing.sm, backgroundColor: colors.pistachio },
  sos: {
    minHeight: 150,
    borderRadius: 75,
    backgroundColor: colors.emergency,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.lg,
  },
  sosActive: { backgroundColor: colors.burgundy },
});
