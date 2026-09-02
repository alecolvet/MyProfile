import React, {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { STORAGE_KEYS } from '../constants/storage';
import { getItem, setItem } from '../services/storageService';

import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

import type {
  Theme,
  ThemeContextValue,
  ThemeName,
} from '../types/theme';

const ThemeContext =
  createContext<ThemeContextValue | undefined>(
    undefined,
  );

type ThemeProviderProps = {
  children: React.ReactNode;
};

function isThemeName(
  value: unknown,
): value is ThemeName {
  return (
    value === 'light' ||
    value === 'dark'
  );
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [themeName, setThemeName] =
    useState<ThemeName>('light');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // --------------------
  // Recuperar tema salvo
  // --------------------

  useEffect(() => {
    let isMounted = true;

    const restoreTheme =
      async (): Promise<void> => {
        try {
          setError(null);

          const savedTheme =
            await getItem<ThemeName>(
              STORAGE_KEYS.THEME,
            );

          if (
            isMounted &&
            isThemeName(savedTheme)
          ) {
            setThemeName(savedTheme);
          }
        } catch (error: unknown) {
          console.error(
            'Erro ao recuperar tema:',
            error,
          );

          if (isMounted) {
            setThemeName('light');

            setError(
              'Não foi possível recuperar o tema salvo.',
            );
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

    void restoreTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  // --------------------
  // Definir tema
  // --------------------

  const setTheme =
    useCallback(
      async (
        newTheme: ThemeName,
      ): Promise<void> => {
        const previousTheme =
          themeName;

        try {
          setError(null);

          setThemeName(newTheme);

          await setItem<ThemeName>(
            STORAGE_KEYS.THEME,
            newTheme,
          );
        } catch (error: unknown) {
          console.error(
            'Erro ao salvar tema:',
            error,
          );

          setThemeName(previousTheme);

          const message =
            'Não foi possível salvar o tema selecionado.';

          setError(message);

          throw new Error(message);
        }
      },
      [themeName],
    );

  // --------------------
  // Alternar tema
  // --------------------

  const toggleTheme =
    useCallback(
      async (): Promise<void> => {
        const newTheme: ThemeName =
          themeName === 'dark'
            ? 'light'
            : 'dark';

        await setTheme(newTheme);
      },
      [
        themeName,
        setTheme,
      ],
    );

  // --------------------
  // Limpar erro
  // --------------------

  const clearThemeError =
    useCallback((): void => {
      setError(null);
    }, []);

  // --------------------
  // Tema atual
  // --------------------

  const theme =
    useMemo<Theme>(
      () =>
        themeName === 'dark'
          ? darkTheme
          : lightTheme,
      [themeName],
    );

  const isDark =
    themeName === 'dark';

  // --------------------
  // Valor do contexto
  // --------------------

  const value =
    useMemo<ThemeContextValue>(
      () => ({
        themeName,
        theme,
        isDark,
        loading,
        error,
        setTheme,
        toggleTheme,
        clearThemeError,
      }),
      [
        themeName,
        theme,
        isDark,
        loading,
        error,
        setTheme,
        toggleTheme,
        clearThemeError,
      ],
    );

  return createElement(
    ThemeContext.Provider,
    {
      value,
    },
    children,
  );
}

export function useTheme():
  ThemeContextValue {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme deve ser utilizado dentro de um ThemeProvider.',
    );
  }

  return context;
}