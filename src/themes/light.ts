import type { Theme } from '../types/theme';

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    surface: '#F4F5F7',
    card: '#FFFFFF',
    header: '#F4F5F7',
    input: '#FFFFFF',
    inputBorder: '#D1D5DB',
    placeholder: '#9CA3AF',
    text: '#111827',
    textMuted: '#6B7280',
    primary: '#2563EB',
    onPrimary: '#FFFFFF',
    border: '#E5E7EB',
    error: '#DC2626',
    success: '#16A34A',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 6, md: 12, lg: 20 },
};