// app/(auth)/corretor/_layout.tsx
import { Stack } from 'expo-router';

export default function CorretorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* Onboarding do corretor */}
      <Stack.Screen name="onboard" />

      {/* Telas principais */}
      <Stack.Screen name="home" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="schedule" />

      {/* Módulos com navegação própria */}
      <Stack.Screen name="profile" />
      <Stack.Screen name="property" />
    </Stack>
  );
}
