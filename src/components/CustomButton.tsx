import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';

interface CustomButtonProps
  extends TouchableOpacityProps {
  title: string;
  isDark?: boolean;
  loading?: boolean;
}

export function CustomButton({
  title,
  isDark: _isDark,
  loading = false,
  disabled,
  style,
  ...rest
}: CustomButtonProps) {
  const { theme } = useTheme();

  const isDisabled =
    disabled || loading;

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor:
            theme.colors.primary,
        },
        isDisabled &&
          styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            theme.colors.onPrimary
          }
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color:
                theme.colors.onPrimary,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },
});