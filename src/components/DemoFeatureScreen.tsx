import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { colors, spacing } from '@/theme/tokens';

export type FeatureSection = { title: string; body: string; icon?: keyof typeof Ionicons.glyphMap };
export type FeatureAction = {
  label: string;
  href?: Href;
  message?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

type DemoFeatureScreenProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  badge?: string;
  sections: FeatureSection[];
  actions?: FeatureAction[];
  notice?: string;
  safety?: boolean;
};

export function DemoFeatureScreen({
  eyebrow,
  title,
  subtitle,
  badge,
  sections,
  actions = [],
  notice = 'Modo demostración: este flujo usa datos ficticios y no ejecuta acciones externas.',
  safety = false,
}: DemoFeatureScreenProps) {
  const router = useRouter();
  return (
    <Screen eyebrow={eyebrow} title={title} subtitle={subtitle}>
      <View style={styles.stack}>
        {badge ? <Badge label={badge} tone={safety ? 'green' : 'pink'} /> : null}
        <Notice tone={safety ? 'safety' : 'demo'}>{notice}</Notice>
        {sections.map((section) => (
          <AppCard key={section.title} style={styles.section}>
            <Ionicons name={section.icon ?? 'sparkles-outline'} size={24} color={colors.burgundy} />
            <View style={styles.sectionText}>
              <AppText variant="lead" style={styles.strong}>
                {section.title}
              </AppText>
              <AppText color={colors.muted}>{section.body}</AppText>
            </View>
          </AppCard>
        ))}
        {actions.map((action) => (
          <AppButton
            key={action.label}
            label={action.label}
            variant={action.variant}
            onPress={() => {
              if (action.href) {
                router.push(action.href);
                return;
              }
              Alert.alert(title, action.message ?? 'Acción completada en modo demostración.');
            }}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.md },
  section: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  sectionText: { flex: 1, gap: spacing.xs },
  strong: { fontWeight: '700' },
});
