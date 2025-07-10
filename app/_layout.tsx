// app/_layout.tsx
import { Stack } from 'expo-router';
import '../global.css';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // você controla headers nas próprias telas se quiser
        animation: 'slide_from_right', // Animação padrão
        gestureEnabled: true, // Permite gestos para voltar
      }}
    />
  );
}
