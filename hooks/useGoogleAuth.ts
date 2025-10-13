// /hooks/useGoogleAuth.ts
import { makeRedirectUri } from 'expo-auth-session';
import { useState } from 'react';
import { Platform } from 'react-native';

import { useAuth } from '~/contexts/authContext';
import { googleAuthService } from '~/services/googleAuth.service';
import type { User } from '~/types/authTypes';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      if (Platform.OS === 'web') {
        const authUrl = googleAuthService.getAuthUrl();
        console.log('Redirecionando para:', authUrl);
        googleAuthService.redirectToGoogle(authUrl);
      } else {
        const redirectUri = makeRedirectUri({
          scheme: 'imobi-facil', // Deve estar no app.json
          path: 'auth/callback',
        });
        console.log('Redirect URI:', redirectUri);

        const authUrl = googleAuthService.getAuthUrlMobile(redirectUri);
        console.log('Auth URL:', authUrl);

        const result = await googleAuthService.redirectToGoogleMobile(authUrl);
        if (result.type === 'success') {
          // O backend redirecionou para: imobifacil://auth/callback?user=...&token=...
          const { url } = result;
          const params = new URL(url).searchParams;
          const userParams = params.get('user');
          const accessToken = params.get('token');

          if (userParams && accessToken) {
            const decodedUser: User = JSON.parse(decodeURIComponent(userParams));

            // 5. Faz login
            await login({ ...decodedUser, accessToken });
            console.log('Login mobile bem-sucedido!');
          } else {
            throw new Error('Parâmetros de autenticação inválidos');
          }
        } else if (result.type === 'cancel') {
          console.log('Usuário cancelou o login');
          setError('Login cancelado');
        } else {
          throw new Error('Falha na autenticação');
        }
      }
    } catch (err) {
      console.error('Erro ao iniciar login:', err);
      setError(err instanceof Error ? err.message : 'Erro ao iniciar autenticação');
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading, error };
};
