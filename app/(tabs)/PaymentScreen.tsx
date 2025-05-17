import {
  AddressInfo,
  ContactInfo,
  PaymentMethod,
  ProductItem,
  TotalAmount,
} from "@/components";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PaymentScreen: React.FC = () => {
  const products = [
    {
      id: 1,
      image: "https://example.com/jacket.png",
      name: "Jacket Champion - Hàng 2hand, legit",
      color: "Pink",
      size: "M",
      price: "250.000vnd",
      quantity: 1,
    },
    {
      id: 2,
      image: "https://example.com/hoodie.png",
      name: "Áo hoodie supreme đen chữ đỏ",
      color: "Pink",
      size: "M",
      price: "170.000vnd",
      quantity: 1,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <AddressInfo />
      <ContactInfo />
      <View style={styles.sectionHeader}>
        <h1>Sản phẩm</h1>
      </View>
      {products.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
      <PaymentMethod />
      <TotalAmount total="340.000vnd" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  sectionHeader: {
    marginVertical: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
