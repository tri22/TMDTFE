import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './Components/InputField';
import LogoSection from './Components/LogoSection';

export default function AccountAuthScreen() {
    const [verificationCode, setVerificationCode] = useState('');

    const navigateToLogin = () => router.replace('/Login/login_form');
    const navigateToHome = () => router.replace('/(tabs)/MainLogin'); // Sửa đường dẫn

    return (
        <SafeAreaView style={styles.container}>
            <LogoSection imageStyle={styles.logo} />

            <View style={styles.formSection}>
                <Text style={styles.title}>Xác thực tài khoản</Text>
                <Text style={styles.instructions}>
                    Nhập mã xác thực được gửi vào số điện thoại của bạn
                </Text>
                <Text style={styles.phoneNumber}>+84*******89</Text>

                <InputField
                    containerStyle={styles.inputContainerOverride}
                    inputStyle={styles.inputStyle}
                    keyboardType="phone-pad"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
            </View>

            <View style={styles.formSection}>
                <Text style={styles.resendCode}>Gửi lại mã</Text>

                <TouchableOpacity style={styles.confirmButton} onPress={navigateToLogin}>
                    <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>

                <Text style={styles.exitLink} onPress={navigateToHome}>
                    Thoát
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    formSection: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#323660',
        marginBottom: 10,
    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 10,
        width: '90%',
    },
    phoneNumber: {
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },
    inputContainerOverride: {
        width: '40%',
        height: 45,
        backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40,
        paddingHorizontal: 12,
        marginBottom: 95,
    },
    inputStyle: {
        flex: 1,
    },
    resendCode: {
        color: '#4472c4',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
        textDecorationLine: 'underline',
    },
    confirmButton: {
        backgroundColor: '#323660',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '50%',
        marginTop: 10,
        marginBottom: 10,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 1,
    },
    exitLink: {
        fontSize: 16,
        color: '#333',
        textDecorationLine: 'underline',
    },
});
