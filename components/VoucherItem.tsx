import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type VoucherItemProps = {
  title: string;
  description: string;
  expiry: string;
  onAdd: () => void;
};

const VoucherItem: React.FC<VoucherItemProps> = ({
  title,
  description,
  expiry,
  onAdd,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Voucher</Text>
        <Text style={styles.expiry}>Áp dụng đến {expiry}</Text>
      </View>
      <View style={styles.body}>
        <MaterialCommunityIcons name="gift-outline" size={24} color="#4472C4" />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderColor: "#D9D9D9",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerText: {
    color: "#4472C4",
    fontWeight: "bold",
  },
  expiry: {
    color: "#888",
    fontSize: 12,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#666",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default VoucherItem;
