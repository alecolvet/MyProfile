import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { storageService } from '../services/storage';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  onPrimary: string; // Adicionado para o CustomButton
  border: string;
  error: string;
  success: string;
  warning: string;
}

const lightColors: ThemeColors = {
  background: '#F4F6F9',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  primary: '#3B82F6',
  onPrimary: '#FFFFFF',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  primary: '#60A5FA',
  onPrimary: '#0F172A',
  border: '#334155',
  error: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
};

export interface ThemeContextData {
  isDark: boolean;
  colors: ThemeColors;
  // Compatibilidade com componentes que usam theme.colors
  theme: {
    colors: ThemeColors;
    isDark: boolean;
  };
  toggleTheme: () => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await storageService.getTheme();
        if (savedTheme !== null) {
          setIsDark(savedTheme);
        }
      } catch {
        // Fallback silencioso
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const nextTheme = !isDark;
      setIsDark(nextTheme);
      await storageService.saveTheme(nextTheme);
    } catch {
      // Erro ao salvar
    }
  };

  const activeColors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors: activeColors,
        theme: {
          colors: activeColors,
          isDark,
        },
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};