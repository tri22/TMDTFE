import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
interface DeliveryStatusProps {
    title: string;
    time: string;
    description: string;
    isCompleted?: boolean;
    showCheckmark?: boolean;
}

export const DeliveryStatus: React.FC<DeliveryStatusProps> = ({
    title,
    time,
    description,
    isCompleted,
    showCheckmark,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {showCheckmark && (
                        <AntDesign name="checkcircle" size={24} color="#4CAF50" style={{ marginLeft: 4 }} />
                    )}
                </View>
                <Text style={styles.time}>{time}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    title: {
        fontSize: 17,
        fontFamily: 'Raleway',
        fontWeight: '700',
        lineHeight: 17,
        letterSpacing: -0.17,
        color: '#000000',
    },
    time: {
        fontSize: 13,
        fontFamily: 'Raleway',
        fontWeight: '500',
        letterSpacing: -0.13,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 3,
        color: '#191111',
    },
    description: {
        fontSize: 12,
        fontFamily: 'Nunito Sans',
        fontWeight: '400',
        lineHeight: 16,
        color: '#000000',
        marginTop: 8,
    },
    checkmark: {
        width: 26,
        height: 26,
        aspectRatio: 1,
    },
});