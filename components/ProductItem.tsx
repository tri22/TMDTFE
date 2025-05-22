import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProductItemProps {
  item: {
    id: number;
    image: string;
    name: string;
    color: string;
    size: string;
    price: string;
    quantity: number;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>
          {item.color}, Size {item.size}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{item.quantity}</Text>
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

export default ProductItem;
