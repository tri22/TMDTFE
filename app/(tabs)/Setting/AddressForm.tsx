import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import userApi from "../../../api/userApi";

interface Address {
  id?: number;
  province: string;
  district: string;
  ward: string;
  detail: string;
  phone: string;
}

interface AddressProps {
  address?: Address;
  refetchAddresses: () => void;
}

const AddressForm: React.FC<AddressProps> = ({ address, refetchAddresses }) => {
  const [newProvince, setNewProvince] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newWard, setNewWard] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    if (address) {
      setIsAddMode(false);
      setNewProvince(address.province);
      setNewDistrict(address.district);
      setNewWard(address.ward);
      setNewDetail(address.detail);
      setNewPhone(address.phone);
    } else {
      setIsAddMode(true);
      setNewProvince('');
      setNewDistrict('');
      setNewWard('');
      setNewDetail('');
      setNewPhone('');
    }
  }, [address]);


  const updateAddress = () => {
    if (!address?.id) return;

    const updatedAddress = {
      id: address.id,
      province: newProvince,
      district: newDistrict,
      ward: newWard,
      detail: newDetail,
      phone: newPhone,
    };

    userApi.upadtetUserAddressById(updatedAddress)
      .then(res => {
        Alert.alert("Thành công", "Cập nhật thông tin thành công!");
        refetchAddresses();
      })
      .catch(err => {
        console.error("Cập nhật thất bại", err);
        Alert.alert("Lỗi", "Cập nhật thất bại. Vui lòng thử lại sau!");
      });
  };

  const addAddress = async () => {
    const userDataString = await AsyncStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const addAddress = {
        userId: userData.id,
        province: newProvince,
        district: newDistrict,
        ward: newWard,
        detail: newDetail,
        phone: newPhone,
      };
      userApi.addUserAddress(addAddress)
        .then(res => {
          Alert.alert("Thành công", "Cập nhật thông tin thành công!");
          refetchAddresses();
        })
        .catch(err => {
          console.error("Cập nhật thất bại", err);
          Alert.alert("Lỗi", "Cập nhật thất bại. Vui lòng thử lại sau!");
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Tỉnh/thành</Text>
        <TextInput
          style={styles.input}
          placeholder="Tỉnh/thành"
          value={newProvince}
          onChangeText={setNewProvince}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Quận/huyện</Text>
        <TextInput
          style={styles.input}
          placeholder="Quận/huyện"
          value={newDistrict}
          onChangeText={setNewDistrict}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Xã/phường/thị trấn</Text>
        <TextInput
          style={styles.input}
          placeholder="Xã/phường/thị trấn"
          value={newWard}
          onChangeText={setNewWard}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Tên đường/số nhà</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đường/số nhà"
          value={newDetail}
          onChangeText={setNewDetail}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={newPhone}
          onChangeText={setNewPhone}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={isAddMode ? addAddress : updateAddress}
      >
        <Text style={styles.buttonText}>
          {isAddMode ? "Thêm địa chỉ" : "Lưu thay đổi"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
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
  input: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
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
    fontWeight: "500",
  },
});

export default AddressForm;
