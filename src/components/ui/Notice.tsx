import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';

type NoticeProps = {
  children: string;
  tone?: 'demo' | 'safety' | 'info';
};

const toneStyle = {
  demo: { backgroundColor: colors.peony, icon: 'flask-outline' as const },
  safety: { backgroundColor: '#FBE4E7', icon: 'shield-checkmark-outline' as const },
  info: { backgroundColor: '#EDF0D4', icon: 'information-circle-outline' as const },
};

export function Notice({ children, tone = 'info' }: NoticeProps) {
  const config = toneStyle[tone];
  return (
    <View style={[styles.notice, { backgroundColor: config.backgroundColor }]}>
      <Ionicons name={config.icon} size={20} color={colors.burgundy} />
      <AppText style={styles.text} variant="caption" color={colors.burgundy}>
        {children}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md },
  text: { flex: 1 },
});
