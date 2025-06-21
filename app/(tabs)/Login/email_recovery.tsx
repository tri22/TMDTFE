import { authApi } from '@/api/authApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './Components/InputField';

export default function EmailRecovery() {
    const router = useRouter();
    const { contact } = useLocalSearchParams();
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(30);
    const [isCodeValid, setIsCodeValid] = useState(true);

    // Định dạng email với dấu ***
    const formatEmail = (email: string) => {
        const [localPart, domain] = email.split('@');
        return `${localPart.slice(0, 3)}******@${domain}`;
    };

    // Gửi yêu cầu gửi lại mã
    const handleResendCode = async () => {
        try {
            await authApi.resendCode({ email: contact });
            setTimer(60);
            setIsCodeValid(true);
            Alert.alert('Thành công', 'Mã mới đã được gửi!');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể gửi lại mã. Vui lòng thử lại.');
        }
    };

    // Kiểm tra mã xác nhận
    const handleVerifyCode = async () => {
        try {
            const response = await authApi.verifyCode({ email: contact, code });

            if (response.data.success) {
                // Chuyến đến trang NewPassForm
                router.push({ pathname: '/(tabs)/Login/new_pass_form', params: { email: contact } });
            } else {
                Alert.alert('Lỗi', 'Mã xác nhận không đúng.');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể xác minh mã. Vui lòng thử lại.');
        }
    };

    // Bộ đếm thời gian
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsCodeValid(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);
    // Thoát ra trang MainLogin
    const handleExit = () => router.push('/(tabs)/MainLogin')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formWrapper}>
                <Text style={styles.titleHead}>Lấy lại mật khẩu</Text>
                <Text style={styles.describeText}>Nhập mã được gửi vào email của ban</Text>
                {/* <Text style={styles.email}>thai*******.com</Text> */}
                <Text style={styles.email}>{formatEmail(contact as string)}</Text>
                <InputField
                    value={code}
                    onChangeText={setCode}
                    keyboardType="phone-pad"
                    containerStyle={styles.inputContainer}
                    placeholder="Nhập mã"
                />
                <Text style={styles.timerText}>Mã hết hạn sau: {timer}s</Text>
                <TouchableOpacity onPress={handleResendCode} disabled={isCodeValid}>
                    <Text style={[styles.resend, !isCodeValid && styles.resendActive]}>Gửi lại mã</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.next} onPress={handleVerifyCode}>
                <Text style={styles.nextText}>Xác nhận</Text>
            </TouchableOpacity>
            <Text style={styles.exitText} onPress={handleExit}>Thoát</Text>
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
    formWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 220,
        marginVertical: 80,
    },
    timerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    resend: {
        fontSize: 16,
        color: '#007bff',
        opacity: 0.5
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
    email: {
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
    resendActive: {
        opacity: 1
    },
});