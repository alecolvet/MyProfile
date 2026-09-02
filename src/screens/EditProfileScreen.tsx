import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../navigation/types';
import type { UpdateProfileInput } from '../types/user';

type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

type ProfileErrors = Partial<
  Record<keyof UpdateProfileInput, string>
>;

export default function EditProfileScreen({
  navigation,
}: EditProfileScreenProps) {
  const { user, updateProfile } = useAuth();
  const { isDark, theme } = useTheme();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [city, setCity] = useState(user?.city ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const validationErrors: ProfileErrors = {};

    if (!name.trim()) {
      validationErrors.name = 'Informe seu nome.';
    }

    if (!email.trim()) {
      validationErrors.email = 'Informe seu e-mail.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        validationErrors.email = 'Informe um e-mail válido.';
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    const updatedData: UpdateProfileInput = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      bio: bio.trim(),
    };

    try {
      setLoading(true);

      await updateProfile(updatedData);

      Alert.alert(
        'Sucesso',
        'Perfil atualizado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar as alterações.';

      Alert.alert('Erro ao salvar', message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    navigation.goBack();
  };

  if (!user) {
    return (
      <View
        style={[
          styles.centerContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.errorMessage,
            {
              color: theme.colors.error,
            },
          ]}
        >
          Nenhum usuário autenticado.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Editar Perfil
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textMuted,
            },
          ]}
        >
          Atualize suas informações pessoais
        </Text>

        <View
          style={[
            styles.usernameContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.usernameLabel,
              {
                color: theme.colors.textMuted,
              },
            ]}
          >
            Nome de usuário
          </Text>

          <Text
            style={[
              styles.usernameText,
              {
                color: theme.colors.text,
              },
            ]}
          >
            @{user.username}
          </Text>

          <Text
            style={[
              styles.usernameHint,
              {
                color: theme.colors.textMuted,
              },
            ]}
          >
            O nome de usuário é utilizado para autenticação e não será
            alterado nesta tela.
          </Text>
        </View>

        <CustomInput
          label="Nome"
          isDark={isDark}
          value={name}
          onChangeText={(value) => {
            setName(value);

            if (errors.name) {
              setErrors((previous) => ({
                ...previous,
                name: undefined,
              }));
            }
          }}
          error={errors.name}
          placeholder="Digite seu nome"
          editable={!loading}
        />

        <CustomInput
          label="E-mail"
          isDark={isDark}
          value={email}
          onChangeText={(value) => {
            setEmail(value);

            if (errors.email) {
              setErrors((previous) => ({
                ...previous,
                email: undefined,
              }));
            }
          }}
          error={errors.email}
          placeholder="exemplo@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <CustomInput
          label="Telefone"
          isDark={isDark}
          value={phone}
          onChangeText={setPhone}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
          editable={!loading}
        />

        <CustomInput
          label="Cidade"
          isDark={isDark}
          value={city}
          onChangeText={setCity}
          placeholder="Digite sua cidade"
          editable={!loading}
        />

        <CustomInput
          label="Biografia"
          isDark={isDark}
          value={bio}
          onChangeText={setBio}
          placeholder="Conte um pouco sobre você"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          editable={!loading}
          style={styles.bioInput}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
            />

            <Text
              style={[
                styles.loadingText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              Salvando alterações...
            </Text>
          </View>
        ) : (
          <>
            <CustomButton
              title="Salvar alterações"
              isDark={isDark}
              onPress={handleSave}
              style={styles.saveButton}
            />

            <CustomButton
              title="Cancelar"
              isDark={isDark}
              onPress={handleCancel}
              style={[
                styles.cancelButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },

  usernameContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  usernameLabel: {
    fontSize: 13,
    marginBottom: 4,
  },

  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  usernameHint: {
    fontSize: 12,
    marginTop: 6,
    lineHeight: 17,
  },

  bioInput: {
    minHeight: 120,
  },

  loadingContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },

  saveButton: {
    marginTop: 8,
  },

  cancelButton: {
    marginTop: 12,
    borderWidth: 1,
  },

  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
});