import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const AddressForm: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>
      <Text style={styles.subtitle}>Địa chỉ giao hàng</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Tỉnh/thành</Text>
        <TouchableOpacity style={styles.selectBox}>
          <Text style={styles.placeholder}>Chọn tỉnh/thành phố</Text>
          <AntDesign name="down" size={16} color="#9EB4E8" />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Quận/huyện</Text>
        <TouchableOpacity style={styles.selectBox}>
          <Text style={styles.placeholder}>Chọn quận/huyện</Text>
          <Feather name="chevron-down" size={20} color="#9EB4E8" />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Xã/phường/thị trấn</Text>
        <TouchableOpacity style={styles.selectBox}>
          <Text style={styles.placeholder}>Chọn xã/phường/thị trấn</Text>
          <Feather name="chevron-down" size={20} color="#9EB4E8" />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Tên đường/số nhà</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Không để trống"
          placeholderTextColor="#9EB4E8"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Không để trống"
          placeholderTextColor="#9EB4E8"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 74,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#202020",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 45,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F4FE",
    height: 37,
    borderRadius: 9,
    paddingHorizontal: 10,
  },
  placeholder: {
    fontSize: 16,
    color: "#9EB4E8",
  },
  textInput: {
    backgroundColor: "#F1F4FE",
    height: 37,
    borderRadius: 9,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  button: {
    height: 40,
    backgroundColor: "#323660",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#F3F3F3",
    fontSize: 16,
    fontWeight: "300",
  },
});

export default AddressForm;
