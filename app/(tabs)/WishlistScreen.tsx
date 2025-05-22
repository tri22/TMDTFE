import { WishlistItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const WishlistScreen = () => {
  const wishlistItems = [
    {
      id: 1,
      image: "https://example.com/shirt.png",
      name: "Áo thun Champion đen đỏ size L",
      price: "150.000",
      color: "Trắng",
      size: "M",
    },
    {
      id: 2,
      image: "https://example.com/jacket.png",
      name: "Jacket Champion - Hàng 2hand, legit",
      price: "250.000",
      color: "Đen",
      size: "M",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách yêu thích</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {wishlistItems.map((item) => (
          <WishlistItem key={item.id} item={item} />
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
