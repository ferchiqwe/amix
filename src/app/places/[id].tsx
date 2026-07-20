import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { places } from '@/mocks/data';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, radius, spacing } from '@/theme/tokens';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const place = places.find((item) => item.id === id) ?? places[0]!;
  const saved = useAmixStore((state) => state.savedIds.includes(place.id));
  const toggleSaved = useAmixStore((state) => state.toggleSaved);
  return (
    <Screen
      eyebrow={place.category}
      title={place.name}
      subtitle={`${place.district} · ★ ${place.rating}`}
    >
      <View style={styles.stack}>
        <Image source={place.image} style={styles.image} contentFit="cover" />
        <View style={styles.row}>
          <Badge
            label={
              place.verified
                ? 'Lugar verificado bajo criterios de AMIX'
                : 'Información por confirmar'
            }
            tone={place.verified ? 'green' : 'orange'}
          />
          <Badge label={place.budget} />
        </View>
        <Notice>{`Características reportadas por la comunidad. ${place.lastUpdated}.`}</Notice>
        <AppCard style={styles.info}>
          <AppText variant="label" color={colors.fuchsia}>
            DIRECCIÓN COMERCIAL
          </AppText>
          <AppText>{place.address}</AppText>
          <AppText>Horario demo: 9:00 a. m. – 9:00 p. m.</AppText>
        </AppCard>
        <AppText variant="title">Lo que otras chicas reportaron</AppText>
        <View style={styles.chips}>
          {place.amenities.map((amenity) => (
            <Chip key={amenity} label={amenity} />
          ))}
        </View>
        <AppCard style={styles.review}>
          <AppText variant="label" color={colors.success}>
            RESEÑA INDEPENDIENTE
          </AppText>
          <AppText>
            “El baño estaba limpio, había ganchito para cartera y pude pedir taxi desde la puerta.”
          </AppText>
          <AppText variant="caption" color={colors.muted}>
            Visita aproximada: julio · foto de mesa verificada
          </AppText>
        </AppCard>
        <AppButton
          label={saved ? 'Guardado ✓' : 'Guardar lugar'}
          variant={saved ? 'secondary' : 'primary'}
          onPress={() => toggleSaved(place.id)}
        />
        <AppButton
          label="Crear plan aquí"
          variant="secondary"
          onPress={() => router.push(`/plans/create?place=${place.name}`)}
        />
        <AppButton
          label="Escribir reseña"
          variant="secondary"
          onPress={() => router.push(`/reviews/create?placeId=${place.id}`)}
        />
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
    backgroundColor: colors.pistachio,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  info: { gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  review: { gap: spacing.sm, backgroundColor: colors.white },
});
