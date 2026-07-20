import * as Location from 'expo-location';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { colors, spacing } from '@/theme/tokens';

export default function WalkWithMeScreen() {
  const [status, setStatus] = useState('La ubicación está apagada.');
  const request = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    setStatus(
      permission.granted
        ? 'Permiso concedido. Sesión temporal demo lista por 15 minutos.'
        : 'Permiso denegado. Puedes usar Modo Seguro sin ubicación.',
    );
  };
  return (
    <Screen
      eyebrow="CAMINA CONMIGO"
      title="Ubicación temporal, no historial"
      subtitle="Se comparte únicamente con tu contacto de confianza y expira."
    >
      <View style={styles.stack}>
        <Notice tone="safety">Modo demostración: no se transmite ni almacena tu ubicación.</Notice>
        <AppCard style={styles.map}>
          <AppText variant="hero">⌖</AppText>
          <AppText align="center">{status}</AppText>
        </AppCard>
        <AppButton label="Explicar y pedir permiso" onPress={() => void request()} />
        <AppButton
          label="Iniciar 15 minutos demo"
          variant="secondary"
          onPress={() => setStatus('Sesión demo activa · expira en 15:00')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  map: {
    minHeight: 260,
    backgroundColor: colors.pistachio,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
});
