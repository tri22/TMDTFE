import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import icontrash and add
import { SERVER_BASE_URL } from "@/api/ipConstant";
import { Item } from "@/data/item";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const WishlistItem: React.FC<Item> = ({ ...item }) => {
  // get data
  // const { id, imageUrl, name, price, quantity } = item;
  // transport to another component
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
      {/* <Image source={imageMap[item.imageUrl]} style={styles.image} /> */}
      <Image
        source={{ uri: SERVER_BASE_URL + "/" + item.imageUrl }}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => item.onDelete(item.id)}
      >
        <AntDesign name="delete" size={24} color="#FF6347" />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} vnd</Text>
        <View style={styles.tagsContainer}>
          {/* <Text style={styles.tag}>{item.color}</Text> */}
          {/* <Text style={styles.tag}>{item.size}</Text> */}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleItemPress} style={styles.iconButton}>
          <FontAwesome5 name="plus" size={24} color="#4472C4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    marginRight: 8,
  },
  actions: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 8,
  },
  iconButton: {
    padding: 4,
  },
});

export default WishlistItem;
