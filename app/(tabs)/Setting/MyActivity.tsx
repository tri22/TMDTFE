import { useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { BottomNavigation } from '../../../components/BottomNavigation';
const MyActivity: React.FC = () => {
    const router = useRouter();

    const handleViewOrderHistory = () => {
        router.push('/(tabs)/Setting/OrderHistory');
    };
    const sampleData = [
        { label: "Quần", value: 400000, color: "#007bff" },
        { label: "Áo", value: 350000, color: "#FF9800" },
        { label: "Giày", value: 300000, color: "#4CAF50" },
        { label: "Túi", value: 300000, color: "#E91E63" },
    ];

    const statusData: { label: string, value: number }[] = [
        { label: "Đơn đã đặt", value: 12 },
        { label: "Đã Nhận", value: 10 },
        { label: "Đang vận chuyển", value: 52 },
    ];

    const total = sampleData.reduce((sum, item) => sum + item.value, 0);
    const CIRCLE_RADIUS = 90;
    const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
    const CustomPieChart = () => {
        let cumulativeOffset = 0;

        return (
            <View style={styles.circleContainer}>
                <Svg height="200" width="200" viewBox="0 0 200 200">
                    {/* Background Circle */}
                    <Circle
                        cx="100"
                        cy="100"
                        r={CIRCLE_RADIUS}
                        stroke="#e0e0e0"
                        strokeWidth="20"
                        fill="none"
                    />
                    {/* Foreground Segments */}
                    {sampleData.map((item, index) => {
                        const percentage = item.value / total;
                        const dashLength = percentage * CIRCLE_CIRCUMFERENCE;
                        const circle = (
                            <Circle
                                key={index}
                                cx="100"
                                cy="100"
                                r={CIRCLE_RADIUS}
                                stroke={item.color}
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
                    {sampleData.map((item, index) => (
                        renderCategory(item.label + ": " + item.value, item.color)
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
