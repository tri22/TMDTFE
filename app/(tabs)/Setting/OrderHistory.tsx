import { BottomNavigation } from '@/components/BottomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getBoughtOrders } from '../../../api/orderApi';

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

const OrderHistory: React.FC = () => {
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
                const response = await getBoughtOrders(userData.id);
                setOrders(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi fetch orders:", error);
        }
    };

    const filteredOrders =
        selectedStatus === 'ALL'
            ? orders
            : orders.filter((order) => order.status === selectedStatus);

    const renderItem = ({ item }: { item: Order }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.productOrder.imageUrl }}
                style={styles.productImage}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.productOrder.name}</Text>
                <Text style={styles.tracking}>Tổng tiền: {item.total}đ</Text>
                <Text style={styles.delivery}>Địa chỉ: {item.addressOrder.address}</Text>
                <Text style={styles.status}>
                    {getStatusLabel(item.status)}
                </Text>
            </View>
            <View style={styles.actions}>
                <Button mode="contained" style={styles.button}>
                    Chi tiết
                </Button>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}
            >
                <Text style={styles.title}>Hoạt động</Text>
                <Text style={styles.subtitle}>Đơn hàng đã mua</Text>

                {/* Tabs lọc */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                    {statusTabs.map((tab) => (
                        <Button
                            key={tab.value}
                            mode={selectedStatus === tab.value ? 'contained' : 'outlined'}
                            onPress={() => setSelectedStatus(tab.value)}
                            style={{
                                marginRight: 10,
                                borderRadius: 20,
                                backgroundColor: selectedStatus === tab.value ? '#323660' : '#fff',
                                borderWidth: 1,
                                borderColor: '#323660',
                            }}
                            labelStyle={{
                                color: selectedStatus === tab.value ? '#fff' : '#323660',
                                fontSize: 14,
                            }}
                        >
                            {tab.label}
                        </Button>

                    ))}
                </ScrollView>

                {/* Danh sách đơn hàng */}
                {filteredOrders.map((item) => (
                    <View key={item.id}>{renderItem({ item })}</View>
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

export default OrderHistory;
