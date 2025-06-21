import { authApi } from '@/api/authApi';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './Components/InputField';
import RadioOption from './Components/RadioOption';

const recoveryMethods = [
    {
        key: 'sms',
        label: 'SMS',
        route: '/(tabs)/Login/sms_recovery',
        colors: { bg: '#e5ebfc', circle: '#004cff' },
    },
    {
        key: 'email',
        label: 'Email',
        route: '/(tabs)/Login/email_recovery',
        colors: { bg: '#ffebeb', circle: '#ff0000' },
    },
];

export default function PassRecoveryScreen() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [contact, setContact] = useState(''); // Lưu email hoặc số điện thoại
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Chuyển hướng đến trang Email hoặc SMS Recovery
    const handleRecovery = async () => {
        if (!selectedMethod || !contact) {
            setShowModal(true);
            return;
        }
        if (selectedMethod === 'email' && !validateEmail(contact)) {
            Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ.');
            return;
        }

        if (selectedMethod === 'email') {
            try {
                // Gửi yêu cầu gửi mã xác nhận
                await authApi.forgotPassword({ email: contact });
                // Nếu thành công, chuyển sang EmailRecovery
                router.push({ pathname: '/(tabs)/Login/email_recovery', params: { contact } });
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể gửi mã xác nhận. Vui lòng kiểm tra email và thử lại.');
            }
        } else {
            // Xử lý SMS nếu cần (giả định tạm thời chuyển thẳng)
            router.push({ pathname: '/(tabs)/Login/email_recovery', params: { contact } });
        }
    };

    // Chuyển hướng đến trang main Login
    const handleExit = () => router.push('/(tabs)/MainLogin');

    // Nội dung đã sửa
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formWrapper}>
                <Text style={styles.titleHead}>Lấy lại mật khẩu</Text>
                <Text style={styles.describeText}>Chọn phương thức để lấy lại mật khẩu</Text>

                <View style={styles.methodWrapper}>
                    {recoveryMethods.map((method) => (
                        <RadioOption
                            key={method.key}
                            method={method}
                            selected={selectedMethod}
                            onSelect={setSelectedMethod}
                        />
                    ))}
                </View>
                {(selectedMethod === 'email' || selectedMethod === 'sms') && (
                    <InputField
                        value={contact}
                        onChangeText={setContact}
                        placeholder={selectedMethod === 'email' ? 'Nhập email' : 'Nhập số điện thoại'}
                        keyboardType={selectedMethod === 'email' ? 'email-address' : 'phone-pad'}
                        containerStyle={styles.inputContainer}
                    />
                )}
            </View>

            <TouchableOpacity style={styles.next} onPress={handleRecovery}>
                <Text style={styles.nextText}>Tiếp</Text>
            </TouchableOpacity>

            <Text style={styles.exitText} onPress={handleExit}>Thoát</Text>

            {/* Modal cảnh báo */}
            <Modal transparent visible={showModal} animationType="fade" onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Vui lòng {selectedMethod ? 'nhập email hoặc số điện thoại' : 'chọn phương thức'} để lấy lại mật khẩu!
                        </Text>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    inputContainer: {
        marginBottom: 20
    },
    methodWrapper: {
        marginTop: 50,
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
        marginBottom: 50,
        color: '#666',
        textDecorationLine: 'underline',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#323660',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
