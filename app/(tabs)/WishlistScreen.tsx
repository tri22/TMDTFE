import { WishlistItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ItemData } from "@/data";
import { Item } from "@/data/item";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const WishlistScreen = () => {
    const wishlistItems = ItemData;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách yêu thích</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {wishlistItems.map((item: Item) => (
                    <WishlistItem key={item.id} {...item} />
                ))}
            </ScrollView>
            <BottomNavigation />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,
        backgroundColor: "#FFFFFF",
        marginBottom: 8,
        textAlign: "center",
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default WishlistScreen;
