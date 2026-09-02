import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

import type { RootStackParamList } from './types';

export type { RootStackParamList } from './types';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const {
    theme,
    themeName,
    isDark,
    loading: themeLoading,
  } = useTheme();

  const baseNavigationTheme =
    themeName === 'dark'
      ? DarkTheme
      : DefaultTheme;

  const navigationTheme: NavigationTheme = {
    ...baseNavigationTheme,

    colors: {
      ...baseNavigationTheme.colors,

      background:
        theme.colors.background,

      card:
        theme.colors.header,

      text:
        theme.colors.text,

      primary:
        theme.colors.primary,

      border:
        theme.colors.border,
    },
  };

  /*
   * Enquanto sessão e tema são recuperados
   * do AsyncStorage, mostramos apenas o loading.
   *
   * Isso evita a tela de Login aparecer por
   * alguns instantes antes da recuperação
   * da sessão persistida.
   */
  if (authLoading || themeLoading) {
    return (
      <Loading
        isDark={isDark}
        message="Carregando aplicação..."
      />
    );
  }

  return (
    <NavigationContainer
      theme={navigationTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor:
              theme.colors.header,
          },

          headerTintColor:
            theme.colors.text,

          headerTitleStyle: {
            fontWeight: '600',
          },

          contentStyle: {
            backgroundColor:
              theme.colors.background,
          },
        }}
      >
        {user === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: true,
                title: 'Editar perfil',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}