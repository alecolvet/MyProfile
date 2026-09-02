<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ProfileCard } from '../components/ProfileCard';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { CustomButton } from '../components/CustomButton';
import { Loading } from '../components/Loading';
import { getUser, clearSession } from '../services/storageService';
import { User } from '../types/user';

export default function ProfileScreen({ navigation, isDark, setIsDark, onLogout }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados reais sempre que a tela ganha foco (caso volte da edição)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    
    const unsubscribe = navigation.addListener('focus', fetchUser);
    fetchUser();
    
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    await clearSession();
    onLogout(); // Retorna para a tela de Login
  };

  if (loading || !user) return <Loading isDark={isDark} />;

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <View style={styles.content}>
        
        <ThemeSwitch isDark={isDark} onToggle={setIsDark} />

        <View style={styles.cardWrapper}>
          <ProfileCard data={user} isDark={isDark} />
        </View>

        <CustomButton 
          title="Editar Perfil" 
          isDark={isDark} 
          onPress={() => navigation.navigate('EditProfile')} 
        />

        <CustomButton 
          title="Sair" 
          isDark={isDark} 
          onPress={handleLogout} 
          style={styles.logoutBtn}
        />
        
      </View>
