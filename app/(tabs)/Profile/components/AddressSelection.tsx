import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddressSelection({ onchange }) {
    const [pickupAddress, setPickupAddress] = useState('');
    useEffect(() => {
        onchange(pickupAddress)
    }, [pickupAddress]);
    return (<View style={styles.sectionContainer}>
        <Text style={styles.title}>Địa chỉ lấy hàng</Text>
        <TextInput
            placeholder="Điền địa chỉ lấy hàng"
            placeholderTextColor="#a6b3ac"
            style={styles.inputAddress}
            value={pickupAddress}
            onChangeText={setPickupAddress}
        />
    </View>);
}

const styles = StyleSheet.create({
    sectionContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        color: '#2e384d',
        fontWeight: 'bold',

    },
    inputAddress: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#e5ebfc",
        fontSize: 16,
        color: '#2e384d',
    },
})