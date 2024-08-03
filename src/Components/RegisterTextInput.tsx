// RegisterTextInput.tsx
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type RegisterTextInputProps = {
  label: string;
  value: string;
  onChangeText: (label: string, value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  returnKeyType?: 'done' | 'next' | 'go';
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  styles?: {}
};

const RegisterTextInput: React.FC<RegisterTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  returnKeyType = 'next',
  styles = {},
  keyboardType = 'default'
}) => {
  return (
      <TextInput
        style={styles}
        value={value}
        onChangeText={(value) => onChangeText(label, value)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        keyboardType= {keyboardType}
      />
  );
};

const current_styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#f8ecea',
  },
  input: {
    height: 30,
    width: 100,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export { RegisterTextInput };
