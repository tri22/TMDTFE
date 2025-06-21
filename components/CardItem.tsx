import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CardItemProps = {
  img: ImageSourcePropType;
  cardNumber: string;
  ownerName: string;
  expiry: string;
};
export type { CardItemProps };
const CardItem: React.FC<CardItemProps> = ({
  img,
  cardNumber,
  ownerName,
  expiry,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        {/* Logo Mastercard */}
        <Image source={img} style={styles.logo} />

        {/* Icon bên phải */}
        <TouchableOpacity style={styles.secureIcon}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#444" />
        </TouchableOpacity>

        {/* Card Number */}
        <Text style={styles.cardNumber}>
          {cardNumber.replace(/\d(?=\d{4})/g, "•")}
        </Text>

        {/* Card Info */}
        <View style={styles.cardFooter}>
          <Text style={styles.name}>{ownerName.toUpperCase()}</Text>
          <Text style={styles.expiry}>{expiry}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    backgroundColor: "#f5f7ff",
    borderRadius: 16,
    padding: 16,
    position: "relative",
  },
  logo: {
    width: 40,
    height: 24,
    resizeMode: "contain",
    marginBottom: 16,
  },
  secureIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#e0e7ff",
    padding: 6,
    borderRadius: 999,
  },
  cardNumber: {
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 12,
    color: "#000",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  expiry: {
    fontSize: 12,
    color: "#333",
  },
});

export default CardItem;
