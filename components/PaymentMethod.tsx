import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PaymentMethod: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phương thức thanh toán</Text>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={20} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
      <View style={styles.methodContainer}>
        <Text style={styles.method}>Card</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  methodContainer: {
    paddingVertical: 4,
  },
  method: {
    fontSize: 14,
    color: "#555",
  },
});

export default PaymentMethod;
