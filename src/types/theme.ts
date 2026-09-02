export type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  header: string;

  input: string;
  inputBorder: string;
  placeholder: string;

  text: string;
  textMuted: string;

  primary: string;
  onPrimary: string;

  border: string;

  error: string;
  success: string;
};

export type Theme = {
  name: ThemeName;

  colors: ThemeColors;

  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };

  radius: {
    sm: number;
    md: number;
    lg: number;
  };
};

export type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  isDark: boolean;
  loading: boolean;
  error: string | null;

  toggleTheme: () => Promise<void>;

  setTheme: (
    name: ThemeName,
  ) => Promise<void>;

  clearThemeError: () => void;
};