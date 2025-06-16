import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddressModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
};

type Address = {
  street: string;
  ward: string;
  district: string;
  city: string;
};

const AddressModal: React.FC<AddressModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [address, setAddress] = useState<Address>({
    street: "",
    ward: "",
    district: "",
    city: "",
  });

  const wards = ["An Phú", "Thảo Điền", "Bình An"];
  const districts = ["Quận 1", "Quận 2", "Quận 3"];
  const cities = ["TPHCM", "Hà Nội", "Đà Nẵng"];

  const handleSelect = (field: string, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Địa chỉ giao hàng</Text>

          <TextInput
            style={styles.input}
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
            placeholder="Tên đường/số nhà"
          />

          <Text style={styles.label}>Phường/Xã:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {wards.map((ward) => (
              <TouchableOpacity
                key={ward}
                style={[
                  styles.option,
                  address.ward === ward ? styles.optionSelected : null,
                ]}
                onPress={() => handleSelect("ward", ward)}
              >
                <Text
                  style={[
                    styles.optionText,
                    address.ward === ward ? styles.optionTextSelected : null,
                  ]}
                >
                  {ward}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Quận/Huyện:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {districts.map((district) => (
              <TouchableOpacity
                key={district}
                style={[
                  styles.option,
                  address.district === district ? styles.optionSelected : null,
                ]}
                onPress={() => handleSelect("district", district)}
              >
                <Text
                  style={[
                    styles.optionText,
                    address.district === district
                      ? styles.optionTextSelected
                      : null,
                  ]}
                >
                  {district}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Thành phố/Tỉnh:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={[
                  styles.option,
                  address.city === city ? styles.optionSelected : null,
                ]}
                onPress={() => handleSelect("city", city)}
              >
                <Text
                  style={[
                    styles.optionText,
                    address.city === city ? styles.optionTextSelected : null,
                  ]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onSave(address);
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  option: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  optionSelected: {
    backgroundColor: "#4CAF50",
  },
  optionText: {
    color: "#333",
  },
  optionTextSelected: {
    color: "white",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddressModal;
