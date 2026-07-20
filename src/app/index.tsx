import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';

export default function SplashScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.collage} accessibilityElementsHidden>
        <View style={[styles.paper, styles.paperOne]} />
        <View style={[styles.paper, styles.paperTwo]} />
        <View style={styles.sticker}>
          <AppText variant="caption" color={colors.burgundy}>
            LIMA · 2026
          </AppText>
        </View>
      </View>
      <View style={styles.copy}>
        <AppText variant="hero" color={colors.burgundy} align="center">
          AMIX
        </AppText>
        <AppText variant="lead" align="center">
          Planes reales.{`\n`}Comunidad bonita.
        </AppText>
      </View>
      <AppButton label="Descubrir AMIX" onPress={() => router.push('/(auth)/welcome')} />
      <AppText variant="caption" color={colors.muted} align="center">
        MVP navegable · datos ficticios
      </AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  collage: { height: 220, alignItems: 'center', justifyContent: 'center' },
  paper: {
    position: 'absolute',
    width: 190,
    height: 210,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.burgundy,
  },
  paperOne: { backgroundColor: colors.peony, transform: [{ rotate: '-5deg' }] },
  paperTwo: { backgroundColor: colors.pistachio, transform: [{ rotate: '5deg' }] },
  sticker: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.fuchsia,
  },
  copy: { alignItems: 'center', gap: spacing.sm },
});
