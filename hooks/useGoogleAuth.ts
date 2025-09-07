import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { useAuth } from '../contexts/authContext';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    console.log('🚀 Iniciando login Google...');
    console.log('📱 Platform:', Platform.OS);
    setIsLoading(true);
    setError(null);

    try {
      if (Platform.OS === 'web') {
        // Para Web - usar popup em vez de redirect
        await handleWebAuth();
      } else {
        // Para Mobile - usar deep link
        await handleMobileAuth();
      }
    } catch (err: any) {
      console.error('💥 Erro no login Google:', err);
      const errorMessage = err.message || 'Erro desconhecido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      console.log('🏁 Finalizando processo de login');
      setIsLoading(false);
    }
  }

  const handleWebAuth = async () => {
    // Para web - abrir popup e aguardar mensagem
    const authUrl = `http://localhost:3333/auth/google?redirect_uri=${encodeURIComponent('http://localhost:3000/auth/callback')}`;

    const popup = window.open(
      authUrl,
      'google-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    return new Promise<void>((resolve, reject) => {
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          reject(new Error('Popup foi fechado antes da conclusão'));
        }
      }, 1000);

      // Escutar mensagens do popup
      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);

          const { token, user } = event.data;

          login({
            id: user.id,
            email: user.email,
            name: user.nome || user.email,
            token: token,
            role: user.role || 'USER',
          })
            .then(() => {
              popup?.close();
              resolve();
            })
            .catch(reject);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          popup?.close();
          reject(new Error(event.data.error || 'Erro na autenticação'));
        }
      };

      window.addEventListener('message', messageListener);
    });
  };

  const handleMobileAuth = async () => {
    const redirectUri = 'imobi-facil://auth/callback';
    const authUrl = `http://localhost:3333/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;

    console.log('🔗 URL de auth:', authUrl);
    console.log('📱 Redirect URI:', redirectUri);

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    console.log('📊 Resultado do WebBrowser:', result);

    if (result.type === 'success' && 'url' in result && result.url) {
      console.log('✅ Login bem-sucedido, URL:', result.url);

      const url = new URL(result.url);
      console.log('📝 Parâmetros da URL:', Object.fromEntries(url.searchParams));

      // Verificar se houve erro
      const errorParam = url.searchParams.get('error');
      if (errorParam) {
        const message = url.searchParams.get('message') || 'Falha na autenticação com Google';
        throw new Error(message);
      }

      // Extrair dados do usuário
      const token = url.searchParams.get('token');
      const id = url.searchParams.get('id');
      const email = url.searchParams.get('email');
      const nome = url.searchParams.get('nome');
      const role = url.searchParams.get('role') || 'USER';

      // Validar dados obrigatórios
      if (!token || !id || !email) {
        throw new Error('Dados obrigatórios não encontrados na resposta');
      }

      // Fazer login no contexto
      await login({
        id,
        email,
        name: nome || email,
        token,
        role,
      });

      console.log('🎉 Login concluído com sucesso!');
      return { success: true };
    } else if (result.type === 'dismiss' || result.type === 'cancel') {
      throw new Error('Login cancelado pelo usuário');
    } else {
      throw new Error(`Resultado inesperado: ${result.type}`);
    }
  };

  const clearError = () => setError(null);

  return {
    signInWithGoogle,
    isLoading,
    error,
    clearError,
  };
};
