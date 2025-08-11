// Interface para o payload do ID Token do Google
export interface GoogleIdTokenPayload {
  id: string; // obrigatório
  iss: string; // Issuer
  aud: string; // Audience
  sub: string; // Subject (ID único do usuário)
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  iat: number; // Issued at
  exp: number; // Expires at
}
