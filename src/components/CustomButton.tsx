import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  isDark?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, isDark, style, ...rest }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isDark ? styles.buttonDark : styles.buttonLight, style]}
      {...rest}
    >
      <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonLight: { backgroundColor: '#007bff' },
  buttonDark: { backgroundColor: '#4da3ff' },
  text: { fontSize: 16, fontWeight: 'bold' },
  textLight: { color: '#fff' },
  textDark: { color: '#121212' },
});