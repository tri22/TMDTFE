
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import userApi, { AddressRequest } from '../../../api/userApi';
import { BottomNavigation } from '../../../components/BottomNavigation';
import AddressForm from './AddressForm';
const AddressSettings = () => {
  const [addressList, setAddressList] = useState<AddressRequest[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressRequest>();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>();
  const [showPicker, setShowPicker] = useState(false);
  const [user, setUser] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const fetchAddressList = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      console.log(userDataString)
      if (userDataString) {
        const userData = JSON.parse(userDataString); // 👈 chuyển sang object
        setUser(userData);
        const response = await userApi.getUserAddress(userData.id);
        const list = response.data;
        if (list.length > 0) {
          setSelectedAddressIndex(0);
          setSelectedAddress(list[0]);
        }
        setAddressList(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddressList();
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}
        style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
        <Text style={styles.title}>Cài đặt</Text>
        <Text style={styles.subtitle}>Địa chỉ giao hàng</Text>
        <View style={{ marginBottom: 20 }}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Button mode="outlined" onPress={openMenu}>
                {selectedAddress
                  ? `${selectedAddress.detail}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.province}`
                  : 'Chọn địa chỉ'}
              </Button>
            }
          >
            {addressList.map((item, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setSelectedAddressIndex(index);
                  setSelectedAddress(item);
                  closeMenu();
                }}
                title={`${item.detail}, ${item.ward}, ${item.district}, ${item.province}`}
              />
            ))}
          </Menu>
          <Button
            mode="contained-tonal"
            style={{ marginTop: 12 }}
            onPress={() => {
              setSelectedAddress(undefined); // 👉 chuyển về chế độ thêm mới
              closeMenu();
            }}
          >
            + Thêm địa chỉ mới
          </Button>
        </View>


        <View style={styles.formWrapper}>
          <AddressForm
            address={selectedAddress}
            refetchAddresses={fetchAddressList}
          ></AddressForm>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default AddressSettings;

const styles = StyleSheet.create({
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
  selectText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formWrapper: {

  },
  pickerItem: {
    fontSize: 18,
    color: '#000',
    height: 180,
  },
  pickerContainer: {
    height: 180,
    backgroundColor: '#f0f0f0',
  },
});
