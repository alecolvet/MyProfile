import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';
import type { PublicUser } from '../types/user';

type EditProfileScreenProps = {
  navigation: any;
};

// Usuário temporário.
// Depois será substituído pelo usuário vindo do AuthContext.
const mockUser: PublicUser = {
  id: '1',
  name: 'Alexandre Colvet',
  username: 'alecolvet',
  email: 'alexandre@email.com',
  phone: '11 99999-9999',
  city: 'São Paulo',
  bio: 'Estudante de Engenharia de Software.',
  createdAt: new Date().toISOString(),
};

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';

  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);
  const [city, setCity] = useState(mockUser.city);
  const [bio, setBio] = useState(mockUser.bio);

  const [loading, setLoading] = useState(false);

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    input: isDark ? '#252525' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#111111',
    secondaryText: isDark ? '#AAAAAA' : '#666666',
    border: isDark ? '#3A3A3A' : '#DDDDDD',
    placeholder: isDark ? '#777777' : '#999999',
    primary: '#4F46E5',
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedCity = city.trim();
    const trimmedBio = bio.trim();

    if (!trimmedName) {
      Alert.alert(
        'Atenção',
        'O nome é obrigatório.',
      );
      return;
    }

    if (!trimmedEmail) {
      Alert.alert(
        'Atenção',
        'O e-mail é obrigatório.',
      );
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      Alert.alert(
        'Atenção',
        'Digite um e-mail válido.',
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * Futuramente será substituído por:
       *
       * await updateProfile({
       *   name: trimmedName,
       *   email: trimmedEmail,
       *   phone: trimmedPhone,
       *   city: trimmedCity,
       *   bio: trimmedBio,
       * });
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 800),
      );

      Alert.alert(
        'Sucesso',
        'Perfil atualizado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar o perfil.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
            >
              Editar perfil
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              Atualize seus dados pessoais
            </Text>
          </View>

          {/* Formulário */}
          <View
            style={[
              styles.formCard,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            {/* Nome */}
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Nome
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="words"
                editable={!loading}
              />
            </View>

            {/* E-mail */}
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.text,
                  },
                ]}
              >
                E-mail
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                placeholderTextColor={colors.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* Telefone */}
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Telefone
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Digite seu telefone"
                placeholderTextColor={colors.placeholder}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>

            {/* Cidade */}
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Cidade
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={city}
                onChangeText={setCity}
                placeholder="Digite sua cidade"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="words"
                editable={!loading}
              />
            </View>

            {/* Biografia */}
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Biografia
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: colors.input,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                value={bio}
                onChangeText={setBio}
                placeholder="Fale um pouco sobre você"
                placeholderTextColor={colors.placeholder}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!loading}
              />
            </View>

            {/* Salvar */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: colors.primary,
                  opacity: loading ? 0.6 : 1,
                },
              ]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>
                {loading
                  ? 'Salvando...'
                  : 'Salvar alterações'}
              </Text>
            </TouchableOpacity>

            {/* Cancelar */}
            <TouchableOpacity
              style={[
                styles.cancelButton,
                {
                  borderColor: colors.border,
                  opacity: loading ? 0.6 : 1,
                },
              ]}
              onPress={() => navigation.goBack()}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 6,
  },

  formCard: {
    borderRadius: 18,
    padding: 20,

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,

    paddingHorizontal: 16,
    paddingVertical: 14,

    fontSize: 16,
  },

  textArea: {
    minHeight: 110,
    paddingTop: 14,
  },

  saveButton: {
    borderRadius: 12,
    paddingVertical: 16,

    alignItems: 'center',

    marginTop: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  cancelButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,

    alignItems: 'center',

    marginTop: 12,
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});