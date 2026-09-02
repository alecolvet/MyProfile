import React, {
  useState,
} from 'react';

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import type {
  RootStackParamList,
} from '../navigation/types';

type LoginScreenProps =
  NativeStackScreenProps<
    RootStackParamList,
    'Login'
  >;

type LoginErrors = {
  username?: string;
  password?: string;
};

export default function LoginScreen({
  navigation,
}: LoginScreenProps) {
  const {
    signIn,
    error: authError,
    clearError,
  } = useAuth();

  const {
    theme,
    isDark,
  } = useTheme();

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [errors, setErrors] =
    useState<LoginErrors>({});

  const [loginError, setLoginError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const clearLoginError = (): void => {
    setLoginError(null);
    clearError();
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!username.trim()) {
      newErrors.username =
        'Informe seu nome de usuário.';
    }

    if (!password) {
      newErrors.password =
        'Informe sua senha.';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleLogin =
    async (): Promise<void> => {
      clearLoginError();

      if (!validateForm()) {
        return;
      }

      try {
        setLoading(true);

        await signIn({
          username: username.trim(),
          password,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Não foi possível realizar o login.';

        setLoginError(message);
      } finally {
        setLoading(false);
      }
    };

  const handleUsernameChange = (
    value: string,
  ): void => {
    setUsername(value);

    if (errors.username) {
      setErrors((previous) => ({
        ...previous,
        username: undefined,
      }));
    }

    if (loginError || authError) {
      clearLoginError();
    }
  };

  const handlePasswordChange = (
    value: string,
  ): void => {
    setPassword(value);

    if (errors.password) {
      setErrors((previous) => ({
        ...previous,
        password: undefined,
      }));
    }

    if (loginError || authError) {
      clearLoginError();
    }
  };

  const handleRegister =
    (): void => {
      clearLoginError();

      navigation.navigate('Register');
    };

  const displayedError =
    loginError ?? authError;

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.colors.background,
        },
      ]}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color:
                  theme.colors.text,
              },
            ]}
          >
            MyProfile
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color:
                  theme.colors.textMuted,
              },
            ]}
          >
            Entre na sua conta
          </Text>

          <View style={styles.form}>
            <CustomInput
              label="Nome de usuário"
              value={username}
              onChangeText={
                handleUsernameChange
              }
              placeholder="Digite seu usuário"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              error={errors.username}
              isDark={isDark}
            />

            <CustomInput
              label="Senha"
              value={password}
              onChangeText={
                handlePasswordChange
              }
              placeholder="Digite sua senha"
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
              error={errors.password}
              isDark={isDark}
            />

            {displayedError ? (
              <View
                style={[
                  styles.errorContainer,
                  {
                    backgroundColor:
                      theme.colors.surface,
                    borderColor:
                      theme.colors.error,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.errorText,
                    {
                      color:
                        theme.colors.error,
                    },
                  ]}
                >
                  {displayedError}
                </Text>
              </View>
            ) : null}

            {loading ? (
              <View
                style={
                  styles.loadingContainer
                }
              >
                <ActivityIndicator
                  size="small"
                  color={
                    theme.colors.primary
                  }
                />

                <Text
                  style={[
                    styles.loadingText,
                    {
                      color:
                        theme.colors.textMuted,
                    },
                  ]}
                >
                  Entrando...
                </Text>
              </View>
            ) : (
              <CustomButton
                title="Entrar"
                onPress={handleLogin}
                disabled={loading}
                isDark={isDark}
              />
            )}
          </View>

          <View
            style={
              styles.registerContainer
            }
          >
            <Text
              style={[
                styles.registerText,
                {
                  color:
                    theme.colors.textMuted,
                },
              ]}
            >
              Ainda não tem cadastro?
            </Text>

            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
            >
              <Text
                style={[
                  styles.registerLink,
                  {
                    color:
                      theme.colors.primary,
                  },
                ]}
              >
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    textAlign: 'center',
  },

  form: {
    width: '100%',
  },

  errorContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  errorText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },

  loadingContainer: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginLeft: 10,
    fontSize: 15,
  },

  registerContainer: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText: {
    fontSize: 14,
    marginRight: 5,
  },

  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});