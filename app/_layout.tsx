import { Slot, useRouter, useSegments } from "expo-router";
import 'global.css';
import { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Text } from 'react-native';
import Splash from "./splash";

// Font imports
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
  const router = useRouter();
  const segments = useSegments();
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
    if (fontsLoaded && !appReady) {
      // tempo mínimo de splash screen (2s)
      const timer = setTimeout(() => {
        setAppReady(true);
        
        // checar se já está na auth page (prevenir redirect infinito)
        const inAuthGroup = segments[0] === '(auth)';
        
        if (!inAuthGroup) {
          router.replace("/(auth)/sign-in");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, appReady, segments, router]);

  // mostrar splash screen enquanto carrega
  if (!appReady || !fontsLoaded) {
    return <Splash />;
  }

  // lidando com erros de carregamento de fonte
  if (fontsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Erro carregando fontes
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}