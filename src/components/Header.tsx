import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const Header: React.FC = () => {
  const { user, treatment, logout } = useAuth();
  const { colors } = useTheme();

  if (!user) return null;

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Deseja realmente encerrar sua sessão?');
      if (confirmed) {
        logout();
      }
      return;
    }

    Alert.alert('Sair da conta', 'Deseja realmente encerrar sua sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const displayName = treatment ? `${treatment} ${user.name}` : user.name;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View>
        <Text style={[styles.name, { color: colors.text }]}>{displayName}</Text>
        <Text style={[styles.role, { color: colors.primary }]}>
          Perfil: {user.role === 'admin' ? 'Administrador' : 'Usuário Comum'}
        </Text>
      </View>

      <Pressable
        onPress={handleLogout}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={({ pressed }) => [styles.logoutBtn, { opacity: pressed ? 0.6 : 1 }]}
        accessibilityRole="button"
        accessibilityLabel="Sair do aplicativo"
        accessibilityHint="Encerra a sessão atual e retorna para a tela de login"
      >
        <Ionicons name="log-out-outline" size={24} color={colors.error} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  name: { fontSize: 16, fontWeight: '700' },
  role: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  logoutBtn: { padding: 8 },
});