import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddressModal from "./AddressModal";
export type Address = {
  street: string;
  ward: string;
  district: string;
  city: string;
};

interface AddressInfoProps {
  onSave: (address: Address) => void;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ onSave }) => {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState<Address>({
    street: "",
    ward: "",
    district: "",
    city: "",
  });
  const handleSave = (address: Address) => {
    setAddress(address);
    onSave(address);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Địa chỉ giao hàng</Text>
        <TouchableOpacity>
          <MaterialIcons
            onPress={() => {
              setVisible(true);
            }}
            name="edit"
            size={20}
            color="#4F8EF7"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.address}>
        {address.street &&
          `${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
      </Text>

      <AddressModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
      />
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
  address: {
    fontSize: 14,
    color: "#555",
  },
});

export default AddressInfo;
