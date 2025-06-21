import { CartItem } from "@/components/";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Item } from "@/data/item";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

const CartScreen = () => {
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    const initialItem: Item = data
        ? JSON.parse(data)
        : {
            id: 0,
            name: "",
            price: 0,
            imageUrl: "",
            quantity: 1,
        };

    const [cartItem, setCartItem] = React.useState<Item>(initialItem);

    const totalPrice = cartItem.price * cartItem.quantity;

    const router = useRouter();

    const handleIncrease = () => {
        setCartItem((prev) => ({
            ...prev,
            quantity: prev.quantity + 1,
        }));
    };

    const handleDecrease = () => {
        setCartItem((prev) => ({
            ...prev,
            quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
        }));
    };

    const handleRemove = () => {
        setCartItem({
            id: 0,
            name: "",
            price: 0,
            imageUrl: "",
            quantity: 0,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng</Text>
            <ScrollView style={styles.scroll}>
                <CartItem
                    item={initialItem}
                    key={initialItem.id}
                    onIncrease={() => handleIncrease()}
                    onDecrease={() => handleDecrease()}
                    onRemove={() => handleRemove()}
                />
            </ScrollView>
            <View style={styles.purchase}>
                <Text>Tổng Cộng </Text>
                <Text style={styles.subtitle}>Tổng tiền: {totalPrice}.000 VND</Text>
                <Button
                    title="Thanh toán"
                    onPress={() =>
                        router.push({
                            pathname: "/(tabs)/PaymentScreen",
                            params: { list: JSON.stringify(cartItem) },
                        })
                    }
                />
            </View>
            <BottomNavigation />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#555",
    },
    scroll: {
        marginBottom: 0,
    },
    purchase: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 100,
    },
});

export default CartScreen;
