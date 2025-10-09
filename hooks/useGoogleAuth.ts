// src/hooks/useGoogleAuth.ts
import { useState } from 'react';

import { api } from '@/services/api';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGoogleAuthUrl = async () => {
    setLoading(true);
    setError(null);

    console.log('========== INICIANDO REQUISIÇÃO ==========');

    try {
      const response = await api.get('/auth/google', {});

      console.log('========== RESPOSTA (SUCCESS) ==========');
      console.log('Status:', response);

      return response.data;
    } catch (err: any) {
      console.log('========== RESPOSTA (ERROR/CATCH) ==========');
      console.log('Erro message:', err.message);
      console.log('Erro code:', err.code);
      console.log('Response exists:', !!err.response);

      if (err.response) {
        console.log('Response status:', err.response.status);
        console.log('Response statusText:', err.response.statusText);
        console.log('Response headers:', JSON.stringify(err.response.headers, null, 2));
        console.log('Response data type:', typeof err.response.data);
        console.log(
          'Response data:',
          typeof err.response.data === 'string'
            ? err.response.data.substring(0, 500)
            : JSON.stringify(err.response.data, null, 2)
        );
      }

      console.log('========== FIM ==========');

      setError('Erro ao obter URL de autenticação');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getGoogleAuthUrl,
    loading,
    error,
  };
};
