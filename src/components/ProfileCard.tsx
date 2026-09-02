import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileData {
  name: string;
  username: string;
  email: string;
  phone?: string;
  city?: string;
  bio?: string;
}

interface ProfileCardProps {
  data: ProfileData;
  isDark?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ data, isDark = false }) => {
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      <Text style={[styles.title, isDark ? styles.textDark : styles.textLight]}>{data.name}</Text>
      <Text style={isDark ? styles.textMutedDark : styles.textMutedLight}>@{data.username}</Text>

      <View style={styles.infoContainer}>
        <Text style={[styles.info, isDark ? styles.textDark : styles.textLight]}>E-mail: {data.email}</Text>
        
        {/* CORREÇÃO: Usando ternário para evitar o crash de string vazia */}
        {data.phone ? (
          <Text style={[styles.info, isDark ? styles.textDark : styles.textLight]}>Telefone: {data.phone}</Text>
        ) : null}
        
        {data.city ? (
          <Text style={[styles.info, isDark ? styles.textDark : styles.textLight]}>Cidade: {data.city}</Text>
        ) : null}
      </View>

      {/* CORREÇÃO: Usando ternário para a biografia também */}
      {data.bio ? (
        <View style={styles.bioContainer}>
          <Text style={[styles.bioTitle, isDark ? styles.textDark : styles.textLight]}>Biografia:</Text>
          <Text style={[styles.bioText, isDark ? styles.textDark : styles.textLight]}>{data.bio}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLight: { backgroundColor: '#fff' },
  cardDark: { backgroundColor: '#2a2a2a' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  infoContainer: { marginTop: 16 },
  info: { fontSize: 16, marginBottom: 8 },
  bioContainer: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#ccc' },
  bioTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  bioText: { fontSize: 14, lineHeight: 20 },
  textLight: { color: '#333' },
  textDark: { color: '#f5f5f5' },
  textMutedLight: { color: '#666' },
  textMutedDark: { color: '#aaa' },
});