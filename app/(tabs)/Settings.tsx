import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SettingsSection } from './Setting/SettingsSection';
import { SettingsItem } from './Setting/SettingsItem';
import { BottomNavigation } from '../../components/BottomNavigation';
const Settings = () => {
  const router = useRouter();

const personalInfo = [
  { label: 'Tài khoản', route: '' },
  { label: 'Địa chỉ', route: '/(tabs)/Setting/AddressSettings' },
  { label: 'Phương thức thanh toán', route: '' },
] as { label: string; route: string }[];

const appSettings = [
  { label: 'Sản phẩm yêu thích', route: '' },
  { label: 'Lịch sử giao dịch', route: '/(tabs)/Setting/MyActivity' },
  { label: 'Hỗ trợ khách hàng', route: '' },
  { label: 'Thông tin ứng dụng', route: '' },
] as { label: string; route: string }[];

  const handleItemPress = (route: string) => {
    router.push(route as any);
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
          <SettingsItem label="Đăng xuất" isRed />
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
