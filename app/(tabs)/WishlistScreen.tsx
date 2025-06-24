import wishlistAPI from "@/api/WishlistAPI";
import { WishlistItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import fetchDataWishlist, { Item } from "@/data/item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  const handleDeleteItem = async (id: number) => {
    const userString = await AsyncStorage.getItem("user");
    if (!userString) return;

    const user = JSON.parse(userString);
    try {
      await wishlistAPI.deleteWishlistByUserId(user.id, id);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (e) {
      alert("Lỗi khi xóa mục yêu thích");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>❤️ Danh sách yêu thích</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FF6B6B"
            style={styles.loading}
          />
        ) : wishlistItems.length === 0 ? (
          <Text style={styles.emptyText}>
            Bạn chưa có sản phẩm yêu thích nào.
          </Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {wishlistItems.map((item: Item) => (
              <WishlistItem
                key={item.id}
                {...item}
                onDelete={handleDeleteItem}
              />
            ))}
          </ScrollView>
        )}

        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    paddingTop: 60, // Space for status bar
    paddingBottom: 60, // Space for BottomNavigation
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6B7280",
  },
});

export default WishlistScreen;
