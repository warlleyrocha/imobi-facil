import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

import { API_URL } from '@/services/api';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listener para quando o app receber um deep link
    const handleDeepLink = ({ url }: { url: string }) => {
      console.log('Deep link recebido:', url);

      try {
        const { queryParams } = Linking.parse(url);

        if (queryParams?.token) {
          console.log('Token recebido:', queryParams.token);
          // Aqui você salva o token e faz login no app
          // Exemplo: await AsyncStorage.setItem('token', queryParams.token);
          // Exemplo: navigation.navigate('Home');
          handleAuthSuccess(queryParams.token as string);
        } else if (queryParams?.error) {
          console.error('Erro na autenticação:', queryParams.error);
          handleAuthError(queryParams.error as string);
        }
      } catch (error) {
        console.error('Erro ao processar deep link:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Verifica se o app foi aberto por um deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Listener para deep links quando o app já está aberto
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAuthSuccess = (token: string) => {
    // Implemente sua lógica de sucesso aqui
    console.log('Login realizado com sucesso!');
    // Salvar token, navegar, etc.
  };

  const handleAuthError = (error: string) => {
    // Implemente sua lógica de erro aqui
    console.error('Falha no login:', error);
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);

      // Cria a URL de callback que o backend vai redirecionar
      const callbackUrl = Linking.createURL('auth/callback');

      // Monta a URL de autenticação passando o redirect
      const authUrl = `${API_URL}/auth/google?redirect=${encodeURIComponent(callbackUrl)}`;

      console.log('Opening URL:', authUrl);
      console.log('Callback URL:', callbackUrl);

      // Verifica se a URL pode ser aberta
      const canOpen = await Linking.canOpenURL(authUrl);

      if (!canOpen) {
        throw new Error('Não foi possível abrir a URL de autenticação');
      }

      await Linking.openURL(authUrl);
    } catch (err) {
      console.error('Erro ao abrir login Google:', err);
      setIsLoading(false);
    }
  };

  return { loginWithGoogle, isLoading };
};
