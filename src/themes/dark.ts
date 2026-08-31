import type { Theme } from '../types/theme';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#0F172A',
    surface: '#1E293B',
    card: '#1E293B',
    header: '#1E293B',
    input: '#111C33',
    inputBorder: '#334155',
    placeholder: '#64748B',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    primary: '#60A5FA',
    onPrimary: '#0F172A',
    border: '#334155',
    error: '#F87171',
    success: '#4ADE80',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 6, md: 12, lg: 20 },
};