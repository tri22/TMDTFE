
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import userApi from '../../../api/userApi';
import { BottomNavigation } from '../../../components/BottomNavigation';
import AddressForm from './AddressForm';

interface Address {
  id:number;
  province: string;
  district: string;
  ward: string;
  detail: string;
  phone: string;
}

const AddressSettings = () => {
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>();
  const [showPicker, setShowPicker] = useState(false);

 
    const fetchAddressList = async () => {
      try {
        const response = await userApi.getUserAddress(4);
        console.log(response.data);
        setAddressList(response.data)

      } catch {

      }
    }
  useEffect(() => {
    fetchAddressList();
  }, []);

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}
        style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
        <Text style={styles.title}>Cài đặt</Text>
        <Text style={styles.subtitle}>Địa chỉ giao hàng</Text>
        <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
          <Text style={styles.selectText}>Chọn địa chỉ:</Text>
        </TouchableOpacity>

        {showPicker && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAddressIndex}
              onValueChange={(itemIndex: number) => {
                setSelectedAddressIndex(itemIndex);
                setSelectedAddress(addressList[itemIndex]);
                setShowPicker(false); // Ẩn picker sau khi chọn
              }}
              itemStyle={styles.pickerItem}
            >
              {addressList.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={`${item.detail}, ${item.ward}, ${item.district}, ${item.province}`}
                  value={index}
                />
              ))}
            </Picker>
          </View>
        )}

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
