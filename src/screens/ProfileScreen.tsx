import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomButton } from '../components/CustomButton';
import { Loading } from '../components/Loading';
import { ProfileCard } from '../components/ProfileCard';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/types';

type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export default function ProfileScreen({
  navigation,
}: ProfileScreenProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const {
    user,
    signOut,
    loading: authLoading,
  } = useAuth();

  const {
    isDark,
    theme,
    themeName,
    toggleTheme,
    loading: themeLoading,
    error: themeError,
  } = useTheme();

  const handleEditProfile = (): void => {
    navigation.navigate('EditProfile');
  };

  const handleToggleTheme = async (): Promise<void> => {
    try {
      await toggleTheme();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível alterar o tema.';

      Alert.alert('Erro', message);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      setLogoutLoading(true);

      await signOut();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível sair da aplicação.';

      Alert.alert('Erro ao sair', message);
    } finally {
      setLogoutLoading(false);
    }
  };

  if (authLoading || themeLoading || !user) {
    return <Loading isDark={isDark} />;
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.greeting,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Olá, {user.name}
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Meu Perfil
        </Text>

        <View
          style={[
            styles.themeContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.themeTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Aparência
          </Text>

          <Text
            style={[
              styles.themeCurrent,
              {
                color: theme.colors.textMuted,
              },
            ]}
          >
            Tema atual: {themeName === 'dark' ? 'Dark' : 'Light'}
          </Text>

          <ThemeSwitch
            isDark={isDark}
            onToggle={() => {
              void handleToggleTheme();
            }}
          />

          {themeError ? (
            <Text
              style={[
                styles.themeError,
                {
                  color: theme.colors.error,
                },
              ]}
            >
              {themeError}
            </Text>
          ) : null}
        </View>

        <View style={styles.cardWrapper}>
          <ProfileCard
            data={user}
            isDark={isDark}
          />
        </View>

        <CustomButton
          title="Editar Perfil"
          isDark={isDark}
          onPress={handleEditProfile}
        />

        <CustomButton
          title={logoutLoading ? 'Saindo...' : 'Sair'}
          isDark={isDark}
          onPress={() => {
            void handleLogout();
          }}
          disabled={logoutLoading}
          style={[
            styles.logoutButton,
            {
              backgroundColor: theme.colors.error,
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  greeting: {
    fontSize: 18,
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  themeContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },

  themeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  themeCurrent: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },

  themeError: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },

  cardWrapper: {
    width: '100%',
    marginVertical: 24,
  },

  logoutButton: {
    marginTop: 16,
  },
});