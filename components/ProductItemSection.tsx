import { Item } from "@/data/item";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ProductItemSection: React.FC<Item> = ({ ...data }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.info}>
          {data.color}, Size {data.size}
        </Text>
        <Text style={styles.price}>{data.price}.000 VND</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{data.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 14,
    color: "#FF6347",
    fontWeight: "bold",
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductItemSection;
