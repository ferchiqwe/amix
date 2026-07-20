import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PlanCard } from '@/components/cards';
import { AppButton } from '@/components/ui/AppButton';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { plans } from '@/mocks/data';
import { spacing } from '@/theme/tokens';

export default function PlansScreen() {
  const router = useRouter();
  return (
    <Screen
      eyebrow="MIS PLANES"
      title="Que esta vez sí ocurra"
      subtitle="Intereses, reservas y planes comunitarios en un solo lugar."
    >
      <View style={styles.stack}>
        <Notice tone="safety">
          Cada una paga su consumo o entrada. Puedes abandonar un plan sin penalización automática.
        </Notice>
        <AppButton label="Crear plan público" onPress={() => router.push('/plans/create')} />
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ stack: { gap: spacing.lg } });
