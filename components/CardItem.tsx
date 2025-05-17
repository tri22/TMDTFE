import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardItemProps = {
  cardType: "mastercard" | "visa";
  cardNumber: string;
  ownerName: string;
  expiry: string;
  onSettings: () => void;
};
export type { CardItemProps };
const CardItem: React.FC<CardItemProps> = ({
  cardType,
  cardNumber,
  ownerName,
  expiry,
  onSettings,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <FontAwesome
          name={cardType === "mastercard" ? "cc-mastercard" : "cc-visa"}
          size={32}
          color={cardType === "mastercard" ? "#FF5F00" : "#1A1F71"}
        />
        <Text style={styles.cardNumber}>**** **** **** {cardNumber}</Text>
        <Text style={styles.ownerName}>{ownerName.toUpperCase()}</Text>
        <Text style={styles.expiry}>Exp: {expiry}</Text>
      </View>
      <TouchableOpacity style={styles.settingsIcon} onPress={onSettings}>
        <FontAwesome name="gear" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#D9D9D9",
    borderWidth: 1,
  },
  leftContainer: {
    flexDirection: "column",
  },
  cardNumber: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
  ownerName: {
    fontSize: 14,
    color: "#888",
  },
  expiry: {
    fontSize: 12,
    color: "#666",
  },
  settingsIcon: {
    padding: 6,
  },
});

export default CardItem;
