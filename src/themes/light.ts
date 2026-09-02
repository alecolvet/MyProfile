import type { Theme } from '../types/theme';

export const lightTheme: Theme = {
  name: 'light',

  colors: {
    background: '#F8FAFC',

    surface: '#F1F5F9',

    card: '#FFFFFF',

    header: '#FFFFFF',

    input: '#FFFFFF',

    inputBorder: '#CBD5E1',

    placeholder: '#94A3B8',

    text: '#0F172A',

    textMuted: '#64748B',

    primary: '#2563EB',

    onPrimary: '#FFFFFF',

    border: '#E2E8F0',

    error: '#DC2626',

    success: '#16A34A',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    sm: 6,
    md: 12,
    lg: 20,
  },
};