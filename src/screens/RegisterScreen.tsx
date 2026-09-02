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

import {
  validateRegisterInput,
} from '../services/authService';

import type {
  RootStackParamList,
} from '../navigation/types';

import type {
  RegisterInput,
} from '../types/user';

type RegisterScreenProps =
  NativeStackScreenProps<
    RootStackParamList,
    'Register'
  >;

type RegisterErrors =
  Partial<
    Record<
      keyof RegisterInput,
      string
    >
  >;

export default function RegisterScreen({
  navigation,
}: RegisterScreenProps) {
  const {
    signUp,
    error: authError,
    clearError,
  } = useAuth();

  const {
    theme,
    isDark,
  } = useTheme();

  const [name, setName] =
    useState('');

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [errors, setErrors] =
    useState<RegisterErrors>({});

  const [
    registerError,
    setRegisterError,
  ] = useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const clearGeneralError =
    (): void => {
      setRegisterError(null);
      clearError();
    };

  const clearFieldError = (
    field: keyof RegisterInput,
  ): void => {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    if (registerError || authError) {
      clearGeneralError();
    }
  };

  const handleRegister =
    async (): Promise<void> => {
      clearGeneralError();

      const input: RegisterInput = {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      };

      const validation =
        validateRegisterInput(input);

      setErrors(
        validation.errors as RegisterErrors,
      );

      if (!validation.valid) {
        return;
      }

      try {
        setLoading(true);

        await signUp(input);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Não foi possível realizar o cadastro.';

        setRegisterError(message);
      } finally {
        setLoading(false);
      }
    };

  const handleLogin =
    (): void => {
      clearGeneralError();

      navigation.navigate('Login');
    };

  const displayedError =
    registerError ?? authError;

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
            Criar conta
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
            Cadastre-se no MyProfile
          </Text>

          <View style={styles.form}>
            <CustomInput
              label="Nome"
              value={name}
              onChangeText={(value) => {
                setName(value);
                clearFieldError('name');
              }}
              placeholder="Digite seu nome"
              editable={!loading}
              error={errors.name}
              isDark={isDark}
            />

            <CustomInput
              label="Nome de usuário"
              value={username}
              onChangeText={(value) => {
                setUsername(value);
                clearFieldError(
                  'username',
                );
              }}
              placeholder="Digite seu usuário"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              error={errors.username}
              isDark={isDark}
            />

            <CustomInput
              label="E-mail"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                clearFieldError('email');
              }}
              placeholder="exemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              error={errors.email}
              isDark={isDark}
            />

            <CustomInput
              label="Senha"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                clearFieldError(
                  'password',
                );
              }}
              placeholder="Digite sua senha"
              secureTextEntry
              editable={!loading}
              error={errors.password}
              isDark={isDark}
            />

            <CustomInput
              label="Confirmação de senha"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                clearFieldError(
                  'confirmPassword',
                );
              }}
              placeholder="Digite novamente sua senha"
              secureTextEntry
              editable={!loading}
              error={
                errors.confirmPassword
              }
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
                  Cadastrando...
                </Text>
              </View>
            ) : (
              <CustomButton
                title="Cadastrar"
                onPress={handleRegister}
                disabled={loading}
                isDark={isDark}
              />
            )}
          </View>

          <View
            style={
              styles.loginContainer
            }
          >
            <Text
              style={[
                styles.loginText,
                {
                  color:
                    theme.colors.textMuted,
                },
              ]}
            >
              Já tem cadastro?
            </Text>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
            >
              <Text
                style={[
                  styles.loginLink,
                  {
                    color:
                      theme.colors.primary,
                  },
                ]}
              >
                Entrar
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 28,
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
    fontWeight: '500',
    textAlign: 'center',
  },

  loadingContainer: {
    minHeight: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginLeft: 10,
    fontSize: 15,
  },

  loginContainer: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    fontSize: 14,
    marginRight: 5,
  },

  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});