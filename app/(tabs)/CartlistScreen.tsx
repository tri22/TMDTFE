import wishlistAPI from "@/api/WishlistAPI";
import { WishlistItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import fetchDataWishlist, { Item } from "@/data/item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

const CartlistScreen = () => {
  const insets = useSafeAreaInsets();
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
    try {
      const userString = await AsyncStorage.getItem("user");

      if (!userString) {
        console.warn("No user data found");
        return;
      }
      const user = JSON.parse(userString);

      await wishlistAPI.deleteWishlistByUserId(user.id, id);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Giỏ Hàng : </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        ) : wishlistItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        ) : (
          wishlistItems.map((item: Item) => (
            <WishlistItem key={item.id} {...item} onDelete={handleDeleteItem} />
          ))
        )}
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingHorizontal: isSmallDevice ? 12 : 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerText: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "left",
  },
  scrollContent: {
    paddingHorizontal: isSmallDevice ? 12 : 16,
    paddingBottom: 80, // Extra padding for BottomNavigation
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: isSmallDevice ? 16 : 18,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: isSmallDevice ? 16 : 18,
    color: "#666",
    textAlign: "center",
  },
});

export default CartlistScreen;
