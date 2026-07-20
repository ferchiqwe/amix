import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { DMSerifDisplay_400Regular, useFonts } from '@expo-google-fonts/dm-serif-display';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { queryClient } from '@/lib/query-client';
import { colors } from '@/theme/tokens';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ DMSerifDisplay_400Regular });

  useEffect(() => {
    if (loaded || error) void SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.burgundy,
          headerTitleStyle: { fontFamily: 'DMSerifDisplay_400Regular' },
          headerTitle: '',
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.cream },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="people/[id]" options={{ title: 'Perfil' }} />
        <Stack.Screen name="places/[id]" options={{ title: 'Girl Map' }} />
        <Stack.Screen name="events/[id]" options={{ title: 'Experiencia' }} />
        <Stack.Screen name="chat/[id]" options={{ title: 'Chat interno' }} />
        <Stack.Screen
          name="calls/video"
          options={{ presentation: 'fullScreenModal', headerShown: false }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
