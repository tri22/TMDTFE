import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type SettingsItemProps = {
    label: string;
    isRed?: boolean;
    onPress?: () => void;
};

export const SettingsItem = ({
    label,
    isRed = false,
    onPress,
}: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <Text style={[styles.label, isRed && styles.red]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 12,
    },
    label: {
        fontSize: 16,
        color: "#1f2937",
    },
    red: {
        color: "red",
    },
});
export default SettingsItem;
