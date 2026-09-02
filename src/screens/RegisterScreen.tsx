import React, { useState } from 'react';
<<<<<<< HEAD
import { StyleSheet, ScrollView, Alert, View, Text, TouchableOpacity } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { isRequired, isValidEmail, isMatch } from '../services/authService';
import { saveUser } from '../services/storageService';

export default function RegisterScreen({ navigation, isDark }: any) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!isRequired(name) || !isRequired(username) || !isRequired(email) || !isRequired(password)) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Informe um e-mail válido.');
      return;
    }
    if (!isMatch(password, confirmPassword)) {
      Alert.alert('Erro', 'As senhas não são iguais.');
      return;
    }

    const newUser = { 
      id: Date.now().toString(), 
      name, 
      username, 
      email, 
      password, 
      phone: '', 
      city: '', 
      bio: '' 
    };
    
    await saveUser(newUser);
    
    Alert.alert('Sucesso', 'Cadastro realizado! Faça seu login.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') }
    ]);
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
        
        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ 
            color: isDark ? '#4da3ff' : '#007bff', 
            fontWeight: 'bold', 
            fontSize: 16 
          }}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
