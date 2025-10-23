// /hooks/useGoogleAuth.ts
import { useState } from 'react';

//import { googleAuthService } from '@/services/googleAuth.service';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = () => {
    setLoading(true);
    setError(null);

    try {
      /*const authUrl = googleAuthService.getAuthUrl();
      console.log('Redirecionando para:', authUrl);
      googleAuthService.redirectToGoogle(authUrl);*/
      // Simulação de redirecionamento
      setTimeout(() => {
        setLoading(false);
        setShowFeedback(true);
      }, 500);
    } catch (err: any) {
      console.error('Erro ao iniciar login:', err);
      setError('Erro ao iniciar autenticação');
      setLoading(false);
    }
  };

  return {
    loginWithGoogle,
    setShowFeedback,
    showFeedback,
    loading,
    error,
  };
};
