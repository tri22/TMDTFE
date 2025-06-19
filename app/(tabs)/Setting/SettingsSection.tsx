import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SettingsItem } from "./SettingsItem";

// Định nghĩa type cho props
type SettingsSectionProps = {
    title: string;
    items: { label: string; route: string }[];
    onItemPress: (route: string) => void;
};

export const SettingsSection = ({
    title,
    items,
    onItemPress,
}: SettingsSectionProps) => {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>{title}</Text>
            {items.map((item: { label: string; route: string }, index: number) => (
                <SettingsItem
                    key={index}
                    label={item.label}
                    onPress={() => onItemPress(item.route)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#6b7280",
        marginBottom: 10,
    },
});

export default SettingsSection;
