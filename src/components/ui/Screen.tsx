import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/AppText';
import { colors, contentMaxWidth, spacing } from '@/theme/tokens';

type ScreenProps = PropsWithChildren<{
  title?: string | undefined;
  eyebrow?: string | undefined;
  subtitle?: string | undefined;
  action?: ReactNode | undefined;
  scroll?: boolean | undefined;
  backgroundColor?: string | undefined;
}>;

export function Screen({
  children,
  title,
  eyebrow,
  subtitle,
  action,
  scroll = true,
  backgroundColor = colors.cream,
}: ScreenProps) {
  const { width } = useWindowDimensions();
  const horizontalPadding = width >= 768 ? spacing.xxl : spacing.lg;
  const content = (
    <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
      {(title || eyebrow || subtitle || action) && (
        <View style={styles.header}>
          <View style={styles.headerText}>
            {eyebrow ? (
              <AppText variant="label" color={colors.fuchsia}>
                {eyebrow.toUpperCase()}
              </AppText>
            ) : null}
            {title ? <AppText variant="title">{title}</AppText> : null}
            {subtitle ? (
              <AppText variant="body" color={colors.muted}>
                {subtitle}
              </AppText>
            ) : null}
          </View>
          {action}
        </View>
      )}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: 'center' },
  content: { width: '100%', maxWidth: contentMaxWidth, paddingTop: spacing.lg, paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  headerText: { flex: 1, gap: spacing.xs },
});
