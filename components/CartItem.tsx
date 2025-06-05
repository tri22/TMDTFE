import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CartItemProps = {
  item: {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    // color: string;
    // size: string;
    quantity: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}.000 vnd</Text>
        {/* <Text style={styles.sizeColor}>
          {item.color}, Size {item.size}
        </Text> */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onDecrease} style={styles.button}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={onIncrease} style={styles.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
  sizeColor: {
    fontSize: 12,
    color: "#777",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default CartItem;
