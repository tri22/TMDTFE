import { useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { BottomNavigation } from '../../../components/BottomNavigation';
import { Header } from './Header';
const MyActivity: React.FC = () => {
    const router = useRouter();

    const handleViewOrderHistory = () => {
        router.push('/(tabs)/Setting/OrderHistory');
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container}>
                <Header title="Hoạt động" />
                {/* Month Selector */}
                <View style={styles.monthContainer}>
                    <Text style={styles.monthText}>Tháng 4</Text>
                </View>

                {/* Custom Circle Chart */}
                <View style={styles.circleContainer}>
                    <Svg height="200" width="200" viewBox="0 0 200 200">
                        {/* Background Circle */}
                        <Circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="#e0e0e0"
                            strokeWidth="20"
                            fill="none"
                        />
                        {/* Quần */}
                        <Circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="#007bff"
                            strokeWidth="20"
                            strokeDasharray="565.48"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Giày */}
                        <Circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="#4CAF50"
                            strokeWidth="20"
                            strokeDasharray="565.48"
                            strokeDashoffset="-150"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Áo */}
                        <Circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="#FF9800"
                            strokeWidth="20"
                            strokeDasharray="565.48"
                            strokeDashoffset="-300"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Túi */}
                        <Circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="#E91E63"
                            strokeWidth="20"
                            strokeDasharray="565.48"
                            strokeDashoffset="-450"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </Svg>
                    <Text style={styles.totalText}>Tổng{"\n"}1.350.000vnd</Text>
                </View>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    {renderCategory('Quần 183.000đ', '#007bff')}
                    {renderCategory('Giày 92.000đ', '#4CAF50')}
                    {renderCategory('Áo 47.000đ', '#FF9800')}
                    {renderCategory('Túi 43.000đ', '#E91E63')}
                </View>

                {/* Order Status */}
                <View style={styles.statusContainer}>
                    {renderStatus('12', 'Đơn đã đặt')}
                    {renderStatus('7', 'Đã Nhận')}
                    {renderStatus('5', 'Đang vận chuyển')}
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

const renderStatus = (number: string, label: string) => (
    <View style={styles.statusItem}>
        <Text style={styles.statusNumber}>{number}</Text>
        <Text style={styles.statusLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 480,
        width: '100%',
        paddingTop: 15,
        overflow: 'hidden',
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
