import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Screen } from '@/components/ui/Screen';
import { colors, radius, spacing } from '@/theme/tokens';

const photo =
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <Screen eyebrow="MI PERFIL" title="Ferchi, 25" subtitle="San Borja · zona aproximada">
      <View style={styles.stack}>
        <AppCard style={styles.hero}>
          <Image source={photo} style={styles.photo} contentFit="cover" />
          <View style={styles.profileCopy}>
            <Badge label="Identidad confirmada" tone="green" />
            <AppText variant="lead">Cine, beauty y planes bonitos que sí salen del chat.</AppText>
            <AppText variant="caption" color={colors.muted}>
              Verificación reciente · 7 actividades completadas
            </AppText>
          </View>
        </AppCard>
        <AppCard style={styles.question}>
          <AppText variant="label" color={colors.fuchsia}>
            MI PLAN PERFECTO EMPIEZA CON…
          </AppText>
          <AppText variant="title">un cafecito, una cámara y cero apuro.</AppText>
        </AppCard>
        <View style={styles.actions}>
          <AppButton
            label="Modo Seguro"
            variant="secondary"
            onPress={() => router.push('/safety')}
          />
          <AppButton
            label="Notificaciones"
            variant="secondary"
            onPress={() => router.push('/notifications')}
          />
          <AppButton
            label="Privacidad y ajustes"
            variant="secondary"
            onPress={() => router.push('/settings')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  hero: { padding: 0, overflow: 'hidden' },
  photo: { width: '100%', aspectRatio: 1.6, backgroundColor: colors.peony },
  profileCopy: { padding: spacing.lg, gap: spacing.md },
  question: {
    backgroundColor: colors.pistachio,
    transform: [{ rotate: '-1deg' }],
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  actions: { gap: spacing.sm },
});
