import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const { colors } = useTheme();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setErrorMsg('');
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Preencha usuário e senha para continuar.');
      return;
    }

    try {
      setLoading(true);
      await signIn(username, password);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Erro inesperado ao autenticar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.primary }]}>TaskFlow App</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Gerencie suas tarefas pessoais com eficiência
        </Text>

        {errorMsg ? (
          <View style={[styles.errorBox, { backgroundColor: '#FEE2E2' }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>{errorMsg}</Text>
          </View>
        ) : null}

        <Text style={[styles.label, { color: colors.text }]}>Usuário</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Ex: admin ou user"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          accessibilityLabel="Campo de usuário"
        />

        <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Digite sua senha (123)"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Campo de senha"
        />

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.primary, opacity: pressed || loading ? 0.7 : 1 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Entrar no aplicativo"
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </Pressable>

        <View style={styles.CredentialsHint}>
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            Credenciais de teste: admin / 123 ou user / 123
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { padding: 24, borderRadius: 16, borderWidth: 1 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', marginTop: 4, marginBottom: 20 },
  errorBox: { padding: 12, borderRadius: 8, marginBottom: 16 },
  errorText: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 15 },
  button: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  CredentialsHint: { marginTop: 18, alignItems: 'center' },
  hintText: { fontSize: 12 },
});