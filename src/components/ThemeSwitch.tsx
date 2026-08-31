import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: (value: boolean) => void;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDark, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isDark ? styles.textDark : styles.textLight]}>Light ☀️</Text>
      <Switch
        value={isDark}
        onValueChange={onToggle}
        trackColor={{ false: '#ccc', true: '#555' }}
        thumbColor={isDark ? '#4da3ff' : '#007bff'}
      />
      <Text style={[styles.label, isDark ? styles.textDark : styles.textLight]}>🌙 Dark</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 16,
  },
  label: { fontSize: 16, fontWeight: 'bold' },
  textLight: { color: '#333' },
  textDark: { color: '#f5f5f5' },
});