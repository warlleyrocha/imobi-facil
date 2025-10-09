// src/services/googleAuth.service.ts
import { Platform } from 'react-native';

import { api } from '@/services/api';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    nome: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token: {
    expires_in: string;
    token_type: string;
    access_token: string;
  };
}

export const googleAuthService = {
  getAuthUrl: (): string => {
    const backendUrl = api.defaults.baseURL || 'http://localhost:3000';
    return `${backendUrl}/auth/google`;
  },

  redirectToGoogle: (authUrl: string): void => {
    if (Platform.OS === 'web') {
      window.location.href = authUrl;
    } else {
      console.warn('Login com Google não implementado para mobile');
    }
  },

  exchangeCodeForToken: async (code: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/google/callback', { code });
    return response.data;
  },
};
