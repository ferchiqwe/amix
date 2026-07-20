import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { Chip } from '@/components/ui/Chip';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { providers } from '@/services/providers';
import { colors, radius, spacing } from '@/theme/tokens';

export default function CreateReviewScreen() {
  const router = useRouter();
  const [text, setText] = useState(
    'El lugar tenía buena luz, el baño estaba limpio y pude pedir taxi desde la puerta.',
  );
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [receivedFree, setReceivedFree] = useState(false);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setMediaUri(result.assets[0]?.uri ?? null);
  };

  const publish = () => {
    providers.analytics.track('review_published', { receivedFree });
    Alert.alert('Reseña publicada en modo demo', 'Tu opinión queda marcada como independiente.', [
      { text: 'Listo', onPress: () => router.back() },
    ]);
  };

  return (
    <Screen
      eyebrow="RESEÑA INDEPENDIENTE"
      title="Cuenta lo que sí ayuda"
      subtitle="Necesitas identidad confirmada, texto y al menos una foto o video."
    >
      <View style={styles.form}>
        <Notice tone="safety">
          No incluyas rostros de terceros, documentos, teléfonos ni información privada.
        </Notice>
        <TextInput
          accessibilityLabel="Texto de la reseña"
          value={text}
          onChangeText={setText}
          multiline
          style={styles.input}
        />
        <View style={styles.chips}>
          <Chip label="Baño limpio" selected />
          <Chip label="Buena iluminación" selected />
          <Chip label="Primera salida" />
        </View>
        {mediaUri ? <Image source={mediaUri} style={styles.preview} contentFit="cover" /> : null}
        <AppButton
          label={mediaUri ? 'Cambiar foto o video' : 'Agregar foto o video'}
          variant="secondary"
          onPress={() => void pickMedia()}
        />
        <AppButton
          label={receivedFree ? 'Recibí algo gratis ✓' : '¿Recibiste algo gratis?'}
          variant="secondary"
          onPress={() => setReceivedFree((value) => !value)}
        />
        {receivedFree ? (
          <Notice>
            Producto o servicio recibido sin costo. La marca no revisa, aprueba ni edita esta
            opinión.
          </Notice>
        ) : null}
        <AppButton
          label="Publicar reseña demo"
          disabled={!text.trim() || !mediaUri}
          onPress={publish}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  input: {
    minHeight: 160,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    fontSize: 16,
    color: colors.ink,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  preview: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: radius.md,
    backgroundColor: colors.peony,
  },
});
