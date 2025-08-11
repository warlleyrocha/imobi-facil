import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuth } from '../contexts/authContext';
import { fetchUserInfo, decodeGoogleIdToken, isTokenValid } from '../utils/tokenUtils';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 'SEU_CLIENT_ID_AQUI';

export const useGoogleAuth = () => {
  const { login } = useAuth();
  const redirectUri = AuthSession.makeRedirectUri();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri,
    scopes: ['profile', 'email'],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleAuth() {
      if (response?.type === 'success') {
        const authentication = response?.authentication;
        const idToken = authentication?.idToken;

        if (!authentication?.accessToken) return;

        setIsLoading(true);
        setError(null);

        try {
          // Validar ID Token se disponível
          if (idToken) {
            const decodedToken = decodeGoogleIdToken(idToken);
            if (!isTokenValid(decodedToken)) {
              throw new Error('Token expirado');
            }
          }

          // Buscar dados do usuário via accessToken
          const userData = await fetchUserInfo(authentication.accessToken);

          await login({
            ...userData,
            accessToken: authentication.accessToken,
          });

          // Não faz navegação aqui mais
        } catch (err) {
          console.error('Erro ao autenticar usuário:', err);
          setError(String(err));
        } finally {
          setIsLoading(false);
        }
      } else if (response?.type === 'error') {
        console.log('Google Auth Error:', response.error);
        setError(response.error?.message || 'Erro desconhecido');
      }
    }

    handleAuth();
  }, [response, login]);

  return { request, response, promptAsync, isLoading, error };
};
