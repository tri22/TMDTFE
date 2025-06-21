// components/Dropdown.js
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../styles/PostPdStyle';

export default function Dropdown({
    label,
    value,
    items,
    onSelect,
    showDropdown,
    setShowDropdown,
    customValue,
    setCustomValue,
}) {
    return (
        <>
            <TouchableOpacity
                style={commonStyles.dropdownContainer}
                onPress={() => setShowDropdown(!showDropdown)}
            >
                <Text style={commonStyles.inputText}>{value || `Chọn ${label}`}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            {showDropdown && (
                <View style={commonStyles.dropdownList}>
                    <ScrollView nestedScrollEnabled>
                        {items.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => onSelect(item)}>
                                <Text style={commonStyles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.otherInputContainer}>
                            <Text style={styles.otherInputLabel}>Khác:</Text>
                            <TextInput
                                value={customValue}
                                onChangeText={(text) => {
                                    setCustomValue(text);
                                    onSelect(text);
                                }}
                                placeholder={`Nhập ${label}`}
                                style={styles.otherInput}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    dropdownArrow: {
        fontSize: 16,
        color: '#2e384d',
    },
    otherInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    otherInputLabel: {
        marginRight: 8,
    },
    otherInput: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 8,
        height: 45,
        color: '#2e384d',
    },
});