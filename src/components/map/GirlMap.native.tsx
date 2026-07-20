import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { places } from '@/mocks/data';
import { colors, radius } from '@/theme/tokens';

export function GirlMap() {
  return (
    <View style={styles.frame}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -12.12,
          longitude: -77.02,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        accessibilityLabel="Mapa de lugares ficticios de Lima"
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            description={place.district}
            pinColor={colors.fuchsia}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { height: 320, overflow: 'hidden', borderRadius: radius.lg },
  map: { flex: 1 },
});
