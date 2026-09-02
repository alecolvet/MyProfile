import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';

interface CustomInputProps
  extends TextInputProps {
  label: string;
  isDark?: boolean;
  error?: string;
}

export function CustomInput({
  label,
  error,
  isDark,
  style,
  placeholderTextColor,
  ...rest
}: CustomInputProps) {
  const {
    theme,
    isDark: currentIsDark,
  } = useTheme();

  const resolvedIsDark =
    isDark ?? currentIsDark;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {label}
      </Text>

      <TextInput
        {...rest}
        style={[
          styles.input,
          {
            backgroundColor:
              theme.colors.input,

            borderColor: error
              ? theme.colors.error
              : theme.colors.inputBorder,

            color: theme.colors.text,
          },
          style,
        ]}
        placeholderTextColor={
          placeholderTextColor ??
          theme.colors.placeholder
        }
        keyboardAppearance={
          resolvedIsDark
            ? 'dark'
            : 'light'
        }
      />

      {error ? (
        <Text
          style={[
            styles.errorText,
            {
              color:
                theme.colors.error,
            },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});