import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { colors, radius, spacing } from '@/theme/tokens';

export default function VideoCallScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.preview}>
        <AppText variant="hero" color={colors.white}>
          Mica
        </AppText>
        <AppText color={colors.peony}>Vista previa de videollamada</AppText>
      </View>
      <Notice tone="demo">Modo demostración: la cámara y el micrófono no están activos.</Notice>
      <View style={styles.actions}>
        <AppButton label="Silenciar" variant="secondary" onPress={() => undefined} />
        <AppButton label="Cambiar cámara" variant="secondary" onPress={() => undefined} />
        <AppButton label="Finalizar" variant="danger" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink, padding: spacing.lg, gap: spacing.lg },
  preview: {
    flex: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.burgundy,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  actions: { gap: spacing.sm },
});
