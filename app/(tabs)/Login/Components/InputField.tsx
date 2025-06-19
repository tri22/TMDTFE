import React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';

type InputFieldProps = {
    containerStyle?: StyleProp<ViewStyle>
    inputStyle?: StyleProp<TextStyle>;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    rightIcon?: React.ReactNode;
};

export default function InputField({
    inputStyle,
    containerStyle,
    placeholder = '',
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType,
    rightIcon,
}: InputFieldProps) {
    return (
        <View style={[styles.inputContainer, containerStyle]}>
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
            />
            {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    input: {
        flex: 1,
    },
    iconWrapper: {
        paddingLeft: 10,
    },
})