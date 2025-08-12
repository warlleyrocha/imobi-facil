// src/types/authTypes.ts

export interface User {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
