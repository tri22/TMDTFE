import { BottomNavigation } from '@/components/BottomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import { getOrderBySeller, updateStatus } from '../../../api/orderApi';


interface Order {
  id: number;
  email: string;
  phone: string;
  total: number;
  status: string;
  user: User;
  addressOrder: AddressOrder;
  cardOrder: CardOrder;
  productOrder: ProductOrder;
  voucherOrder: VoucherOrder;
}

interface User {
  id: number;
}

interface AddressOrder {
  address: string;
}

interface CardOrder {
  cardInfor: string;
}

interface ProductOrder {
  id: number;
  category: Category;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Category {
  title: string;
}

interface VoucherOrder {
  discount: number;
  description: string;
  title: string;
}

const statusTabs = [
  { label: 'TẤT CẢ', value: 'ALL' },
  { label: 'Chờ xử lý', value: 'PENDING' },
  { label: 'Đang vận chuyển', value: 'SHIPPING' },
  { label: 'Đã giao', value: 'COMPLETED' },
];

const getStatusLabel = (statusCode: string) => {
  const found = statusTabs.find(tab => tab.value === statusCode);
  return found ? found.label : statusCode;
};


const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUser(userData);
        const response = await getOrderBySeller(userData.id);
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi fetch orders:", error);
    }
  };


  const OrderItem = ({ item, onStatusChange }: { item: Order; onStatusChange: () => void }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleStatusChange = async (newStatus: string) => {
      closeMenu();
      try {
        const data = { status: newStatus };
        await updateStatus(item.id, data);
        onStatusChange();
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      }
    };

    //  Ẩn toàn bộ nút cập nhật nếu trạng thái là COMPLETED hoặc CANCELLED
    const isFinalStatus = item.status === 'COMPLETED' || item.status === 'CANCELLED';

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.productOrder.imageUrl }}
          style={styles.productImage}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.productOrder.name}</Text>
          <Text style={styles.tracking}>Tổng tiền: {item.total}đ</Text>
          <Text style={styles.delivery}>Địa chỉ: {item.addressOrder.address}</Text>
          <Text style={styles.status}>{getStatusLabel(item.status)}</Text>
        </View>

        {/* Ẩn toàn bộ button nếu đã hoàn tất hoặc đã hủy */}
        {!isFinalStatus && (
          <View style={styles.actions}>
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Button mode="contained" style={styles.button} onPress={openMenu}>
                  Cập nhật
                </Button>
              }
            >
              {/* Chỉ hiển thị các trạng thái KHÁC với trạng thái hiện tại */}
              {item.status !== 'SHIPPING' && (
                <Menu.Item onPress={() => handleStatusChange("SHIPPING")} title="Đang vận chuyển" />
              )}
              {item.status !== 'COMPLETED' && (
                <Menu.Item onPress={() => handleStatusChange("COMPLETED")} title="Đã giao" />
              )}
              {item.status !== 'CANCELLED' && (
                <Menu.Item onPress={() => handleStatusChange("CANCELLED")} title="Hủy" />
              )}
            </Menu>
          </View>
        )}
      </View>
    );
  };



  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}
      >
        <Text style={styles.title}>Cài đặt</Text>
        <Text style={styles.subtitle}>Đơn hàng đã bán</Text>

        {/* Danh sách đơn hàng */}
        {orders.map((item) => (
          <OrderItem key={item.id} item={item} onStatusChange={fetchOrders} />
        ))}

      </ScrollView>
      <BottomNavigation></BottomNavigation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 8,
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
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tracking: {
    fontSize: 12,
    color: '#323660',
    marginTop: 4,
  },
  delivery: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  status: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 4,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#323660',
  },
});

export default OrderManagement;
