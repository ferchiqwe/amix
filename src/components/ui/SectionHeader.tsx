import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, spacing } from '@/theme/tokens';

export function SectionHeader({ title, caption }: { title: string; caption?: string }) {
  return (
    <View style={styles.header}>
      <AppText variant="title">{title}</AppText>
      {caption ? (
        <AppText variant="caption" color={colors.muted}>
          {caption}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({ header: { gap: spacing.xs, marginTop: spacing.sm } });
