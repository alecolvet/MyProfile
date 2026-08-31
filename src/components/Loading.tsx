import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
  isDark: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isDark }) => {
  return (
    <View style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <ActivityIndicator size="large" color={isDark ? '#4da3ff' : '#007bff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgLight: { backgroundColor: '#f5f5f5' },
  bgDark: { backgroundColor: '#121212' },
});