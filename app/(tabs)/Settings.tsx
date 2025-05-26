import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../../components/BottomNavigation';
import { SettingsItem } from './Setting/SettingsItem';
import { SettingsSection } from './Setting/SettingsSection';
const Settings = () => {
    const router = useRouter();

    const personalInfo = [
        { label: 'Tài khoản', route: '/(tabs)/Setting/ProfileSetting' },
        { label: 'Địa chỉ', route: '/(tabs)/Setting/AddressSettings' },
        { label: 'Phương thức thanh toán', route: '/(tabs)/Setting/PaymentSetting' },
    ] as { label: string; route: string }[];

    const appSettings = [
        { label: 'Quản lý đơn hàng', route: '/(tabs)/Setting/OrderManagement' },
        { label: 'Lịch sử giao dịch', route: '/(tabs)/Setting/MyActivity' },
        { label: 'Hỗ trợ khách hàng', route: '' },
        { label: 'Thông tin ứng dụng', route: '/(tabs)/Setting/About' },
    ] as { label: string; route: string }[];

    const handleItemPress = (route: string) => {
        router.push(route as any);
    };

    const handleLogin = () => router.replace('/(tabs)/MainLogin')

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
                    <SettingsItem label="Đăng xuất" isRed onPress={handleLogin} />
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
