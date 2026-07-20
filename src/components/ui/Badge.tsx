import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';

type BadgeProps = {
  label: string;
  tone?: 'pink' | 'green' | 'orange' | 'neutral';
};

const backgrounds = {
  pink: colors.peony,
  green: colors.pistachio,
  orange: '#F6C2AA',
  neutral: colors.white,
};

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: backgrounds[tone] }]}>
      <AppText variant="caption" color={colors.burgundy}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.line,
  },
});
