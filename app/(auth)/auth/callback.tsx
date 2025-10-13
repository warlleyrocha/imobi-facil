import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const { queryParams } = Linking.parse(url);
        const token = queryParams?.access_token;

        if (token) {
          // Salvar token localmente
          await AsyncStorage.setItem('access_token', token as string);

          // Redirecionar para a seleção de perfil
          router.replace('/(auth)/select-profile');
        } else {
          // Se não tiver token, voltar para login
          router.replace('/sign-in');
        }
      }
    };

    handleDeepLink();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
