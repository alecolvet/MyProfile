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

import {
  authenticateUser,
  clearSession,
  registerUser,
  restoreSessionUser,
  saveSession,
  updateUserProfile,
} from '../services/authService';
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

  // Ao abrir o app: verifica no AsyncStorage se já existe sessão ativa.
  useEffect(() => {
    let active = true;

    async function restore() {
      try {
        const restoredUser = await restoreSessionUser();
        if (active) {
          setUser(restoredUser);
        }
      } catch (err) {
        console.error('[useAuth] Erro ao restaurar sessão:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    restore();

    return () => {
      active = false;
    };
  }, []);

  const signUp = useCallback(async (input: RegisterInput) => {
    setError(null);

    try {
      const newUser = await registerUser(input);
      await saveSession(newUser.id);
      setUser(newUser);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível concluir o cadastro.';
      setError(message);
      throw err;
    }
  }, []);

  const signIn = useCallback(async (credentials: Credentials) => {
    setError(null);

    try {
      const authenticatedUser = await authenticateUser(credentials);
      await saveSession(authenticatedUser.id);
      setUser(authenticatedUser);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível efetuar o login.';
      setError(message);
      throw err;
    }
  }, []);

  // Remove somente a sessão; o cadastro do usuário permanece salvo.
  const signOut = useCallback(async () => {
    setError(null);

    try {
      await clearSession();
    } catch (err) {
      console.error('[useAuth] Erro ao encerrar sessão:', err);
    } finally {
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(
    async (input: UpdateProfileInput) => {
      if (!user) {
        throw new Error('Nenhum usuário autenticado.');
      }

      setError(null);

      try {
        const updatedUser = await updateUserProfile(user.id, input);
        setUser(updatedUser);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Não foi possível salvar as alterações.';
        setError(message);
        throw err;
      }
    },
    [user],
  );

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
