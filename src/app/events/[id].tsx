import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { events } from '@/mocks/data';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, radius, spacing } from '@/theme/tokens';

const matchaEditorial = require('@/assets/images/demo/matcha-editorial.jpg');

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = events.find((item) => item.id === id) ?? events[0]!;
  const applied = useAmixStore((state) => state.appliedEventIds.includes(event.id));
  const toggle = useAmixStore((state) => state.toggleEventApplication);
  return (
    <Screen
      eyebrow="EXPERIENCIA PATROCINADA"
      title={event.title}
      subtitle={`${event.brand} · ${event.dateLabel}`}
    >
      <View style={styles.stack}>
        <Image source={matchaEditorial} style={styles.image} contentFit="cover" />
        <Badge label={`${event.spots} cupos`} tone="orange" />
        <AppCard style={styles.info}>
          <AppText variant="title">Qué incluye</AppText>
          <AppText>{event.benefit}</AppText>
          <AppText variant="title">Qué no incluye</AppText>
          <AppText>Traslado, consumos extra ni obligación de publicar contenido.</AppText>
        </AppCard>
        <Notice>
          Producto o servicio recibido sin costo. La marca no revisa, aprueba ni edita esta opinión.
        </Notice>
        <AppCard style={styles.rules}>
          <AppText variant="label" color={colors.burgundy}>
            RESEÑA INDEPENDIENTE
          </AppText>
          <AppText>
            Puedes opinar de forma positiva, neutral o negativa. La marca no puede exigir cinco
            estrellas ni borrar una crítica válida.
          </AppText>
        </AppCard>
        <AppButton
          label={applied ? 'Retirar postulación' : 'Postular al evento'}
          variant={applied ? 'secondary' : 'primary'}
          onPress={() => toggle(event.id)}
        />
        {applied ? (
          <AppButton
            label="Ver QR y check-in demo"
            variant="secondary"
            onPress={() => router.push(`/events/check-in?eventId=${event.id}`)}
          />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  image: {
    width: '100%',
    aspectRatio: 1.55,
    borderRadius: radius.lg,
    backgroundColor: colors.peony,
  },
  info: { gap: spacing.sm },
  rules: { gap: spacing.sm, backgroundColor: colors.pistachio },
});
