import { DemoFeatureScreen } from '@/components/DemoFeatureScreen';

export default function AccountScreen() {
  return (
    <DemoFeatureScreen
      eyebrow="ELIMINAR CUENTA"
      title="Cerrar también debe ser fácil"
      subtitle="La eliminación real revocará sesiones y aplicará la política de retención legal mínima."
      safety
      sections={[
        {
          title: 'Qué se elimina',
          body: 'Perfil público, preferencias y contenido según las reglas de retención.',
          icon: 'trash-outline',
        },
        {
          title: 'Qué puede conservarse',
          body: 'Registros mínimos de seguridad o moderación cuando una obligación legal lo requiera.',
          icon: 'shield-outline',
        },
      ]}
      actions={[
        {
          label: 'Eliminar cuenta demo',
          variant: 'danger',
          message: 'Modo demostración: no existe una cuenta real que eliminar.',
        },
      ]}
    />
  );
}
