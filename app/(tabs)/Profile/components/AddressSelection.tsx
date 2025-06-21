import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { commonStyles } from '../styles/PostPdStyle';

export default function AddressSelection({ onChange }) {
    const [pickupAddress, setPickupAddress] = useState('');

    useEffect(() => {
        onChange(pickupAddress);
    }, [pickupAddress, onChange]);

    return (
        <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.title}>Địa chỉ lấy hàng</Text>
            <TextInput
                placeholder="Điền địa chỉ lấy hàng"
                placeholderTextColor="#a6b3ac"
                style={commonStyles.input}
                value={pickupAddress}
                onChangeText={setPickupAddress}
            />
        </View>
    );
}