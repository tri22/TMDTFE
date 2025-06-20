import userApi from '@/api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getBoughtOrders } from '../../../api/orderApi';
import { BottomNavigation } from '../../../components/BottomNavigation';
interface SpendingItem {
    label: string;
    value: number;
}

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

const countOrderStatuses = (orders: Order[]) => {
    const statusCount: Record<string, number> = {};

    for (const order of orders) {
        const status = order.status;
        statusCount[status] = (statusCount[status] || 0) + 1;
    }

    return defaultStatuses.map(({ key, label }) => ({
        label,
        value: statusCount[key] || 0,
    }));
};

const defaultStatuses = [
    { key: "PENDING", label: "Chờ xác nhận" },
    { key: "SHIPPING", label: "Đang vận chuyển" },
    { key: "DELIVERED", label: "Đã giao" },
    { key: "CANCELLED", label: "Đã huỷ" },
];


const MyActivity: React.FC = () => {
    const router = useRouter();
    const [spendingData, setSpendingData] = useState<SpendingItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [statusData, setStatusData] = useState<{ label: string, value: number }[]>([]);


    const handleViewOrderHistory = () => {
        router.push('/(tabs)/Setting/OrderHistory');
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('user');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const response = await userApi.getUserSpending(userData.id);
                setSpendingData(response.data);
                const order = await getBoughtOrders(userData.id);
                setOrders(order.data);
                const countedStatuses = countOrderStatuses(order.data);
                setStatusData(countedStatuses);
            }
        } catch (error) {
            console.error("Lỗi khi fetch orders:", error);
        }
    };
    const colors = ['#007bff', '#FF9800', '#4CAF50', '#E91E63']
    const total = spendingData.reduce((sum, item) => sum + item.value, 0);
    const CIRCLE_RADIUS = 90;
    const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
    const CustomPieChart = () => {
        let cumulativeOffset = 0;

        return (
            <View style={styles.circleContainer}>
                <Svg height="200" width="200" viewBox="0 0 200 200">
                    <Circle
                        cx="100"
                        cy="100"
                        r={CIRCLE_RADIUS}
                        stroke="#e0e0e0"
                        strokeWidth="20"
                        fill="none"
                    />
                    {spendingData.map((item, index) => {
                        if (item.value === 0) return null;
                        const percentage = item.value / total;
                        const dashLength = percentage * CIRCLE_CIRCUMFERENCE;
                        const circle = (
                            <Circle
                                key={index}
                                cx="100"
                                cy="100"
                                r={CIRCLE_RADIUS}
                                stroke={colors[index % colors.length]}
                                strokeWidth="20"
                                strokeDasharray={`${dashLength} ${CIRCLE_CIRCUMFERENCE}`}
                                strokeDashoffset={-cumulativeOffset}
                                strokeLinecap="round"
                                fill="none"
                            />
                        );
                        cumulativeOffset += dashLength;
                        return circle;
                    })}
                </Svg>
                <Text style={styles.totalText}>Tổng{"\n"}{total.toLocaleString()}₫</Text>
            </View>
        );
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}
                style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
                <Text style={styles.title}>Hoạt động</Text>
                <Text style={styles.subtitle}>Thống kê chi tiêu</Text>
                {/* Month Selector */}
                <View style={styles.monthContainer}>
                    <Text style={styles.monthText}>Tháng 4</Text>
                </View>

                <CustomPieChart></CustomPieChart>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    {spendingData.map((item, index) => (
                        item.value > 0 && renderCategory(`${item.label}: ${item.value.toLocaleString()}₫`, colors[index % colors.length])
                    ))}
                </View>



                {/* Order Status */}
                <View style={styles.statusContainer}>
                    {statusData.map((item, index) => (
                        renderStatus(item.value, item.label)
                    ))}
                </View>

                {/* History Button */}
                <TouchableOpacity style={styles.historyButton} onPress={handleViewOrderHistory}>
                    <Text style={styles.historyButtonText}>Lịch sử giao dịch</Text>
                </TouchableOpacity>
            </ScrollView>
            {/* Bottom Navigation */}
            <BottomNavigation />
        </View>
    );
};

// Helpers
const renderCategory = (label: string, color: string) => (
    <View style={[styles.categoryItem, { backgroundColor: color }]}>
        <Text style={styles.categoryText}>{label}</Text>
    </View>
);

const renderStatus = (number: number, label: string) => (
    <View style={styles.statusItem}>
        <Text style={styles.statusNumber}>{number}</Text>
        <Text style={styles.statusLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
        marginBottom: 20,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 30,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    monthContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    monthText: {
        fontSize: 18,
        color: 'rgb(50, 54, 96)',
        fontWeight: '700',
        textAlign: 'center',
    },
    circleContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalText: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoriesContainer: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    categoryItem: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        margin: 5,
    },
    categoryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    statusContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statusItem: {
        alignItems: 'center',
    },
    statusNumber: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusLabel: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
    historyButton: {
        marginTop: 30,
        marginHorizontal: 50,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#3f51b5',
        alignItems: 'center',
    },
    historyButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MyActivity;
