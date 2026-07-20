import { StyleSheet, View } from 'react-native';

import { PlaceCard } from '@/components/cards';
import { GirlMap } from '@/components/map/GirlMap';
import { Chip } from '@/components/ui/Chip';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { places } from '@/mocks/data';
import { spacing } from '@/theme/tokens';

const filters = ['Cafeterías', 'Baños', 'Primera salida', 'Wi-Fi', 'Accesibilidad'];

export default function MapScreen() {
  return (
    <Screen
      eyebrow="GIRL MAP"
      title="La data que solo otra chica pensó en contar"
      subtitle="No es un mapa de zonas completamente seguras."
    >
      <View style={styles.stack}>
        <Notice>
          Características reportadas por la comunidad. Confirma horarios y condiciones antes de ir.
        </Notice>
        <View style={styles.filters}>
          {filters.map((filter, index) => (
            <Chip key={filter} label={filter} selected={index === 0} />
          ))}
        </View>
        <GirlMap />
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.md },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
