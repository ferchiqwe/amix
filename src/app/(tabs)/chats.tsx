import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { colors, spacing } from '@/theme/tokens';

const chats = [
  {
    id: 'matcha-group',
    name: 'Matcha, cámara y chisme',
    preview: 'Valeria: ¿4:30 les funciona?',
    time: '12:42',
  },
  { id: 'mica', name: 'Mica', preview: 'Siii, yo también quiero ir ✨', time: 'Ayer' },
];

export default function ChatsScreen() {
  const router = useRouter();
  return (
    <Screen
      eyebrow="CHAT INTERNO"
      title="Conversa sin dar tu número"
      subtitle="AMIX bloquea datos de contacto externos dentro del chat."
    >
      <View style={styles.stack}>
        <Notice tone="safety">
          Las llamadas y videollamadas del MVP son simuladas. Nunca se muestra tu teléfono.
        </Notice>
        {chats.map((chat) => (
          <AppCard
            key={chat.id}
            onPress={() => router.push(`/chat/${chat.id}`)}
            style={styles.chat}
          >
            <View style={styles.icon}>
              <Ionicons name="chatbubble-ellipses" size={22} color={colors.burgundy} />
            </View>
            <View style={styles.copy}>
              <AppText variant="lead" style={styles.strong}>
                {chat.name}
              </AppText>
              <AppText color={colors.muted} numberOfLines={1}>
                {chat.preview}
              </AppText>
            </View>
            <AppText variant="caption" color={colors.muted}>
              {chat.time}
            </AppText>
          </AppCard>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.md },
  chat: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.peony,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: spacing.xs },
  strong: { fontWeight: '700' },
});
