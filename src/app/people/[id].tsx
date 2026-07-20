import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { people } from '@/mocks/data';
import { useAmixStore } from '@/stores/useAmixStore';
import { colors, radius, spacing } from '@/theme/tokens';

export default function PersonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const person = people.find((item) => item.id === id) ?? people[0]!;
  const blocked = useAmixStore((state) => state.blockedUserIds.includes(person.id));
  const blockUser = useAmixStore((state) => state.blockUser);

  return (
    <Screen
      eyebrow="PERFIL"
      title={`${person.name}, ${person.age}`}
      subtitle={`${person.district} · zona aproximada`}
    >
      <View style={styles.stack}>
        <Image source={person.image} style={styles.photo} contentFit="cover" />
        <View style={styles.badges}>
          <Badge label="Identidad confirmada" tone="green" />
          <Badge label="Verificación reciente" tone="green" />
        </View>
        <AppText variant="lead">{person.bio}</AppText>
        <View style={styles.chips}>
          {person.interests.map((interest) => (
            <Chip key={interest} label={interest} />
          ))}
        </View>
        <AppCard style={styles.info}>
          <AppText variant="label" color={colors.fuchsia}>
            EN COMÚN
          </AppText>
          <AppText>
            {person.commonPlans} planes · {person.completedActivities} actividades completadas
          </AppText>
          <AppText>{person.socialStyle}</AppText>
          <AppText>Presupuesto habitual: S/ 30–70</AppText>
        </AppCard>
        <Notice tone="safety">
          Una identidad confirmada significa que esta persona existe. No significa que sea
          completamente segura.
        </Notice>
        <AppButton label="Invitar a un plan público" onPress={() => router.push('/plans/create')} />
        <AppButton
          label="Reportar"
          variant="secondary"
          onPress={() => router.push(`/reports/create?userId=${person.id}`)}
        />
        <AppButton
          label={blocked ? 'Usuaria bloqueada' : 'Bloquear usuaria'}
          disabled={blocked}
          variant="danger"
          onPress={() => {
            blockUser(person.id);
            Alert.alert(
              'Bloqueo aplicado',
              'No podrán verse, escribirse ni coincidir intencionalmente en grupos pequeños.',
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  photo: {
    width: '100%',
    aspectRatio: 1.35,
    borderRadius: radius.lg,
    backgroundColor: colors.peony,
  },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  info: { gap: spacing.sm, backgroundColor: colors.peony },
});
