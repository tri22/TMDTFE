import { SERVER_BASE_URL } from "@/api/ipConstant";
import { Item } from "@/data/item";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props extends Item {
  onIncrease: () => void;
  onDecrease: () => void;
}

const ProductItemSection: React.FC<Props> = ({
  onIncrease,
  onDecrease,
  ...data
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: SERVER_BASE_URL + "/" + data.imageUrl }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.info}>{/* {data.color}, Size {data.size} */}</Text>
        <Text style={styles.price}>{data.price}.000 VND</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrease}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{data.quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={onIncrease}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    gap: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "#4F8EF7",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductItemSection;
