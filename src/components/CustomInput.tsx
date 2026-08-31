import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  isDark: boolean;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, isDark, error, ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isDark ? styles.textDark : styles.textLight]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isDark ? styles.inputDark : styles.inputLight,
          error ? styles.inputError : null
        ]}
        placeholderTextColor={isDark ? '#999' : '#666'}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: '100%' },
  label: { marginBottom: 8, fontSize: 16, fontWeight: 'bold' },
  textLight: { color: '#333' },
  textDark: { color: '#f5f5f5' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputLight: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#333',
  },
  inputDark: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#f5f5f5',
  },
  inputError: { borderColor: '#ff4444' },
  errorText: { color: '#ff4444', fontSize: 12, marginTop: 4 },
});