// src/hooks/useGoogleAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

import { googleAuthService } from '@/services/googleAuth.service';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = () => {
    setLoading(true);
    setError(null);

    try {
      const authUrl = googleAuthService.getAuthUrl();
      console.log('Redirecionando para:', authUrl);
      googleAuthService.redirectToGoogle(authUrl);
    } catch (err: any) {
      console.error('Erro ao iniciar login:', err);
      setError('Erro ao iniciar autenticação');
      setLoading(false);
    }
  };

  const handleCallback = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await googleAuthService.exchangeCodeForToken(code);

      console.log('Dados recebidos:', data);

      // Salvar token e dados do usuário
      await AsyncStorage.setItem('access_token', data.token.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (err: any) {
      console.error('Erro no callback:', err);
      setError('Erro ao processar autenticação');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginWithGoogle,
    handleCallback,
    loading,
    error,
  };
};
