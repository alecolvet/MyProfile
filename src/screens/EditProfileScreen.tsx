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

type EditProfileScreenProps = {
  navigation: any;
  isDark: boolean;
};

// Usuário temporário.
// Depois será substituído pelo usuário vindo do AuthContext.
const mockUser = {
  id: '1',
  name: 'Alexandre Colvet',
  username: 'alecolvet',
  email: 'alexandre@email.com',
};

export default function EditProfileScreen({
  navigation,
  isDark,
}: EditProfileScreenProps) {
  const [name, setName] = useState(mockUser.name);
  const [username, setUsername] = useState(mockUser.username);
  const [email, setEmail] = useState(mockUser.email);

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
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      Alert.alert(
        'Atenção',
        'O nome é obrigatório.',
      );
      return;
    }

    if (!trimmedUsername) {
      Alert.alert(
        'Atenção',
        'O nome de usuário é obrigatório.',
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
       * await updateUser({
       *   name: trimmedName,
       *   username: trimmedUsername,
       *   email: trimmedEmail,
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

            {/* Username */}
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Nome de usuário
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
                value={username}
                onChangeText={setUsername}
                placeholder="Digite seu nome de usuário"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
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