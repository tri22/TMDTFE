import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={28} color="#202020" style={styles.backButton} />
        <Text style={styles.title}>Quản lý đơn hàng</Text>
        <View style={styles.rightIcons}>
          <Feather name="search" size={24} color="#202020" />
          <AntDesign name="bells" size={24} color="#202020" />
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 13,
  },
  time: {
    fontSize: 14,
    fontFamily: 'Nunito Sans',
    fontWeight: '600',
    color: '#000000',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Lưu ý: gap có thể chưa hỗ trợ, dùng marginRight nếu cần
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 42,
    paddingHorizontal: 21,
  },
  backButton: {
    padding: 6,
  },
  title: {
    fontSize: 21,
    fontFamily: 'Raleway',
    fontWeight: '700',
    letterSpacing: -0.21,
    color: '#202020',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // dùng margin nếu gap không hoạt động
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 30,
    marginHorizontal: 20,
  },
});
