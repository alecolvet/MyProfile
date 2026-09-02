import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: (value: boolean) => void;
}

export function ThemeSwitch({
  isDark,
  onToggle,
}: ThemeSwitchProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: isDark
              ? theme.colors.textMuted
              : theme.colors.primary,
          },
        ]}
      >
        Light
      </Text>

      <Switch
        value={isDark}
        onValueChange={onToggle}
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primary,
        }}
        thumbColor={
          theme.colors.card
        }
        ios_backgroundColor={
          theme.colors.border
        }
      />

      <Text
        style={[
          styles.label,
          {
            color: isDark
              ? theme.colors.primary
              : theme.colors.textMuted,
          },
        ]}
      >
        Dark
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});