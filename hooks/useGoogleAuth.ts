import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '880603979575-5lvjao2oitb9rrt91atr5gmttu8ol5aa.apps.googleusercontent.com ';

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: 'http://localhost:8081',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google Access Token:', authentication?.accessToken);
    }
  }, [response]);

  return { request, response, promptAsync };
};
