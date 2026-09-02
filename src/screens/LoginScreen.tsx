import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen({ navigation, isDark }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn({ username, password });
      // Removemos o navigation.navigate! O RootNavigator vai trocar a tela sozinho.
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <View style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <CustomInput label="Nome de usuário ou E-mail" isDark={isDark} value={username} onChangeText={setUsername} autoCapitalize="none" />
      <CustomInput label="Senha" isDark={isDark} value={password} onChangeText={setPassword} secureTextEntry />
      
      <CustomButton title="Entrar" isDark={isDark} onPress={handleLogin} style={styles.buttonSpacing} />
      
      <View style={styles.footer}>
        <Text style={{ color: isDark ? '#ccc' : '#666' }}>Ainda não tem cadastro?</Text>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: isDark ? '#4da3ff' : '#007bff', fontWeight: 'bold', fontSize: 16 }}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  bgLight: { backgroundColor: '#f5f5f5' },
  bgDark: { backgroundColor: '#121212' },
  buttonSpacing: { marginTop: 16 },
  footer: { marginTop: 24, alignItems: 'center' },
  linkButton: { marginTop: 8, padding: 8 }
});