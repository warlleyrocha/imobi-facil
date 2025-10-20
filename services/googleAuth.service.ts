// @/services/googleAuth.service.ts
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { API_URL } from '@/services/api';

WebBrowser.maybeCompleteAuthSession();

export const googleAuthService = {
  // WEB
  getAuthUrl: (): string => {
    return `${API_URL}/auth/google`;
  },

  // MOBILE
  getAuthUrlMobile: (redirectUri: string): string => {
    return `${API_URL}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
  },

  // Web: redireciona via window.location
  redirectToGoogle: (authUrl: string): void => {
    if (Platform.OS === 'web') {
      window.location.href = authUrl;
    } else {
      console.warn('Login com Google não implementado para mobile');
    }
  },

  // Mobile: abre browser in-app e aguarda callback
  redirectToGoogleMobile: async (
    authUrl: string
  ): Promise<WebBrowser.WebBrowserAuthSessionResult> => {
    const result = await WebBrowser.openAuthSessionAsync(authUrl, 'exp://');
    return result;
  },
};
