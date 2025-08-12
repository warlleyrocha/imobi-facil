// utils/tokenUtils.ts
import { GoogleIdTokenPayload } from '../types/googleTypes';
// Função para decodificar JWT sem verificar assinatura
export const decodeJWT = (token: string): any => {
  try {
    // JWT tem 3 partes separadas por ponto: header.payload.signature
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Token JWT inválido');
    }

    // Decodificar o payload (segunda parte)
    const payload = parts[1];

    // Adicionar padding se necessário para base64
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    // Decodificar de base64url para string
    const base64 = paddedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);

    return JSON.parse(decoded);
  } catch (error) {
    console.error('❌ Erro ao decodificar JWT:', error);
    throw new Error('Falha ao decodificar token');
  }
};

// Função específica para decodificar ID Token do Google
export const decodeGoogleIdToken = (idToken: string): GoogleIdTokenPayload => {
  try {
    const payload = decodeJWT(idToken);

    // Validar campos obrigatórios
    if (!payload.sub || !payload.email || !payload.name) {
      throw new Error('Token do Google com dados incompletos');
    }

    return payload as GoogleIdTokenPayload;
  } catch (error) {
    console.error('❌ Erro ao decodificar ID Token do Google:', error);
    throw error;
  }
};

// Função para validar se o token ainda é válido
export const isTokenValid = (payload: GoogleIdTokenPayload): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
};

// Função para buscar informações do usuário usando access token
export const fetchUserInfo = async (accessToken: string): Promise<GoogleIdTokenPayload> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar informações do usuário');
    }

    const userInfo = await response.json();

    // Converter para formato compatível com GoogleIdTokenPayload
    return {
      id: '',
      iss: 'https://accounts.google.com',
      aud: '',
      sub: userInfo.id,
      email: userInfo.email,
      email_verified: userInfo.verified_email,
      name: userInfo.name,
      given_name: userInfo.given_name,
      family_name: userInfo.family_name,
      picture: userInfo.picture,
      locale: userInfo.locale || 'pt-BR',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
    };
  } catch (error) {
    console.error('❌ Erro ao buscar informações do usuário:', error);
    throw error;
  }
};
