import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ContactInfoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (contactInfo: ContactInfo) => void;
};

type ContactInfo = {
  phone: string;
  email: string;
};

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "2932000000",
    email: "amandamorgan@example.com",
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Thông tin liên hệ</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            value={contactInfo.phone}
            onChangeText={(text) =>
              setContactInfo((prev) => ({ ...prev, phone: text }))
            }
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            value={contactInfo.email}
            onChangeText={(text) =>
              setContactInfo((prev) => ({ ...prev, email: text }))
            }
            placeholder="Email"
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onSave(contactInfo);
              onClose();
            }}
          >
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactInfoModal;
