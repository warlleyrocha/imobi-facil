import 'global.css'; // Importa estilos globais

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
import { useFonts } from 'expo-font'; // Hook para carregar fontes customizadas
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react'; // React hooks básicos
import { ActivityIndicator, Text, View } from 'react-native'; // Componentes básicos UI

import { AuthContextProvider, useAuth } from '../contexts/authContext';
import Splash from './splash'; // Componente Splash screen exibido durante carregamento

// Componente raiz do layout, envolve o app no AuthContextProvider para fornecer estado de autenticação a todos os componentes filhos
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <RootLayoutInner />
    </AuthContextProvider>
  );
}

// Componente interno que contém a lógica principal do layout
function RootLayoutInner() {
  const router = useRouter(); // Hook para navegação programática
  const segments = useSegments(); // Array com segmentos da rota atual
  const { user, loading } = useAuth(); // Usuário autenticado e estado de loading da autenticação
  const [appReady, setAppReady] = useState(false); // Estado para controlar quando o app está pronto (após splash, fontes e auth)

  // Carrega as fontes especificadas e retorna se estão carregadas e se houve erro
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

  // Efeito que roda sempre que fontsLoaded, loading, appReady, user, segments ou router mudam
  useEffect(() => {
    // Sai se as fontes não estão carregadas, se o loading ainda está ativo ou se appReady já foi setado para true
    if (!fontsLoaded || loading || appReady) return;

    // Timer para dar um delay de 2 segundos após as fontes carregarem e loading acabar
    const timer = setTimeout(() => {
      setAppReady(true); // Marca o app como pronto

      const publicRoutes = ['sign-in']; // Rotas públicas que não precisam de autenticação
      // Pega o segmento atual ou força 'sign-in' se não houver segmento (ex: rota raiz '/')
      const currentSegment = segments.length > 0 ? segments[0] : 'sign-in';
      const isPublic = publicRoutes.includes(currentSegment); // Verifica se a rota atual é pública

      // Se estiver na rota +not-found, redireciona para sign-in
      if (currentSegment === '+not-found') {
        router.replace('/sign-in');
        return;
      }

      // Se não tiver usuário autenticado e a rota não for pública, redireciona para sign-in
      if (!user && !isPublic) {
        router.replace('/sign-in');
      }
      // Se tiver usuário autenticado e a rota for pública, redireciona para tela de seleção de perfil
      else if (user && isPublic) {
        router.replace('/(auth)/select-profile');
      }
    }, 2000);

    // Cleanup do timer para evitar memory leaks caso o componente desmonte antes do timeout
    return () => clearTimeout(timer);
  }, [fontsLoaded, loading, appReady, user, segments, router]);

  // Enquanto as fontes não carregaram, ou o loading está ativo, ou appReady é falso, mostra a tela Splash
  if (!fontsLoaded || loading || !appReady) {
    return <Splash />;
  }

  // Caso haja erro no carregamento das fontes, mostra uma tela de erro com um indicador de carregamento
  if (fontsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Erro carregando fontes</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se tudo estiver ok, renderiza o Slot que vai carregar as telas filhas da rota atual
  return <Slot />;
}
