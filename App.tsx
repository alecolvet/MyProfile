import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { AppRoutes } from './src/routes/AppRoutes';
import { useTheme } from './src/hooks/useTheme';

const RootContent: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppRoutes />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <RootContent />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}