import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Card = {
  id: number;
  cardType: "mastercard" | "visa";
  cardNumber: string;
  ownerName: string;
  expiry: string;
};
export type { Card };
const PaymentMethod: React.FC = () => {
  const [cardDisplay, setCardDisplay] = useState("Thẻ thanh toán"); // state to control the card display

  const handleCardSelect = (card: Card) => {
    setCardDisplay(
      `${card.cardType === "mastercard" ? "MasterCard" : "Visa"} - ${
        card.cardNumber
      }`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phương thức thanh toán</Text>
        <TouchableOpacity onPress={() => true}>
          <MaterialIcons name="edit" size={20} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
      <View style={styles.methodContainer}>
        <Text>{cardDisplay}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  methodContainer: {
    marginTop: 16,
  },
});

export default PaymentMethod;
