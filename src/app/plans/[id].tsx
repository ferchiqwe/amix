import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PersonCard } from '@/components/cards';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { people, plans } from '@/mocks/data';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, spacing } from '@/theme/tokens';

export default function PlanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const plan = plans.find((item) => item.id === id) ?? plans[0]!;
  const interested = useAmixStore((state) => state.interestedPlanIds.includes(plan.id));
  const toggle = useAmixStore((state) => state.togglePlanInterest);
  return (
    <Screen
      eyebrow={plan.category}
      title={plan.title}
      subtitle={`${plan.place} · ${plan.district}`}
    >
      <View style={styles.stack}>
        <View style={styles.badges}>
          <Badge label={plan.dateLabel} tone="pink" />
          <Badge label={plan.time} />
          <Badge label={plan.budget} />
        </View>
        <AppCard style={styles.info}>
          <AppText variant="title">La idea</AppText>
          <AppText>
            Nos encontramos en la entrada principal, pedimos cada una lo suyo y hacemos fotos solo
            si todas están de acuerdo.
          </AppText>
          <AppText>{plan.spots} cupos · grupo pequeño · ritmo conversador</AppText>
        </AppCard>
        <Notice tone="safety">
          Primera reunión en lugar comercial. Si cambia el lugar recibirás un aviso y puedes salir
          sin penalización.
        </Notice>
        <AppButton
          label={interested ? 'Ya estás interesada ✓' : 'Yo también'}
          variant={interested ? 'secondary' : 'primary'}
          onPress={() => toggle(plan.id)}
        />
        <AppButton
          label="Abrir chat del plan"
          variant="secondary"
          onPress={() => router.push(`/chat/${plan.id}`)}
        />
        <AppText variant="title">También quieren ir</AppText>
        {people.slice(0, 2).map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  info: { gap: spacing.sm, backgroundColor: colors.peony },
});
