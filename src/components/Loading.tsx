import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';

interface LoadingProps {
  isDark?: boolean;
  message?: string;
}

export function Loading({
  message = 'Carregando...',
}: LoadingProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.colors.background,
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
      />

      <Text
        style={[
          styles.text,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  text: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});