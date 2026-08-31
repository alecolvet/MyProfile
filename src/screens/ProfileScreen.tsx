import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

type ProfileScreenProps = {
  navigation: any;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

// Usuário temporário.
// Será substituído pelo AuthContext do Integrante 3.
const mockUser: User = {
  id: '1',
  name: 'Alexandre Colvet',
  username: 'alecolvet',
  email: 'alexandre@email.com',
};

export default function ProfileScreen({
  navigation,
  isDark,
  setIsDark,
}: ProfileScreenProps) {
  const user = mockUser;

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#111111',
    secondaryText: isDark ? '#AAAAAA' : '#666666',
    border: isDark ? '#333333' : '#EEEEEE',
    input: isDark ? '#252525' : '#F8F8F8',
    primary: '#4F46E5',
    danger: '#DC2626',
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    // Será substituído pelo logout do AuthContext.
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            console.log('Logout');
          },
        },
      ],
    );
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
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
            Meu Perfil
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Visualize e gerencie seus dados
          </Text>
        </View>

        {/* Card do perfil */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          {/* Avatar */}
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          {/* Nome */}
          <Text
            style={[
              styles.name,
              {
                color: colors.text,
              },
            ]}
          >
            {user.name}
          </Text>

          {/* Username */}
          <Text
            style={[
              styles.username,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            @{user.username}
          </Text>

          {/* Informações */}
          <View style={styles.infoContainer}>
            <View
              style={[
                styles.infoRow,
                {
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.infoLabel,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Nome
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {user.name}
              </Text>
            </View>

            <View
              style={[
                styles.infoRow,
                {
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.infoLabel,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Nome de usuário
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  {
                    color: colors.text,
                  },
                ]}
              >
                @{user.username}
              </Text>
            </View>

            <View
              style={[
                styles.infoRow,
                {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.infoLabel,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                E-mail
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {user.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Tema */}
        <View
          style={[
            styles.themeCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.themeInfo}>
            <Text
              style={[
                styles.themeTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              Aparência
            </Text>

            <Text
              style={[
                styles.themeDescription,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              {isDark ? 'Modo escuro' : 'Modo claro'}
            </Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={setIsDark}
            trackColor={{
              false: '#D1D5DB',
              true: '#818CF8',
            }}
            thumbColor={isDark ? '#4F46E5' : '#FFFFFF'}
          />
        </View>

        {/* Botão editar */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            {
              backgroundColor: colors.primary,
            },
          ]}
          onPress={handleEditProfile}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            Editar perfil
          </Text>
        </TouchableOpacity>

        {/* Botão sair */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              borderColor: colors.danger,
            },
          ]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.logoutButtonText,
              {
                color: colors.danger,
              },
            ]}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 24,
    paddingBottom: 40,
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

  profileCard: {
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 16,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '700',
  },

  name: {
    fontSize: 23,
    fontWeight: '700',
  },

  username: {
    fontSize: 16,
    marginTop: 4,
  },

  infoContainer: {
    width: '100%',
    marginTop: 28,
  },

  infoRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },

  infoLabel: {
    fontSize: 13,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },

  themeCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 2,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  themeInfo: {
    flex: 1,
  },

  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  themeDescription: {
    fontSize: 14,
    marginTop: 4,
  },

  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,

    alignItems: 'center',

    marginTop: 24,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,

    alignItems: 'center',

    marginTop: 12,
  },

  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});