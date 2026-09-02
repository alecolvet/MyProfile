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
import { isMatch, isMinLength, isRequired, isValidEmail } from '../services/authService';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

type FormState = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!isRequired(form.name)) {
    errors.name = 'Informe seu nome.';
  }

  if (!isRequired(form.username)) {
    errors.username = 'Informe um nome de usuário.';
  }

  if (!isRequired(form.email)) {
    errors.email = 'Informe seu e-mail.';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!isRequired(form.password)) {
    errors.password = 'Informe uma senha.';
  } else if (!isMinLength(form.password, 6)) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (!isRequired(form.confirmPassword)) {
    errors.confirmPassword = 'Confirme sua senha.';
  } else if (!isMatch(form.password, form.confirmPassword)) {
    errors.confirmPassword = 'As senhas não são iguais.';
  }

  return errors;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { signUp, error: authError, clearError } = useAuth();
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
      await signUp(form);
      // Cadastro concluído -> signUp já autentica automaticamente.
      // O RootNavigator troca sozinho para a stack autenticada.
    } catch {
      // "Este e-mail já está cadastrado." / "...usuário já está em uso."
      // já ficam disponíveis em authError.
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
          <Text style={[styles.title, { color: theme.colors.text }]}>Criar conta</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Preencha seus dados para se cadastrar
          </Text>

          <CustomInput
            label="Nome"
            isDark={isDark}
            placeholder="Seu nome completo"
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
            error={fieldErrors.name}
            editable={!submitting}
          />

          <CustomInput
            label="Nome de usuário"
            isDark={isDark}
            placeholder="Como você vai usar para entrar"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.username}
            onChangeText={(value) => handleChange('username', value)}
            error={fieldErrors.username}
            editable={!submitting}
          />

          <CustomInput
            label="E-mail"
            isDark={isDark}
            placeholder="seuemail@exemplo.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            error={fieldErrors.email}
            editable={!submitting}
          />

          <CustomInput
            label="Senha"
            isDark={isDark}
            placeholder="Crie uma senha"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            error={fieldErrors.password}
            editable={!submitting}
          />

          <CustomInput
            label="Confirmar senha"
            isDark={isDark}
            placeholder="Repita a senha"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            error={fieldErrors.confirmPassword}
            editable={!submitting}
          />

          {authError && (
            <Text style={[styles.authError, { color: theme.colors.error }]}>{authError}</Text>
          )}

          <CustomButton
            title={submitting ? 'Cadastrando...' : 'Cadastrar'}
            isDark={isDark}
            onPress={handleSubmit}
            disabled={submitting}
          />

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
            disabled={submitting}
          >
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>
              Já tem cadastro? Entrar
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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
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
