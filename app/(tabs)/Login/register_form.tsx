import axiosInstance, { showToast } from '@/api/axiosInstance';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import InputField from './Components/InputField';
import LogoSection from './Components/LogoSection';
export default function RegisterForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pwd, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleTogglePassword = () => setShowPassword(!showPassword);
    const handleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleLogin = () => router.replace('/(tabs)/Login/login_form');

    const handleRegister = async () => {
        if (!email || !pwd || !phone || !confirmPwd) {
            showToast('error', 'Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        if (pwd !== confirmPwd) {
            showToast('error', 'Lỗi', 'Mật khẩu không khớp!');
            return;
        }

        try {
            await axiosInstance.post('/users/send-verification-code', { email }); // API mới
            showToast('success', 'Thành công', 'Mã xác nhận đã gửi đến email!');
            setIsModalVisible(true);
        } catch (error) {
            showToast('error', 'Lỗi', 'Lỗi gửi mã xác nhận. Thử lại!');
            console.error(error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            console.log(email);
            const { data } = await axiosInstance.post('/users/verify-code', { email, code: verificationCode });
            // console.log(code: verificationCode);
            console.log(data);
            if (data.success) {
                await axiosInstance.post('/users/register', { email, pwd, confirmPwd, phone });
                showToast('success', 'Thành công', 'Đăng ký thành công!');
                setIsModalVisible(false);
                router.replace('/(tabs)/Login/login_form');
            } else {
                showToast('error', 'Lỗi', 'Mã xác nhận không đúng!');
            }
        } catch (error) {
            showToast('error', 'Lỗi', 'Lỗi xác nhận. Thử lại!');
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setVerificationCode('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <LogoSection imageStyle={{ width: 300, height: 300 }} />
            <View style={styles.formWrapper}>
                <Text style={styles.title}>Tạo tài khoản</Text>
                <InputField placeholder="Email" value={email} onChangeText={setEmail} />
                <InputField
                    placeholder="Mật khẩu"
                    value={pwd}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    rightIcon={
                        <TouchableOpacity onPress={handleTogglePassword}>
                            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="gray" />
                        </TouchableOpacity>
                    }
                />
                <InputField
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPwd}
                    onChangeText={setConfirmPwd}
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={
                        <TouchableOpacity onPress={handleConfirmPassword}>
                            <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="gray" />
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
                    <Text style={styles.loginText} onPress={handleLogin}>Đã có tài khoản?</Text>
                    <Ionicons name="arrow-forward-circle" size={26} color="#323660" onPress={handleLogin} />
                </View>
            </View>

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Xác nhận mã</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nhập mã xác nhận"
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                            keyboardType="numeric"
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleVerifyCode}>
                                <Text style={styles.buttonText}>Xác nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Toast />
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#323660',
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#ff4444',
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});