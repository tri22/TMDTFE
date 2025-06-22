import { Item } from "@/data/item";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WishlistItem: React.FC<Item> = ({ ...item }) => {
  const router = useRouter();
  const data = item;

  const handleItemPress = () => {
    router.push({
      pathname: "/(tabs)/PaymentScreen",
      params: { data: JSON.stringify(data) },
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
          <View style={styles.tagsContainer}>
            {/* Uncomment if color and size are available */}
            {/* <Text style={styles.tag}>{item.color}</Text> */}
            {/* <Text style={styles.tag}>{item.size}</Text> */}
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => item.onDelete(item.id)}
            activeOpacity={0.7}
          >
            <AntDesign name="delete" size={20} color="#FF6347" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleItemPress}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="plus" size={20} color="#4472C4" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 20,
  },
  price: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 11,
    color: "#374151",
    marginRight: 6,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 4,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 8,
  },
});

export default WishlistItem;
