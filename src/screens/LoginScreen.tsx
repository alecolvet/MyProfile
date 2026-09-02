import React, { useState } from 'react';
<<<<<<< HEAD
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native'; // <-- Adicionado aqui!
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { getUser, saveSession } from '../services/storageService';

export default function LoginScreen({ navigation, isDark, onLoginSuccess }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const savedUser = await getUser();
    
    if (savedUser && savedUser.username === username && savedUser.password === password) {
      await saveSession(username);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigation.navigate('Profile');
      }
    } else {
      Alert.alert('Erro', 'Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <View style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <CustomInput 
        label="Nome de usuário" 
        isDark={isDark} 
        value={username} 
        onChangeText={setUsername} 
        autoCapitalize="none" 
      />
      <CustomInput 
        label="Senha" 
        isDark={isDark} 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      
      <CustomButton 
        title="Entrar" 
        isDark={isDark} 
        onPress={handleLogin} 
        style={styles.buttonSpacing} 
      />
      
      <View style={styles.footer}>
        <Text style={{ color: isDark ? '#ccc' : '#666' }}>Ainda não tem cadastro?</Text>
        
        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ 
            color: isDark ? '#4da3ff' : '#007bff', 
            fontWeight: 'bold', 
            fontSize: 16 
          }}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>