import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { providers } from '@/services/providers';
import { colors, radius, spacing } from '@/theme/tokens';

const reasons = [
  'Identidad falsa',
  'Acoso',
  'Solicitud de dinero',
  'Conducta peligrosa',
  'Información privada',
  'Spam',
  'Discriminación',
  'Otro',
];

export default function CreateReportScreen() {
  const router = useRouter();
  const [reason, setReason] = useState('Conducta peligrosa');
  const [detail, setDetail] = useState('');
  const submit = () => {
    providers.analytics.track('report_submitted', { category: reason });
    Alert.alert(
      'Reporte enviado en modo demo',
      'En producción pasaría a revisión humana y tendría un canal de apelación.',
      [{ text: 'Cerrar', onPress: () => router.back() }],
    );
  };
  return (
    <Screen
      eyebrow="REPORTAR"
      title="Cuéntanos qué pasó"
      subtitle="Reportar no bloquea automáticamente a alguien por una frase aislada."
    >
      <View style={styles.stack}>
        <Notice tone="safety">
          Si existe peligro inmediato, contacta a los servicios de emergencia locales. AMIX no los
          reemplaza.
        </Notice>
        <View style={styles.chips}>
          {reasons.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={item === reason}
              onPress={() => setReason(item)}
            />
          ))}
        </View>
        <View style={styles.field}>
          <AppText variant="label">Contexto opcional</AppText>
          <TextInput
            accessibilityLabel="Contexto del reporte"
            value={detail}
            onChangeText={setDetail}
            multiline
            placeholder="No incluyas documentos ni datos sensibles…"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>
        <AppButton label="Enviar reporte demo" onPress={submit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  field: { gap: spacing.sm },
  input: {
    minHeight: 140,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: 16,
    color: colors.ink,
  },
});
