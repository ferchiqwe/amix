import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { colors, radius, spacing, touchTarget } from '@/theme/tokens';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('ferchi@amix.demo');
  return (
    <Screen
      eyebrow="05 · REGISTRO"
      title="Tu pase al demo"
      subtitle="Ningún dato se envía a un servidor en esta versión."
    >
      <View style={styles.form}>
        <AppText variant="label">Email</AppText>
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Notice tone="demo">
          Modo demostración: no se crea una cuenta real ni se guarda este email.
        </Notice>
        <AppButton
          label="Continuar"
          disabled={!email.includes('@')}
          onPress={() => router.push('/(auth)/profile-basics')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md },
  input: {
    minHeight: touchTarget,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    color: colors.ink,
    fontSize: 16,
  },
});
