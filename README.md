# AMIX

AMIX es una aplicación móvil social y de descubrimiento urbano para que chicas adultas encuentren primero un plan, lugar o experiencia y después descubran quién más quiere vivirlo.

> “Tus amigas no pueden. Tú sí.”

Esta primera entrega es un MVP navegable para Lima, Perú. Usa datos ficticios, no procesa pagos, no crea cuentas reales y no promete seguridad absoluta.

## Estado actual

Incluye código funcional para:

- splash y onboarding completo;
- confirmación de mayoría de edad;
- registro, perfil, intereses, cuestionario y verificación en modo demo;
- navegación por cinco tabs;
- Home basada en planes y acción “Yo también”;
- perfiles, intereses comunes y bloqueos locales;
- Girl Map con lugares ficticios de Lima y fallback accesible para web;
- fichas de lugar, amenidades y reseñas independientes;
- experiencias patrocinadas, postulación y check-in simulados;
- creación de planes con rechazo de casas, hoteles y alojamientos;
- creación de reseñas con selector real de foto o video;
- chat local con moderación de teléfonos, redes, enlaces y señales de riesgo;
- llamadas y videollamadas simuladas sin abrir cámara o micrófono;
- Modo Seguro, contacto de confianza, check-in, Camina conmigo y SOS simulado;
- reportes, permisos, privacidad, bloqueos, exportación y eliminación demo;
- esquema Supabase, RLS y seed ficticio;
- configuración EAS, CI, lint, TypeScript y tests.

## Stack

- Expo SDK 57
- React Native 0.86
- React 19.2
- TypeScript 6 en modo estricto
- Expo Router
- React Native Reanimated y Gesture Handler
- Expo SecureStore, Camera, Image Picker, Notifications y Location
- React Native Maps
- TanStack Query y Zustand
- Zod
- Supabase preparado
- Jest y React Native Testing Library
- ESLint y Prettier
- EAS Build / Update

Las versiones nativas fueron resueltas con `npx expo install` para Expo SDK 57; no se fijaron a mano por intuición.

## Requisitos

- Node.js 22 LTS recomendado
- npm 10 o superior
- Expo Go actualizado para una inspección rápida
- Un development build para validar funcionalidades nativas que Expo Go no incluya o para probar configuración nativa final
- EAS CLI solo cuando se vaya a compilar o publicar

## Instalar y abrir

```bash
npm install
npm start
```

Después:

- escanea el QR con Expo Go en un teléfono compatible;
- presiona `a` para Android;
- presiona `i` para iOS desde macOS;
- presiona `w` para abrir la versión web.

También puedes ejecutar:

```bash
npm run android
npm run ios
npm run web
```

## Expo Go vs. development build

Expo Go sirve para recorrer la navegación, el estado demo, el selector multimedia, la ubicación en primer plano y la mayor parte del MVP. Usa un development build antes de probar configuración nativa de permisos, notificaciones remotas, credenciales de mapas, Sign in with Apple, actualizaciones EAS o cualquier proveedor futuro de llamadas/verificación.

```bash
npx expo install expo-dev-client
eas build --profile development --platform android
# o
eas build --profile development --platform ios
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa únicamente cuando exista un proyecto Supabase:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

La anon key es pública por diseño, pero sigue siendo obligatorio proteger los datos con RLS. Nunca subas la service role key ni secretos de proveedores al cliente móvil.

Sin variables, la app entra en modo demo y `src/lib/supabase.ts` devuelve un cliente nulo de manera explícita.

## Conectar Supabase

1. Crea un proyecto Supabase.
2. Ejecuta las migraciones de `supabase/migrations` en orden.
3. Ejecuta `supabase/seed.sql` solo en un entorno de desarrollo.
4. Configura URL y anon key.
5. Reemplaza gradualmente los mocks por repositorios que usen el cliente de `src/lib/supabase.ts`.
6. Valida cada política RLS con cuentas de roles distintos antes de habilitar producción.

El esquema incluye perfiles, intereses, identidad, dispositivos, lugares, amenidades, reseñas, marcas, eventos, planes, guardados, conversaciones, mensajes, llamadas, bloqueos, reportes, moderación, contactos de confianza, sesiones de seguridad, notificaciones, preferencias y auditoría.

## Comandos de calidad

```bash
npm run lint
npm run typecheck
npm test
npm run format:check
npx expo export --platform web
```

La CI en `.github/workflows/quality.yml` ejecuta instalación limpia, lint, TypeScript, tests y export web en cada pull request.

## Arquitectura

```text
src/app/                 rutas y pantallas Expo Router
src/components/          sistema visual y componentes de dominio
src/lib/                 Supabase y TanStack Query
src/mocks/               datos ficticios de Lima
src/services/            proveedores y moderación intercambiables
src/stores/              estado local Zustand
src/theme/               tokens AMIX
src/types/               modelos de dominio
src/utils/               validaciones puras
supabase/migrations/     esquema y políticas RLS
tests/                   pruebas de moderación, seguridad y providers
maestro/                 recorrido E2E base
```

Los proveedores separan la demostración de producción:

- `MockIdentityVerificationProvider` / `FutureProductionIdentityVerificationProvider`
- `MockEventCheckInProvider` / `FutureProductionEventCheckInProvider`
- `MockModerationService` / `FutureServerModerationService`
- `MockCallProvider` / `FutureLiveKitProvider`
- `MockSafetyProvider` / `FutureProductionSafetyProvider`
- `MockAnalyticsProvider` / `FutureProductionAnalyticsProvider`

Los providers futuros lanzan un error claro en vez de fingir una conexión.

## Funciones reales en el MVP

- navegación completa;
- estado local para intereses, guardados, postulaciones y bloqueos;
- validación de lugares públicos al crear planes;
- selector de foto/video mediante Expo Image Picker;
- solicitud contextual de ubicación para Camina conmigo;
- moderación local demostrativa;
- SOS local con pulsación larga de tres segundos y haptics;
- mapa nativo con coordenadas ficticias;
- diseño adaptativo móvil/tablet/web;
- accesibilidad base: labels, roles, targets táctiles, escalado de texto y copy comprensible.

## Funciones demo

- autenticación y verificación de identidad;
- QR, check-in y asistencia;
- llamadas y videollamadas;
- notificaciones remotas;
- compartir ubicación con un contacto;
- envío de SOS a terceros o emergencias;
- revisión humana, apelaciones y sanciones;
- exportación y eliminación de una cuenta de backend;
- analítica de producción.

Cada flujo demo lo declara en pantalla. Ninguno reemplaza a servicios de emergencia.

## Seguridad y moderación

AMIX prioriza lugares públicos y evita compartir teléfonos, correos, links, redes sociales, direcciones privadas o códigos QR dentro del chat. La capa local reconoce señales, pero no se considera suficiente para producción: la decisión final deberá combinar reglas de servidor, modelos de riesgo, límites de cuentas nuevas y moderación humana.

Una identidad confirmada significa que la plataforma conoce la identidad de la persona. No significa que sea completamente segura.

El bloqueo evita contacto, visualización mutua, recomendaciones y coincidencias intencionales en grupos pequeños cuando el backend esté conectado. Las cancelaciones por incomodidad o seguridad no generan castigo automático.

## Privacidad

- no almacenar DNI completo ni biometría cruda;
- guardar solo resultado, fecha, nivel, estado e identificador cifrado del proveedor;
- ubicación temporal con consentimiento y expiración;
- marcas sin acceso a chats, documentos, teléfonos, direcciones o contactos de confianza;
- analítica sin mensajes completos, documentos, ubicación precisa, biometría ni datos médicos;
- exportación y eliminación visibles desde Ajustes.

Los textos legales incluidos en la app son borradores de producto y requieren revisión legal antes de publicar.

## EAS y tiendas

Identificadores provisionales:

- iOS: `com.amix.app`
- Android: `com.amix.app`

Perfiles disponibles en `eas.json`: `development`, `preview` y `production`.

```bash
eas login
eas build:configure
eas build --profile preview --platform all
eas build --profile production --platform all
```

Antes de App Store / Google Play faltan como mínimo credenciales, política y términos revisados, proveedor de UGC/moderación, eliminación real, account auth, Sign in with Apple cuando aplique, manifest de privacidad definitivo, ficha de tiendas y pruebas en dispositivos físicos.

## Limitaciones conocidas

- Supabase no está conectado a un proyecto real.
- El mapa web usa un fallback editorial; `react-native-maps` se renderiza en iOS/Android.
- Las imágenes de demo usan URLs públicas de Unsplash y deben reemplazarse por assets licenciados definitivos.
- La moderación local ilustra decisiones de UX; no reemplaza análisis de servidor.
- No existen llamadas, video, push remoto ni verificación real.
- No se ha realizado todavía revisión legal, pentest ni auditoría de accesibilidad externa.

## Próximos pasos

1. Crear proyectos dev/staging/production en Supabase.
2. Implementar Supabase Auth con Apple, Google y email.
3. Conectar repositorios de datos y Realtime para chats.
4. Elegir proveedores legales para identidad, llamadas y moderación.
5. Probar RLS, abuso, límites, apelaciones y eliminación en servidor.
6. Ejecutar Maestro en dispositivos físicos y pruebas de accesibilidad.
7. Preparar fichas, revisión legal y builds internos de tiendas.
