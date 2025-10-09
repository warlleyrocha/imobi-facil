// /services/googleAuth.service.ts
import { Platform } from 'react-native';

import { API_URL } from '@/services/api';

export const googleAuthService = {
  getAuthUrl: (): string => {
    return `${API_URL}/auth/google`;
  },

  redirectToGoogle: (authUrl: string): void => {
    if (Platform.OS === 'web') {
      window.location.href = authUrl;
    } else {
      console.warn('Login com Google não implementado para mobile');
    }
  },
};
