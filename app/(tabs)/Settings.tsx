import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { BottomNavigation } from '../../components/BottomNavigation';
import { SettingsItem } from './Setting/SettingsItem';
import { SettingsSection } from './Setting/SettingsSection';
const Settings = () => {
    const router = useRouter();

    const personalInfo = [
        { label: 'Tài khoản', route: '/(tabs)/Profile' },
        { label: 'Địa chỉ', route: '/(tabs)/Setting/AddressSettings' },
        { label: 'Phương thức thanh toán', route: '/(tabs)/Setting/PaymentSetting' },
    ] as { label: string; route: string }[];

    const appSettings = [
        { label: 'Quản lý đơn hàng', route: '/(tabs)/Setting/OrderManagement' },
        { label: 'Lịch sử mua hàng', route: '/(tabs)/Setting/MyActivity' },
        { label: 'Hỗ trợ khách hàng', route: '' },
        { label: 'Thông tin ứng dụng', route: '/(tabs)/Setting/About' },
    ] as { label: string; route: string }[];

    const handleItemPress = (route: string) => {
        router.push(route as any);
    };

    const handleLogout = async () => {
        try {
            // Xóa thông tin user khỏi AsyncStorage
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            console.log('Đã xóa thông tin user, đăng xuất thành công');

            // Hiển thị thông báo đăng xuất thành công
            Toast.show({
                type: 'success',
                text1: 'Đăng xuất thành công',
                text2: 'Bạn đã đăng xuất khỏi hệ thống',
                position: 'top',
                visibilityTime: 2000,
            });

            // Chuyển hướng về trang Login
            router.replace('/(tabs)/MainLogin');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
            Toast.show({
                type: 'error',
                text1: 'Lỗi đăng xuất',
                text2: 'Đã có lỗi xảy ra, vui lòng thử lại',
                position: 'top',
                visibilityTime: 2000,
            });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Cài đặt</Text>

                <SettingsSection
                    title="Thông tin cá nhân"
                    items={personalInfo}
                    onItemPress={handleItemPress}
                />

                <SettingsSection
                    title="Ứng dụng"
                    items={appSettings}
                    onItemPress={handleItemPress}
                />

                <View style={styles.logoutSection}>
                    <SettingsItem label="Đăng xuất" isRed onPress={handleLogout} />
                </View>
            </ScrollView>
            <BottomNavigation></BottomNavigation>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 60,
        paddingHorizontal: 20,
        color: '#1f2937',
    },
    logoutSection: {
        padding: 20,
    },
});
