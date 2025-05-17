import { BottomNavigation } from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PaymentSetting = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Cài đặt</Text>
      <Text style={styles.subtitle}>Phương thức thanh toán</Text>

      {/* Card */}
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          {/* Logo Mastercard */}
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
            }}
            style={styles.logo}
          />
          {/* Icon bên phải */}
          <TouchableOpacity style={styles.secureIcon}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#444" />
          </TouchableOpacity>

          {/* Card Number */}
          <Text style={styles.cardNumber}>•••• •••• •••• 1579</Text>

          {/* Card Info */}
          <View style={styles.cardFooter}>
            <Text style={styles.name}>AMANDA MORGAN</Text>
            <Text style={styles.expiry}>12/22</Text>
          </View>
        </View>

        {/* Nút + */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
      <BottomNavigation></BottomNavigation>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    marginBottom: 20,
  },
  cardContainer: {
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
  addButton: {
    backgroundColor: "#2b2d64",
    width: 44,
    height: 120,
    borderRadius: 12,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 24,
    color: "#fff",
  },
});

export default PaymentSetting;
