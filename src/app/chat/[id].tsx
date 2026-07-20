import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { moderationService } from '@/services/moderation';
import { colors, radius, spacing, touchTarget } from '@/theme/tokens';
import type { ChatMessage } from '@/types/domain';

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    author: 'system',
    body: 'Chat protegido por las reglas de comunidad AMIX.',
    sentAt: '12:30',
  },
  {
    id: '2',
    author: 'other',
    body: '¿Les funciona encontrarnos en la entrada de Café Lila?',
    sentAt: '12:35',
  },
  { id: '3', author: 'me', body: 'Sí, 4:30 me queda perfecto ✨', sentAt: '12:37' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const send = async () => {
    if (!draft.trim()) return;
    const decision = await moderationService.evaluate(draft);
    if (decision.action === 'block' || decision.action === 'review') {
      setFeedback(decision.message ?? 'Este mensaje no puede enviarse.');
      return;
    }
    if (decision.action === 'warn') setFeedback(decision.message ?? null);
    else setFeedback(null);
    setMessages((items) => [
      ...items,
      { id: `${Date.now()}`, author: 'me', body: draft.trim(), sentAt: 'Ahora' },
    ]);
    setDraft('');
  };

  return (
    <Screen
      scroll={false}
      title={id === 'mica' ? 'Mica' : 'Chat del plan'}
      subtitle="No se muestran teléfonos ni redes sociales."
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.toolbar}>
          <Tool icon="call-outline" label="Audio" onPress={() => router.push('/calls/audio')} />
          <Tool icon="videocam-outline" label="Video" onPress={() => router.push('/calls/video')} />
          <Tool
            icon="notifications-off-outline"
            label="Silenciar"
            onPress={() => Alert.alert('Chat silenciado', 'Modo demostración.')}
          />
          <Tool
            icon="ellipsis-horizontal"
            label="Más"
            onPress={() => router.push('/reports/create')}
          />
        </View>
        <View style={styles.messages}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.bubble,
                message.author === 'me'
                  ? styles.mine
                  : message.author === 'system'
                    ? styles.system
                    : styles.other,
              ]}
            >
              <AppText
                variant={message.author === 'system' ? 'caption' : 'body'}
                color={message.author === 'me' ? colors.white : colors.ink}
              >
                {message.body}
              </AppText>
              <AppText
                variant="caption"
                color={message.author === 'me' ? colors.peony : colors.muted}
              >
                {message.sentAt}
              </AppText>
            </View>
          ))}
        </View>
        {feedback ? <Notice tone="safety">{feedback}</Notice> : null}
        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Mensaje"
            value={draft}
            onChangeText={setDraft}
            placeholder="Escribe dentro de AMIX…"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enviar mensaje"
            onPress={() => void send()}
            style={styles.send}
          >
            <Ionicons name="arrow-up" size={22} color={colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Tool({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.tool}
    >
      <Ionicons name={icon} size={20} color={colors.burgundy} />
      <AppText variant="caption">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, gap: spacing.md },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  tool: {
    minWidth: touchTarget,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  messages: { flex: 1, gap: spacing.sm, justifyContent: 'flex-end' },
  bubble: { maxWidth: '82%', borderRadius: radius.md, padding: spacing.md, gap: 2 },
  mine: { alignSelf: 'flex-end', backgroundColor: colors.burgundy },
  other: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  system: { alignSelf: 'center', backgroundColor: colors.pistachio },
  composer: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  input: {
    flex: 1,
    minHeight: touchTarget,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.ink,
  },
  send: {
    width: touchTarget,
    height: touchTarget,
    borderRadius: touchTarget / 2,
    backgroundColor: colors.fuchsia,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
