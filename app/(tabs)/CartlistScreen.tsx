import { CartItem } from "@/components/";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ItemData } from "@/data";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

const CartScreen = () => {
  const router = useRouter();
  const handleItemPress = (route: string) => {
    router.push(route as any);
  };
  const [cartItems, setCartItems] = useState(ItemData);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <ScrollView style={styles.scroll}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => handleIncrease(item.id)}
            onDecrease={() => handleDecrease(item.id)}
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </ScrollView>
      <View style={styles.purchase}>
        <Text>Tổng Cộng </Text>
        <Text style={styles.subtitle}>Tổng tiền: {totalPrice}.000 VND</Text>
        <Button
          title="Thanh toán"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/PaymentScreen",
              params: { list: JSON.stringify(cartItems) },
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
