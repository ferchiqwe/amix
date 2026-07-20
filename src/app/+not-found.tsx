import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { spacing } from '@/theme/tokens';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <Screen
      eyebrow="404"
      title="Este plan no existe"
      subtitle="Quizá fue cancelado, cambió o el enlace está incompleto."
    >
      <View style={styles.stack}>
        <Notice>
          Si crees que es un error, vuelve a Descubrir y abre el contenido desde allí.
        </Notice>
        <AppButton label="Volver a Descubrir" onPress={() => router.replace('/(tabs)/home')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ stack: { gap: spacing.lg } });
