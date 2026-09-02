import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ProfileCard } from '../components/ProfileCard';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { CustomButton } from '../components/CustomButton';
import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';

export default function ProfileScreen({ navigation, isDark, setIsDark }: any) {
  // Pegamos o usuário logado e a função de Sair direto do contexto
  const { user, signOut, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(); // Isso avisa o App.tsx que a sessão acabou, mandando para o Login
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  bgLight: { backgroundColor: '#f5f5f5' },
  bgDark: { backgroundColor: '#121212' },
  cardWrapper: { width: '100%', marginVertical: 24 },
  logoutBtn: { marginTop: 16, backgroundColor: '#dc3545' }
});