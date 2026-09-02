import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/types';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormState = {
  username: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = { username: '', password: '' };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.username.trim()) {
    errors.username = 'Informe seu usuário ou e-mail.';
  }

  if (!form.password) {
    errors.password = 'Informe sua senha.';
  }

  return errors;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { signIn, error: authError, clearError } = useAuth();
  const { theme, isDark } = useTheme();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((previousForm) => ({ ...previousForm, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((previousErrors) => ({ ...previousErrors, [field]: undefined }));
    }
    if (authError) {
      clearError();
    }
  }

  async function handleSubmit() {
    const errors = validate(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await signIn(form);
      // Sem navigation.navigate aqui: assim que `user` deixa de ser null,
      // o RootNavigator troca sozinho para a stack autenticada (Profile).
    } catch {
      // "Usuário/e-mail ou senha incorretos." já fica disponível em authError.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>MyProfile</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Entre com seu usuário ou e-mail e senha
          </Text>

          <CustomInput
            label="Usuário ou e-mail"
            isDark={isDark}
            placeholder="usuario ou seuemail@exemplo.com"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.username}
            onChangeText={(value) => handleChange('username', value)}
            error={fieldErrors.username}
            editable={!submitting}
          />

          <CustomInput
            label="Senha"
            isDark={isDark}
            placeholder="Sua senha"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            error={fieldErrors.password}
            editable={!submitting}
          />

          {authError && (
            <Text style={[styles.authError, { color: theme.colors.error }]}>{authError}</Text>
          )}

          <CustomButton
            title={submitting ? 'Entrando...' : 'Entrar'}
            isDark={isDark}
            onPress={handleSubmit}
            disabled={submitting}
          />

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
            disabled={submitting}
          >
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>
              Ainda não tem cadastro? Cadastrar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 28,
  },
  authError: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  linkButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
