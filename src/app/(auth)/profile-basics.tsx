import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { colors, radius, spacing, touchTarget } from '@/theme/tokens';

export default function ProfileBasicsScreen() {
  const router = useRouter();
  const [name, setName] = useState('Ferchi');
  const [district, setDistrict] = useState('San Borja');
  const [bio, setBio] = useState('Cine, beauty y planes bonitos que sí salen del chat.');

  return (
    <Screen
      eyebrow="06 · PERFIL"
      title="Que sepan lo justo"
      subtitle="Tu zona es aproximada. Nunca mostramos dirección, teléfono, trabajo o rutina."
    >
      <View style={styles.form}>
        <Field label="Nombre visible" value={name} onChangeText={setName} />
        <Field label="Distrito o zona aproximada" value={district} onChangeText={setDistrict} />
        <Field label="Bio" value={bio} onChangeText={setBio} multiline />
        <AppButton
          label="Elegir mis intereses"
          disabled={!name.trim() || !district.trim()}
          onPress={() => router.push('/(auth)/interests')}
        />
      </View>
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.ink,
    fontSize: 16,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
});
