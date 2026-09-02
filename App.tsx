import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/hooks/useAuth';
import {
  ThemeProvider,
  useTheme,
} from './src/hooks/useTheme';
import { RootNavigator } from './src/navigation/RootNavigator';

function ThemedStatusBar() {
  const { themeName } = useTheme();

  return (
    <StatusBar
      style={
        themeName === 'dark'
          ? 'light'
          : 'dark'
      }
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <ThemedStatusBar />

          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}