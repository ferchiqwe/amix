import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';

export function GirlMap() {
  return (
    <View style={styles.map}>
      <View style={styles.pin}>
        <AppText variant="hero">✦</AppText>
      </View>
      <AppText variant="title" align="center">
        Mapa interactivo en iOS y Android
      </AppText>
      <AppText color={colors.muted} align="center">
        La versión web muestra esta vista accesible. Los lugares ficticios siguen disponibles
        debajo.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 280,
    backgroundColor: colors.pistachio,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    top: 20,
    right: 28,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.peony,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
