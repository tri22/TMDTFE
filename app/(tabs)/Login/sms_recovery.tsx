import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './Components/InputField';

export default function SmsRecoveryScreen() {
    const router = useRouter();
    const [code, setCode] = useState('');

    const handleExit = () => router.push('/(tabs)/MainLogin')
    const handleNewPass = () => router.push('/(tabs)/Login/new_pass_form')


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formWrapper}>
                <Text style={styles.titleHead}>Lấy lại mật khẩu</Text>
                <Text style={styles.describeText}>Nhập mã được gửi vào số điện thoại của ban</Text>
                <Text style={styles.phoneNums}>+84*******89</Text>
                <InputField
                    value={code}
                    onChangeText={setCode}
                    keyboardType="phone-pad"
                    containerStyle={styles.inputContainer}
                />
                <Text style={styles.resend}>Gửi lại mã</Text>
            </View>
            <TouchableOpacity style={styles.next} onPress={handleNewPass}>
                <Text style={styles.nextText}>Xác nhận</Text>
            </TouchableOpacity>
            <Text style={styles.exitText} onPress={handleExit}>Thoát</Text>
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
    formWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 220,
        marginVertical: 80,
    },
    titleHead: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        lineHeight: 30,
        textAlign: 'center',
    },
    describeText: {
        fontSize: 19,
        marginBottom: 20,
        textAlign: 'center',
    },
    phoneNums: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        lineHeight: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '40%',
    },
    resend: {
        color: '#4472c4',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    next: {
        width: '90%',
        backgroundColor: '#323660',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 100,
    },
    nextText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '300',
    },
    exitText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
        textDecorationLine: 'underline',
    },
});