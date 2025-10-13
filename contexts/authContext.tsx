import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

// AsyncStorage é usado para armazenar dados persistentes localmente (ex: sessão do usuário)
import { AuthContextData, User } from '../types/authTypes';
import { Platform } from 'react-native';
// Tipos TypeScript para o contexto e o objeto User

const STORAGE_KEY = '@yourapp:user';
// Chave usada para armazenar dados do usuário no AsyncStorage

// Criação do contexto de autenticação, que poderá ser consumido na árvore de componentes
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Provider que envolve a aplicação para prover dados de autenticação
export function AuthContextProvider({ children }: Readonly<{ children: ReactNode }>) {
  // Estado para guardar o usuário autenticado ou null caso não haja
  const [user, setUser] = useState<User | null>(null);
  // Estado para controlar se está carregando a restauração da sessão
  const [loading, setLoading] = useState(true);

  // useEffect que executa na montagem para tentar restaurar a sessão do AsyncStorage
  useEffect(() => {
    async function restoreSession() {
      try {
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          const parsedUser: User = JSON.parse(savedUser);
          // Aqui poderia validar token, expiração, etc (exemplo comentado abaixo)
          // if (parsedUser.accessToken && !isTokenExpired(parsedUser.accessToken)) {
          //   setUser(parsedUser);
          // }
          setUser(parsedUser);
        }
      } catch (e) {
        console.error('Erro ao restaurar sessão:', e);
      } finally {
        setLoading(false); // Termina o loading mesmo que dê erro
      }
    }
    restoreSession();
  }, []);

  // Função para fazer login: salva o usuário no AsyncStorage e no estado
  async function login(userData: User) {
    try {
      //+Feature: Identifica plataforma para salvar localmente os dados do usuário
      if (Platform.OS !== 'web') await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.error('Erro no login:', e);
    }
  }

  // Função para logout: remove o usuário do AsyncStorage e limpa estado
  async function logout() {
    try {
      //+Feature: Identifica plataforma para remover localmente os dados do usuário
      if (Platform.OS !== 'web') await AsyncStorage.removeItem(STORAGE_KEY);
      else localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (e) {
      console.error('Erro no logout:', e);
    }
  }

  //+Patch: Sempre que o user mudar, sincroniza o AsyncStorage ou localStorage, dependendo da plataforma
  // Assim garante que alterações manuais em setUser também persistam
  useEffect(() => {
    async function syncUserStorage() {
      if (user) {
        try {
          if (Platform.OS !== 'web') await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          else localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch (e) {
          console.error('Erro ao sincronizar usuário:', e);
        }
      } else {
        try {
          if (Platform.OS !== 'web') await AsyncStorage.removeItem(STORAGE_KEY);
          else localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          console.error('Erro ao limpar usuário:', e);
        }
      }
    }
    syncUserStorage();
  }, [user]);

  // Memoriza o valor do contexto para evitar renders desnecessários
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

  // Provedor do contexto que envolve os filhos e disponibiliza o valor
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado para consumir o contexto de autenticação
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthContextProvider');
  return ctx;
}
