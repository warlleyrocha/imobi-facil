import { Slot, useRouter } from "expo-router";
import 'global.css'; // Importando o CSS global
import { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import Splash from "./splash";

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
  const [loading, setLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    // Inter fonts
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    
    // Mulish fonts
    Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_900Black,
  });
  
  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      
      // Só navega uma vez após o loading
      router.push("/(auth)/sign-in");
    };

    checkAuth();
  }, []);

  // Enquanto carrega, mostra splash customizada
  if (loading) return <Splash />;

  return <Slot />;
}
