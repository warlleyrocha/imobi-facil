import { Stack } from 'expo-router';

import { LocacaoProvider } from '~/lib/locacao/store';

export default function LocacaoLayout() {
  return (
    <LocacaoProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="contratos" />
        <Stack.Screen name="contrato/[id]" />
        <Stack.Screen name="cadastros" />
      </Stack>
    </LocacaoProvider>
  );
}
