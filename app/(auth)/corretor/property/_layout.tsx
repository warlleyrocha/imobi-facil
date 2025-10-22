import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function ImoveisLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* Tela principal: mantém a tab visível */}
      <Stack.Screen name="index" />

      {/* Telas internas: tab oculta */}
      <Stack.Screen
        name="formProperty"
        options={
          {
            href: null, // 🔥 oculta tabbar
            presentation: 'card',
            animation: 'slide_from_right',
          } as any
        }
      />

      <Stack.Screen
        name="[id]"
        options={
          {
            href: null,
            presentation: 'card',
            animation: 'slide_from_right',
          } as any
        }
      />

      <Stack.Screen
        name="addSuccess"
        options={
          {
            href: null,
            presentation: 'transparentModal',
            animation: 'fade',
          } as any
        }
      />
    </Stack>
  );
}
