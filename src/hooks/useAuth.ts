import React, {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  authenticateUser,
  clearSession,
  registerUser,
  restoreSessionUser,
  saveSession,
  updateUserProfile,
} from '../services/authService';

import type {
  AuthContextValue,
  Credentials,
} from '../types/auth';

import type {
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
} from '../types/user';

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<PublicUser | null>(null);

  /*
   * Este loading representa principalmente
   * a recuperação da sessão quando o aplicativo
   * é iniciado.
   *
   * Login, cadastro, edição e logout possuem
   * seus próprios loadings nas telas.
   */
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // --------------------
  // Restaurar sessão
  // --------------------

  useEffect(() => {
    let isMounted = true;

    const restoreSession =
      async (): Promise<void> => {
        try {
          setError(null);

          const restoredUser =
            await restoreSessionUser();

          if (isMounted) {
            setUser(restoredUser);
          }
        } catch (error: unknown) {
          console.error(
            'Erro ao restaurar sessão:',
            error,
          );

          if (isMounted) {
            setUser(null);

            setError(
              'Não foi possível recuperar a sessão.',
            );
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  // --------------------
  // Cadastro
  // --------------------

  const signUp = useCallback(
    async (
      input: RegisterInput,
    ): Promise<void> => {
      try {
        setError(null);

        const newUser =
          await registerUser(input);

        await saveSession(newUser.id);

        setUser(newUser);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Não foi possível realizar o cadastro.';

        setError(message);

        throw new Error(message);
      }
    },
    [],
  );

  // --------------------
  // Login
  // --------------------

  const signIn = useCallback(
    async (
      credentials: Credentials,
    ): Promise<void> => {
      try {
        setError(null);

        const authenticatedUser =
          await authenticateUser(
            credentials,
          );

        await saveSession(
          authenticatedUser.id,
        );

        setUser(authenticatedUser);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Não foi possível realizar o login.';

        setError(message);

        throw new Error(message);
      }
    },
    [],
  );

  // --------------------
  // Logout
  // --------------------

  const signOut =
    useCallback(
      async (): Promise<void> => {
        try {
          setError(null);

          /*
           * Primeiro removemos a sessão
           * persistida.
           *
           * Somente depois disso removemos
           * o usuário do estado.
           */
          await clearSession();

          setUser(null);
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : 'Não foi possível encerrar a sessão.';

          setError(message);

          throw new Error(message);
        }
      },
      [],
    );

  // --------------------
  // Atualizar perfil
  // --------------------

  const updateProfile =
    useCallback(
      async (
        input: UpdateProfileInput,
      ): Promise<void> => {
        if (!user) {
          const message =
            'Nenhum usuário autenticado.';

          setError(message);

          throw new Error(message);
        }

        try {
          setError(null);

          const updatedUser =
            await updateUserProfile(
              user.id,
              input,
            );

          setUser(updatedUser);
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : 'Não foi possível atualizar o perfil.';

          setError(message);

          throw new Error(message);
        }
      },
      [user],
    );

  // --------------------
  // Limpar erros
  // --------------------

  const clearError =
    useCallback((): void => {
      setError(null);
    }, []);

  // --------------------
  // Valor do contexto
  // --------------------

  const value =
    useMemo<AuthContextValue>(
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
      [
        user,
        loading,
        error,
        signUp,
        signIn,
        signOut,
        updateProfile,
        clearError,
      ],
    );

  return createElement(
    AuthContext.Provider,
    {
      value,
    },
    children,
  );
}

export function useAuth(): AuthContextValue {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de um AuthProvider.',
    );
  }

  return context;
}