import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { AuthContextValue, Credentials } from '../types/auth';
import type {
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
} from '../types/user';

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const signUp = useCallback(async (_input: RegisterInput) => {
    throw new Error('signUp ainda não implementado.');
  }, []);

  const signIn = useCallback(async (_credentials: Credentials) => {
    throw new Error('signIn ainda não implementado.');
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (_input: UpdateProfileInput) => {
    throw new Error('updateProfile ainda não implementado.');
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      signUp,
      signIn,
      signOut,
      updateProfile,
      clearError,
    }),
    [user, loading, error, signUp, signIn, signOut, updateProfile, clearError],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de um <AuthProvider>.');
  }
  return context;
}