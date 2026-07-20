import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Screen } from '@/components/ui/Screen';
import { colors, spacing } from '@/theme/tokens';

type OnboardingPageProps = {
  step: string;
  title: string;
  subtitle: string;
  bullets: string[];
  nextHref: Href;
  nextLabel?: string;
  secondaryHref?: Href;
  secondaryLabel?: string;
};

export function OnboardingPage({
  step,
  title,
  subtitle,
  bullets,
  nextHref,
  nextLabel = 'Continuar',
  secondaryHref,
  secondaryLabel,
}: OnboardingPageProps) {
  const router = useRouter();
  return (
    <Screen scroll={false}>
      <View style={styles.layout}>
        <Badge label={step} tone="pink" />
        <View style={styles.copy}>
          <AppText variant="hero" color={colors.burgundy}>
            {title}
          </AppText>
          <AppText variant="lead" color={colors.muted}>
            {subtitle}
          </AppText>
        </View>
        <View style={styles.bullets}>
          {bullets.map((bullet, index) => (
            <AppCard key={bullet} style={[styles.bullet, ...(index === 1 ? [styles.offset] : [])]}>
              <AppText variant="label" color={colors.fuchsia}>
                0{index + 1}
              </AppText>
              <AppText style={styles.bulletText}>{bullet}</AppText>
            </AppCard>
          ))}
        </View>
        <View style={styles.actions}>
          <AppButton label={nextLabel} onPress={() => router.push(nextHref)} />
          {secondaryHref && secondaryLabel ? (
            <AppButton
              label={secondaryLabel}
              variant="ghost"
              onPress={() => router.push(secondaryHref)}
            />
          ) : null}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-between',
    gap: spacing.xl,
    paddingVertical: spacing.lg,
  },
  copy: { gap: spacing.sm },
  bullets: { gap: spacing.md },
  bullet: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  offset: { marginLeft: spacing.lg },
  bulletText: { flex: 1 },
  actions: { gap: spacing.sm },
});
