import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, View, Text, TouchableOpacity } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/useAuth';

export default function RegisterScreen({ navigation, isDark }: any) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      await signUp({ name, username, email, password, confirmPassword });
      // Ao terminar o cadastro, o useAuth já loga o usuário automaticamente!
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível concluir o cadastro.');
    }
  };

  return (
    <ScrollView style={[styles.container, isDark ? styles.bgDark : styles.bgLight]} contentContainerStyle={styles.content}>
      <CustomInput label="Nome" isDark={isDark} value={name} onChangeText={setName} />
      <CustomInput label="Nome de usuário" isDark={isDark} value={username} onChangeText={setUsername} autoCapitalize="none" />
      <CustomInput label="E-mail" isDark={isDark} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <CustomInput label="Senha" isDark={isDark} value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput label="Confirmação de senha" isDark={isDark} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      
      <CustomButton title="Cadastrar" isDark={isDark} onPress={handleRegister} style={styles.buttonSpacing} />
      
      <View style={styles.footer}>
        <Text style={{ color: isDark ? '#ccc' : '#666' }}>Já tem cadastro?</Text>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: isDark ? '#4da3ff' : '#007bff', fontWeight: 'bold', fontSize: 16 }}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  bgLight: { backgroundColor: '#f5f5f5' },
  bgDark: { backgroundColor: '#121212' },
  buttonSpacing: { marginTop: 16 },
  footer: { marginTop: 24, alignItems: 'center' },
  linkButton: { marginTop: 8, padding: 8 }
});