import { WishlistItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import fetchDataWishlist, { Item } from "@/data/item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
     

        if (!userString) {
          console.warn("No user data found");
          return;
        }
        const user = JSON.parse(userString);

        const data = await fetchDataWishlist(user.id);
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách yêu thích</Text>
      {loading ? (
        <Text style={{ textAlign: "center" }}>Đang tải...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {wishlistItems.map((item: Item) => (
            <WishlistItem key={item.id} {...item} />
          ))}
        </ScrollView>
      )}
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
