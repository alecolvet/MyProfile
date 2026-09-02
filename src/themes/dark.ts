import type { Theme } from '../types/theme';

export const darkTheme: Theme = {
  name: 'dark',

  colors: {
    background: '#0F172A',

    surface: '#1E293B',

    card: '#1E293B',

    header: '#111827',

    input: '#111827',

    inputBorder: '#475569',

    placeholder: '#94A3B8',

    text: '#F8FAFC',

    textMuted: '#CBD5E1',

    primary: '#60A5FA',

    onPrimary: '#0F172A',

    border: '#334155',

    error: '#F87171',

    success: '#4ADE80',
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