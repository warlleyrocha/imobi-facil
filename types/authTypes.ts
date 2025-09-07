// src/types/authTypes.ts
export interface Token {
  expires_in: string;
  token_type: string;
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  dataNascimento?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  token: string; // JWT principal
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
