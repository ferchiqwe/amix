import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { providers } from '@/services/providers';
import { colors, radius, spacing, touchTarget } from '@/theme/tokens';
import { getPlaceValidationMessage } from '@/utils/safety';

export default function CreatePlanScreen() {
  const params = useLocalSearchParams<{ place?: string }>();
  const router = useRouter();
  const [title, setTitle] = useState('Cafecito y fotos bonitas');
  const [place, setPlace] = useState(params.place ?? 'Café Lila');
  const placeError = getPlaceValidationMessage(place);

  const publish = () => {
    providers.analytics.track('plan_created', { category: 'Cafecito' });
    Alert.alert(
      'Plan publicado en modo demo',
      'Tu plan aparecería para usuarias verificadas con intereses compatibles.',
      [{ text: 'Ver mis planes', onPress: () => router.replace('/(tabs)/plans') }],
    );
  };

  return (
    <Screen
      eyebrow="CREAR PLAN"
      title="Haz que ocurra"
      subtitle="Solo usuarias verificadas pueden publicar. El lugar debe ser público y verificable."
    >
      <View style={styles.form}>
        <Field label="Nombre del plan" value={title} onChangeText={setTitle} />
        <Field label="Lugar comercial o cultural" value={place} onChangeText={setPlace} />
        {placeError ? <AppText color={colors.emergency}>{placeError}</AppText> : null}
        <View style={styles.chips}>
          <Chip label="Cafecito" selected />
          <Chip label="4 cupos" />
          <Chip label="S/ 25–45" />
          <Chip label="Grupo pequeño" />
        </View>
        <Notice tone="safety">
          No se aceptan casas, departamentos, hoteles, alojamientos ni direcciones privadas como
          primer punto de reunión.
        </Notice>
        <AppButton
          label="Publicar plan demo"
          disabled={!title.trim() || Boolean(placeError)}
          onPress={publish}
        />
      </View>
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  field: { gap: spacing.sm },
  input: {
    minHeight: touchTarget,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.ink,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
