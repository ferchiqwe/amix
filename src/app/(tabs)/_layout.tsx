import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '@/theme/tokens';

const icons = {
  home: 'sparkles-outline',
  map: 'map-outline',
  plans: 'calendar-outline',
  chats: 'chatbubbles-outline',
  profile: 'person-outline',
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.fuchsia,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.line,
          height: 68,
          paddingTop: 7,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', paddingBottom: 7 },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={icons[route.name as keyof typeof icons] ?? 'ellipse-outline'}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Descubrir' }} />
      <Tabs.Screen name="map" options={{ title: 'Girl Map' }} />
      <Tabs.Screen name="plans" options={{ title: 'Planes' }} />
      <Tabs.Screen name="chats" options={{ title: 'Chats' }} />
      <Tabs.Screen name="profile" options={{ title: 'Yo' }} />
    </Tabs>
  );
}
