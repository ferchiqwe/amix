import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { interests } from '@/mocks/data';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, spacing } from '@/theme/tokens';

export default function InterestsScreen() {
  const router = useRouter();
  const selected = useAmixStore((state) => state.selectedInterests);
  const toggle = useAmixStore((state) => state.toggleInterest);
  return (
    <Screen
      eyebrow="07 · INTERESES"
      title="¿Qué sí te saca de casa?"
      subtitle="Elige al menos tres. Esto ordena planes antes que perfiles."
    >
      <View style={styles.chips}>
        {interests.map((interest) => (
          <Chip
            key={interest}
            label={interest}
            selected={selected.includes(interest)}
            onPress={() => toggle(interest)}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <AppText variant="caption" color={colors.muted}>
          {selected.length} seleccionados
        </AppText>
        <AppButton
          label="Continuar"
          disabled={selected.length < 3}
          onPress={() => router.push('/(auth)/social-style')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footer: { marginTop: spacing.xl, gap: spacing.md },
});
