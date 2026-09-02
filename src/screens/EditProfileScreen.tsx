import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { Loading } from '../components/Loading';
import { isRequired, isValidEmail } from '../services/authService';
import { getUser, saveUser } from '../services/storageService';
import { User } from '../types/user';

export default function EditProfileScreen({ navigation, isDark }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUser();
      if (userData) setUser(userData);
      setIsLoading(false);
    };
    loadUser();
  }, []);

  // Regra de Imutabilidade aplicada no estado
  const handleUpdateField = (field: keyof User, value: string) => {
    setUser((prevUser) => prevUser ? { ...prevUser, [field]: value } : null);
  };

  const handleSave = async () => {
    if (!user) return;

    if (!isRequired(user.name) || !isRequired(user.email)) {
      Alert.alert('Erro', 'Nome e E-mail são obrigatórios.');
      return;
    }

    if (!isValidEmail(user.email)) {
      Alert.alert('Erro', 'Informe um e-mail válido.');
      return;
    }

    setIsLoading(true);
    await saveUser(user); // Persiste a edição no AsyncStorage
    setIsLoading(false);
    
    Alert.alert('Sucesso', 'Seus dados foram atualizados!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  if (isLoading || !user) return <Loading isDark={isDark} />;

  return (
    <KeyboardAvoidingView 
      style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <CustomInput label="Nome (Obrigatório)" isDark={isDark} value={user.name} onChangeText={(text) => handleUpdateField('name', text)} />
        <CustomInput label="E-mail (Obrigatório)" isDark={isDark} value={user.email} onChangeText={(text) => handleUpdateField('email', text)} keyboardType="email-address" autoCapitalize="none" />
        <CustomInput label="Telefone" isDark={isDark} value={user.phone} onChangeText={(text) => handleUpdateField('phone', text)} />
        <CustomInput label="Cidade" isDark={isDark} value={user.city} onChangeText={(text) => handleUpdateField('city', text)} />
        
        <CustomInput 
          label="Biografia" 
          isDark={isDark} 
          value={user.bio} 
          onChangeText={(text) => handleUpdateField('bio', text)} 
          multiline 
          numberOfLines={4} 
        />

        <CustomButton title="Salvar alterações" isDark={isDark} onPress={handleSave} style={styles.buttonSpacing} />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  bgLight: { backgroundColor: '#f5f5f5' },
  bgDark: { backgroundColor: '#121212' },
  buttonSpacing: { marginTop: 24 },
});