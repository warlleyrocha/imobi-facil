import 'global.css';
import 'react-native-get-random-values';

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
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { AuthContextProvider, useAuth } from '../contexts/authContext';
import Splash from './splash';

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

  const [appReady, setAppReady] = useState(false);
  const { user, loading } = useAuth();

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
    if (!fontsLoaded || loading || appReady) return;

    const timer = setTimeout(() => {
      setAppReady(true);

      const inPublicGroup = segments[0] === '(public)';
      const inAuthGroup = segments[0] === '(auth)';

      // rota 404
      // Removido o check para '+not-found' pois não é um valor válido em segments[0]

      // Se não autenticado, mas está em rota privada
      if (!user && inAuthGroup) {
        router.replace('/(public)/sign-in');
      }

      // Se autenticado e está em rota pública
      if (user && inPublicGroup) {
        console.log('Autenticado');
        router.replace('/(auth)/select-profile');
      }

      // Se nenhum caso anterior, segue fluxo normal
    }, 2000);

    return () => clearTimeout(timer);
  }, [fontsLoaded, loading, appReady, user, segments, router]);

  if (!fontsLoaded || loading || !appReady) {
    return <Splash />;
  }

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
