import { authApi } from '@/api/authApi';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './Components/InputField';

export default function NewPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { email } = useLocalSearchParams();

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    // const handleSave = () => router.replace('/(tabs)/Login/login_form');
    const handleSave = async () => {
        if (password.length < 8) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }
        try {
            await authApi.resetPassword({ email, password });
            Alert.alert('Thành công', 'Mật khẩu đã được cập nhật!');
            router.replace('/(tabs)/Login/login_form');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật mật khẩu. Vui lòng thử lại.');
        }
    };
    const handleExit = () => router.replace('/(tabs)/MainLogin');
    const eyeIcon = (
        <TouchableOpacity onPress={togglePasswordVisibility}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="gray" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.title}>Tạo mật khẩu mới</Text>
            </View>

            <View style={styles.inputWrapper}>
                <InputField
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword}
                    rightIcon={eyeIcon}
                />
                <InputField
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={!showPassword}
                    rightIcon={eyeIcon}
                />
            </View>

            <View style={styles.actionWrapper}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>Lưu</Text>
                </TouchableOpacity>
                <Text style={styles.exitText} onPress={handleExit}>Thoát</Text>
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
    headerWrapper: {
        width: '100%',
        marginTop: 130,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
    },
    inputWrapper: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    saveButton: {
        width: '60%',
        borderRadius: 16,
        backgroundColor: '#323660',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
    },
    saveText: {
        fontSize: 22,
        fontWeight: '300',
        color: '#f3f3f3',
    },
    exitText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
        textDecorationLine: 'underline',
    },
});
