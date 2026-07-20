import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, radius, spacing } from '@/theme/tokens';
import type { Event, Person, Place, Plan } from '@/types/domain';

const matchaEditorial = require('@/assets/images/demo/matcha-editorial.jpg');

export function PlanCard({ plan }: { plan: Plan }) {
  const router = useRouter();
  const interested = useAmixStore((state) => state.interestedPlanIds.includes(plan.id));
  const toggleInterest = useAmixStore((state) => state.togglePlanInterest);

  return (
    <AppCard
      accessibilityLabel={`Abrir plan ${plan.title}`}
      onPress={() => router.push(`/plans/${plan.id}`)}
      style={styles.card}
    >
      <Image
        source={plan.id === 'matcha-domingo' ? matchaEditorial : plan.image}
        style={styles.image}
        contentFit="cover"
        transition={220}
      />
      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Badge label={plan.category} tone="pink" />
          {plan.verifiedVenue ? <Badge label="Lugar verificado" tone="green" /> : null}
        </View>
        <AppText variant="title">{plan.title}</AppText>
        <AppText color={colors.muted}>
          {plan.place} · {plan.district}
        </AppText>
        <View style={styles.metaRow}>
          <Meta icon="calendar-outline" text={plan.dateLabel} />
          <Meta icon="time-outline" text={plan.time} />
          <Meta icon="wallet-outline" text={plan.budget} />
        </View>
        <View style={styles.rowBetween}>
          <AppText variant="caption" color={colors.muted}>
            {plan.interested + (interested ? 1 : 0)} interesadas · {plan.spots} cupos
          </AppText>
          <AppButton
            label={interested ? 'Me interesa ✓' : 'Yo también'}
            variant={interested ? 'secondary' : 'primary'}
            onPress={() => toggleInterest(plan.id)}
          />
        </View>
      </View>
    </AppCard>
  );
}

export function PersonCard({ person }: { person: Person }) {
  const router = useRouter();
  return (
    <AppCard
      accessibilityLabel={`Ver perfil de ${person.name}`}
      onPress={() => router.push(`/people/${person.id}`)}
      style={styles.personCard}
    >
      <Image source={person.image} style={styles.avatar} contentFit="cover" transition={180} />
      <View style={styles.personBody}>
        <View style={styles.inline}>
          <AppText variant="lead" style={styles.strong}>
            {person.name}, {person.age}
          </AppText>
          {person.verified ? (
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
          ) : null}
        </View>
        <AppText variant="caption" color={colors.muted}>
          {person.district} · {person.commonPlans} planes en común
        </AppText>
        <AppText numberOfLines={2}>{person.bio}</AppText>
      </View>
    </AppCard>
  );
}

export function PlaceCard({ place }: { place: Place }) {
  const router = useRouter();
  return (
    <AppCard
      accessibilityLabel={`Abrir ${place.name}`}
      onPress={() => router.push(`/places/${place.id}`)}
      style={styles.placeCard}
    >
      <Image source={place.image} style={styles.placeImage} contentFit="cover" transition={180} />
      <View style={styles.personBody}>
        <Badge label={place.category} tone="green" />
        <AppText variant="lead" style={styles.strong}>
          {place.name}
        </AppText>
        <AppText variant="caption" color={colors.muted}>
          {place.district} · ★ {place.rating} · {place.budget}
        </AppText>
        <AppText variant="caption" numberOfLines={1}>
          {place.amenities.slice(0, 3).join(' · ')}
        </AppText>
      </View>
    </AppCard>
  );
}

export function EventCard({ event }: { event: Event }) {
  const router = useRouter();
  return (
    <AppCard
      accessibilityLabel={`Abrir experiencia ${event.title}`}
      onPress={() => router.push(`/events/${event.id}`)}
      style={styles.card}
    >
      <Image
        source={matchaEditorial}
        style={styles.eventImage}
        contentFit="cover"
        transition={220}
      />
      <View style={styles.body}>
        <Badge label="Experiencia patrocinada" tone="orange" />
        <AppText variant="title">{event.title}</AppText>
        <AppText>{event.benefit}</AppText>
        <AppText variant="caption" color={colors.muted}>
          {event.brand} · {event.place} · {event.dateLabel}
        </AppText>
      </View>
    </AppCard>
  );
}

function Meta({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.inline}>
      <Ionicons name={icon} size={15} color={colors.burgundy} />
      <AppText variant="caption">{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, overflow: 'hidden' },
  body: { padding: spacing.lg, gap: spacing.md },
  image: { width: '100%', aspectRatio: 1.7, backgroundColor: colors.peony },
  eventImage: { width: '100%', aspectRatio: 1.9, backgroundColor: colors.peony },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  metaRow: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  inline: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  strong: { fontWeight: '700' },
  personCard: { flexDirection: 'row', gap: spacing.md, padding: spacing.md },
  avatar: { width: 82, height: 98, borderRadius: radius.md, backgroundColor: colors.peony },
  personBody: { flex: 1, gap: spacing.xs, justifyContent: 'center' },
  placeCard: { flexDirection: 'row', gap: spacing.md, padding: 0, overflow: 'hidden' },
  placeImage: { width: 118, minHeight: 130, backgroundColor: colors.pistachio },
});
