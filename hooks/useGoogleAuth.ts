import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google'; // Provider de autenticação Google do Expo
import * as WebBrowser from 'expo-web-browser'; // Para lidar com fluxo de autenticação via navegador
import * as AuthSession from 'expo-auth-session'; // Utilitários para auth session do Expo
import { useAuth } from '../contexts/authContext'; // Contexto de autenticação da aplicação
import { fetchUserInfo, decodeGoogleIdToken, isTokenValid } from '../utils/tokenUtils';
// Funções utilitárias para lidar com token e dados do usuário

// Completa sessão de autenticação, especialmente para web (fix de problema comum)
WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '880603979575-5lvjao2oitb9rrt91atr5gmttu8ol5aa.apps.googleusercontent.com';
// Client ID do Google OAuth, idealmente configurado via variável de ambiente

export const useGoogleAuth = () => {
  const { login } = useAuth(); // Função de login do contexto para armazenar usuário
  const redirectUri = AuthSession.makeRedirectUri(); // URI de redirecionamento para o fluxo OAuth

  // Configura o request de autenticação Google com clientId, redirectUri e escopos
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri,
    scopes: ['profile', 'email'],
  });

  // Estados locais para loading e erro
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito que reage a mudanças na resposta da autenticação
  useEffect(() => {
    async function handleAuth() {
      if (response?.type === 'success') {
        // Se o login foi um sucesso, pega dados do token e do usuário
        const authentication = response?.authentication;
        const idToken = authentication?.idToken;

        if (!authentication?.accessToken) return; // Se não tem accessToken, sai

        setIsLoading(true);
        setError(null);

        try {
          // Valida o ID Token (JWT) se disponível, para evitar token expirado
          if (idToken) {
            const decodedToken = decodeGoogleIdToken(idToken);
            if (!isTokenValid(decodedToken)) {
              throw new Error('Token expirado');
            }
          }

          // Busca dados do usuário usando o accessToken
          const userData = await fetchUserInfo(authentication.accessToken);

          // Faz login local salvando dados no contexto (inclui accessToken)
          await login({
            ...userData,
            accessToken: authentication.accessToken,
          });

          // A navegação após login deve ser feita fora desse hook
        } catch (err) {
          console.error('Erro ao autenticar usuário:', err);
          setError(String(err));
        } finally {
          setIsLoading(false);
        }
      } else if (response?.type === 'error') {
        // Se houve erro na autenticação, atualiza o estado de erro
        console.log('Google Auth Error:', response.error);
        setError(response.error?.message || 'Erro desconhecido');
      }
    }

    handleAuth();
  }, [response, login]);

  // Retorna o objeto para controlar o login, incluindo o prompt para iniciar o fluxo
  return { request, response, promptAsync, isLoading, error };
};
