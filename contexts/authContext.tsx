import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData, User } from '../types/authTypes';

const STORAGE_KEY = '@yourapp:user';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          const parsedUser: User = JSON.parse(savedUser);
          // Exemplo de validação simples de token expirado:
          // if (parsedUser.accessToken && !isTokenExpired(parsedUser.accessToken)) {
          //   setUser(parsedUser);
          // }
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Erro ao restaurar sessão:', e);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(userData: User) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.error('Erro no login:', e);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (e) {
      console.error('Erro no logout:', e);
    }
  }

  // Sincroniza AsyncStorage sempre que user muda (incluindo setUser manual)
  useEffect(() => {
    async function syncUserStorage() {
      if (user) {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch (e) {
          console.error('Erro ao sincronizar usuário:', e);
        }
      } else {
        try {
          await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          console.error('Erro ao limpar usuário:', e);
        }
      }
    }
    syncUserStorage();
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      setUser,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthContextProvider');
  return ctx;
}
