// /hooks/useGoogleAuth.ts
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { googleAuthService } from '~/services/googleAuth.service';

//import { googleAuthService } from '@/services/googleAuth.service';

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
      //Simulação de redirecionamento
      //router.replace('/(auth)/feedback/success/page');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Erro ao iniciar login:', err.message);
        setError('Erro ao iniciar autenticação');
        setLoading(false);
      }
    }
  };

  return { loginWithGoogle, loading, error };
};
