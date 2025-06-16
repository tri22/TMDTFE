import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RadioOption({ method, selected, onSelect }: any) {
    const { key, label, colors } = method;
    const isSelected = selected === key;

    return (
        <TouchableOpacity
            key={key}
            style={[styles.radioContainer, { backgroundColor: colors.bg }]}
            onPress={() => onSelect(key)}
        >
            <Text
                style={[
                    styles.radioLabel,
                    {
                        color: isSelected ? colors.circle : '#000',
                        fontWeight: isSelected ? 'bold' : 'normal',
                    },
                ]}
            >
                {label}
            </Text>
            <View style={[styles.radioCircle, { backgroundColor: colors.circle }]}>
                {isSelected && <Text style={styles.checkMark}>✓</Text>}
            </View>
        </TouchableOpacity>
    );
};

RadioOption;

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        width: '60%',
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkMark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioLabel: {
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
    },
});
