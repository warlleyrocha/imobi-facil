import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useEffect } from 'react'

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '880603979575-5lvjao2oitb9rrt91atr5gmttu8ol5aa.apps.googleusercontent.com'

export const useGoogleAuth = () => {
  const redirectUri = AuthSession.makeRedirectUri()

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google Access Token:', authentication?.accessToken);
    }
  }, [response]);

  return { request, response, promptAsync }
}
