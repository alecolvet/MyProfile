import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, TreatmentPreference } from '../types/user';
import { storageService } from '../services/storage';

const AVAILABLE_USERS = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin' as const,
    name: 'Administrador',
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    role: 'user' as const,
    name: 'Usuário Comum',
  },
];

// 1. Declarar na interface do Contexto
export interface AuthContextData {
  user: User | null;
  treatment: TreatmentPreference;
  isLoadingAuth: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>; // Alias para compatibilidade
  updateTreatment: (newTreatment: TreatmentPreference) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [treatment, setTreatment] = useState<TreatmentPreference>('');
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await storageService.getSession();
        if (storedUser) {
          setUser(storedUser);
          const savedTreatment = await storageService.getTreatment(storedUser.id);
          setTreatment(savedTreatment);
        }
      } catch {
        // Falha silenciosa ao restaurar sessão
      } finally {
        setIsLoadingAuth(false);
      }
    };
    loadSession();
  }, []);

  const signIn = async (username: string, password: string): Promise<void> => {
    const found = AVAILABLE_USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );

    if (!found) {
      throw new Error('Utilizador ou palavra-passe inválidos.');
    }

    const loggedUser: User = {
      id: found.id,
      username: found.username,
      role: found.role,
      name: found.name,
    };

    await storageService.saveSession(loggedUser);
    const savedTreatment = await storageService.getTreatment(loggedUser.id);
    setTreatment(savedTreatment);
    setUser(loggedUser);
  };

  // 2. Implementação da função de logout/signOut
  const signOut = async (): Promise<void> => {
    await storageService.clearSession();
    setUser(null);
    setTreatment('');
  };

  const updateTreatment = async (newTreatment: TreatmentPreference): Promise<void> => {
    if (!user) return;
    await storageService.saveTreatment(user.id, newTreatment);
    setTreatment(newTreatment);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        treatment,
        isLoadingAuth,
        signIn,
        signOut,
        logout: signOut,
        updateTreatment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};