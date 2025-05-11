import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Header } from './Header';

const orders = [
  {
    id: '1',
    name: 'Mắt kính chanel',
    status: 'Đã đóng gói',
    tracking: '#9287f57',
    delivery: 'Giao Hàng tiêu chuẩn',
    action: 'Theo dõi',
  },
  {
    id: '2',
    name: 'Áo khoác Supreme',
    status: 'Đang vận chuyển',
    tracking: '#9287f57',
    delivery: 'Giao hàng tiêu chuẩn',
    action: 'Theo dõi',
  },
  {
    id: '3',
    name: 'Quần Jean Whose',
    status: 'Đã Nhận',
    tracking: '#9287f57',
    delivery: 'Giao hàng tiêu chuẩn',
    action: 'Đánh giá',
  },
];

const OrderManagement: React.FC = () => {
  const renderItem =({ item }: { item: typeof orders[0] }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.delivery}>{item.delivery}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.actions}>
        <Text style={styles.tracking}>{item.tracking}</Text>
        <Button mode="contained" style={styles.button}>
          {item.action}
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Quản lý đơn hàng" />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20, // Cách dưới 16 điểm (bạn có thể tăng lên 20-24 cho thoáng hơn)
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginLeft: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  delivery: {
    fontSize: 13,
    color: '#888',
  },
  status: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 4,
  },
  actions: {
    alignItems: 'flex-end',
  },
  tracking: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#4B4BFF',
  },
});
export default OrderManagement 