// RegisterTextInput.tsx
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

type EditProfileTextInputProps = {
    Text_Label : string;
    label: string;
    value: string;
    onChangeText: (label: string, value: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    returnKeyType?: 'done' | 'next' | 'go';
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
    styles?: {}
};

const {height,width} = Dimensions.get('window');

const EditProfileTextInput: React.FC<EditProfileTextInputProps> = ({
    Text_Label,
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
        <View style={current_styles.container}>
            <Text style= {current_styles.label}>{Text_Label}</Text>
            <TextInput
                style={current_styles.input}
                value={value}
                onChangeText={(value) => onChangeText(label, value)}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                returnKeyType={returnKeyType}
                keyboardType= {keyboardType}
                placeholderTextColor={'#f8ecea'}
            />
        </View>
    );
};

const current_styles = StyleSheet.create({
    container: {
        marginVertical: 0,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#464651',
    },
    input: {
        
        color: '#f8ecea',
        height: 50,
        width: width-40,
        padding: 10,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderBottomColor: '#292935',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
    },
});

export { EditProfileTextInput };
