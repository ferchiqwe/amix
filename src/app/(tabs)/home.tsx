import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { EventCard, PersonCard, PlaceCard, PlanCard } from '@/components/cards';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { categories, events, people, places, plans } from '@/mocks/data';
import { colors, spacing } from '@/theme/tokens';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <Screen
      eyebrow="LIMA · DOMINGO"
      title="¿Qué quieres hacer?"
      subtitle="Tu ciudad está llena de cosas por vivir."
    >
      <View style={styles.stack}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {categories.map((category, index) => (
            <Chip key={category} label={category} selected={index === 0} />
          ))}
        </ScrollView>

        <AppCard style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <AppText variant="label" color={colors.orange}>
              LO NUEVO EN LIMA
            </AppText>
            <AppText variant="title" color={colors.burgundy}>
              Una tarde para matcha, fotos y cero “vemos”.
            </AppText>
            <AppText color={colors.muted}>
              20 cupos · experiencia patrocinada · opinión independiente
            </AppText>
          </View>
          <Ionicons name="flower-outline" size={76} color={colors.fuchsia} />
        </AppCard>

        <SectionHeader title="Hoy cerca de ti" caption="Lugares públicos y verificables" />
        <PlanCard plan={plans[0]!} />

        <SectionHeader
          title="Este fin de semana"
          caption="Planes que no deberían morir en el chat"
        />
        {plans.slice(1).map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}

        <SectionHeader title="Experiencias de marca" caption="Beneficio claro, reseña libre" />
        <EventCard event={events[0]!} />

        <SectionHeader
          title="Lugares recomendados"
          caption="Características reportadas por la comunidad"
        />
        {places.slice(0, 2).map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}

        <SectionHeader title="Intereses parecidos" caption="Las personas vienen después del plan" />
        {people.slice(0, 2).map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}

        <AppButton
          label="Tengo una reserva"
          variant="secondary"
          onPress={() => router.push('/plans/create')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  chips: { gap: spacing.sm, paddingRight: spacing.lg },
  heroCard: {
    backgroundColor: colors.peony,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroCopy: { flex: 1, gap: spacing.sm },
});
