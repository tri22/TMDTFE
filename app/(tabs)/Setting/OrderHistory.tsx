import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const orders = [
    { id: '1', date: '19/04/2020 12:31', code: '#92287157', amount: 140000 },
    { id: '2', date: '19/04/2020 12:31', code: '#92287157', amount: -370000 },
    { id: '3', date: '19/04/2020 12:31', code: '#92287157', amount: 190000 },
    { id: '4', date: '19/04/2020 12:31', code: '#92287157', amount: -140000 },
    { id: '5', date: '19/04/2020 12:31', code: '#92287157', amount: -540000 },
    { id: '6', date: '19/04/2020 12:31', code: '#92287157', amount: 94000 },
];

export default function OrderHistory() {
    const renderItem = ({ item }: { item: typeof orders[0] }) => {
        const isPositive = item.amount > 0;

        return (
            <View style={[styles.itemContainer, isPositive ? styles.positive : styles.negative]}>
                <FontAwesome name="shopping-bag" size={16} color="#fff" style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.codeText}>Đơn hàng {item.code}</Text>
                </View>
                <Text style={[styles.amount, isPositive ? styles.amountPositive : styles.amountNegative]}>
                    {(isPositive ? '+' : '') + item.amount.toLocaleString('vi-VN')}đ
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.wrapper}>
            <Text></Text>
            <View style={styles.container}>
                <FlatList data={orders} renderItem={renderItem} keyExtractor={(item) => item.id} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
    },
    positive: {
        backgroundColor: '#e6f4ff',
    },
    negative: {
        backgroundColor: '#ffe6e6',
    },
    icon: {
        backgroundColor: '#4472C4',
        padding: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    dateText: {
        fontSize: 12,
        color: '#777',
    },
    codeText: {
        fontSize: 14,
        fontWeight: '500',
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    amountPositive: {
        color: '#1E90FF',
    },
    amountNegative: {
        color: '#FF3B30',
    },
});
