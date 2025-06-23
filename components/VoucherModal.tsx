import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import VoucherItem from "./VoucherItem";

type VoucherModalProps = {
  visible: boolean;
  onClose: () => void;
  vouchers: {
    active: boolean;
    code: string;
    description: string;
    discount: number;
    expiryDate: string;
    id: number;
    minOrderValue: number;
    quantity: number;
  }[];
  onAddVoucher: (id: number) => void;
};

const VoucherModal: React.FC<VoucherModalProps> = ({
  visible,
  onClose,
  vouchers,
  onAddVoucher,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Vouchers</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {vouchers.map((voucher) => (
              <VoucherItem
                key={voucher.id}
                title={voucher.description}
                description={voucher.code}
                expiry={voucher.expiryDate}
                onAdd={() => onAddVoucher(voucher.id)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default VoucherModal;
