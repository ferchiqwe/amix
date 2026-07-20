import { StyleSheet, View } from 'react-native';

import { MenuRow } from '@/components/MenuRow';
import { Notice } from '@/components/ui/Notice';
import { Screen } from '@/components/ui/Screen';
import { spacing } from '@/theme/tokens';

export default function SettingsScreen() {
  return (
    <Screen
      eyebrow="AJUSTES"
      title="Tu cuenta, bajo tus reglas"
      subtitle="Controla permisos, bloqueos y datos sin esconder opciones importantes."
    >
      <View style={styles.stack}>
        <Notice>
          Supabase no está configurado: estos controles funcionan solo como demostración local.
        </Notice>
        <MenuRow
          icon="shield-checkmark-outline"
          title="Privacidad"
          subtitle="Datos, retención y consentimientos"
          href="/settings/privacy"
        />
        <MenuRow
          icon="options-outline"
          title="Permisos"
          subtitle="Cámara, ubicación, micrófono y avisos"
          href="/settings/permissions"
        />
        <MenuRow
          icon="ban-outline"
          title="Personas bloqueadas"
          subtitle="Revisa y administra bloqueos"
          href="/settings/blocked-users"
        />
        <MenuRow
          icon="download-outline"
          title="Exportar mis datos"
          subtitle="Preparar una copia demo"
          href="/settings/data-export"
        />
        <MenuRow
          icon="person-remove-outline"
          title="Eliminar cuenta"
          subtitle="Flujo demo con confirmación"
          href="/settings/account"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ stack: { gap: spacing.md } });
