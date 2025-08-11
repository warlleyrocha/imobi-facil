// _layout.tsx
import { Slot, useRouter, useSegments } from 'expo-router';
import 'global.css';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Text } from 'react-native';
import Splash from './splash';
import { AuthContextProvider, useAuth } from '../contexts/authContext';

// Font imports...
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_900Black,
} from '@expo-google-fonts/mulish';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <RootLayoutInner />
    </AuthContextProvider>
  );
}

function RootLayoutInner() {
  const router = useRouter();
  const segments = useSegments();
  const { user, loading } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_900Black,
  });

  useEffect(() => {
    // Só executa quando fontes carregadas, loading finalizado e appReady ainda falso
    if (!fontsLoaded || loading || appReady) return;

    const timer = setTimeout(() => {
      setAppReady(true);

      const publicRoutes = ['sign-in'];
      // Se não existir segmento (como em '/'), força 'sign-in'
      const currentSegment = segments.length > 0 ? segments[0] : 'sign-in';
      const isPublic = publicRoutes.includes(currentSegment);

      // Só redireciona se segmento não for +not-found
      if (currentSegment === '+not-found') {
        router.replace('/sign-in');
        return;
      }

      if (!user && !isPublic) {
        router.replace('/sign-in');
      } else if (user && isPublic) {
        router.replace('/(auth)/select-profile');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [fontsLoaded, loading, appReady, user, segments, router]);
  // mostrar splash screen enquanto carrega
  if (!fontsLoaded || loading || !appReady) {
    return <Splash />;
  }
  // lidando com erros de carregamento de fonte
  if (fontsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Erro carregando fontes</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
