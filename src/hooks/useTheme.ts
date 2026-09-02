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

import { STORAGE_KEYS } from '../constants/storage';
import { getItem, setItem } from '../services/storageService';
import { darkTheme } from '../themes/dark';
import { lightTheme } from '../themes/light';
import type { Theme, ThemeContextValue, ThemeName } from '../types/theme';

const THEMES: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

const DEFAULT_THEME: ThemeName = 'light';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeName(value: unknown): value is ThemeName {
  return value === 'light' || value === 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function restoreTheme() {
      const saved = await getItem<ThemeName>(STORAGE_KEYS.THEME);
      if (!active) return;
      if (isThemeName(saved)) setThemeName(saved);
      setLoading(false);
    }

    restoreTheme();

    return () => {
      active = false;
    };
  }, []);

  /** Aplica o tema na hora e persiste; se o AsyncStorage falhar, volta ao anterior. */
  const setTheme = useCallback(
    async (next: ThemeName) => {
      const previous = themeName;
      if (next === previous) return;

      setThemeName(next);
      setError(null);

      try {
        await setItem(STORAGE_KEYS.THEME, next);
      } catch {
        setThemeName(previous);
        setError('Não foi possível salvar o tema escolhido.');
      }
    },
    [themeName],
  );

  const toggleTheme = useCallback(
    () => setTheme(themeName === 'light' ? 'dark' : 'light'),
    [setTheme, themeName],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: THEMES[themeName],
      themeName,
      isDark: themeName === 'dark',
      loading,
      error,
      toggleTheme,
      setTheme,
    }),
    [themeName, loading, error, toggleTheme, setTheme],
  );

  return createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme precisa estar dentro de um <ThemeProvider>.');
  }
  return context;
}