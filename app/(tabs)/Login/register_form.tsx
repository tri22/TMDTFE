import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './Components/InputField';
import LogoSection from './Components/LogoSection';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => setShowPassword(prev => !prev);
    const handleRegister = () => router.replace('/Login/account_auth');
    const handleLogin = () => router.replace('/Login/login_form');

    return (
        <SafeAreaView style={styles.container}>
            <LogoSection imageStyle={{ width: 300, height: 300 }} />

            <View style={styles.formWrapper}>
                <Text style={styles.title}>Tạo tài khoản</Text>

                <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                <InputField
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    rightIcon={
                        <TouchableOpacity onPress={handleTogglePassword}>
                            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="gray" />
                        </TouchableOpacity>
                    }
                />

                <InputField
                    placeholder="Số điện thoại"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Đăng ký</Text>
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.loginText} onPress={handleLogin}>
                        Bạn đã có tài khoản?
                    </Text>
                    <Ionicons
                        name="arrow-forward-circle"
                        size={26}
                        color="#323660"
                        onPress={handleLogin}
                        style={styles.icon}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    formWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#323660',
    },
    input: {
        width: '90%',
        height: 55,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#323660',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#f3f3f3',
        fontSize: 22,
        letterSpacing: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    loginText: {
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginLeft: 8,
    },
});