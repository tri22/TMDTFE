import React, { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import userApi from '../../../api/userApi';

interface Address {
    id: number;
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

    useEffect(() => {
        if (address) {
            setNewProvince(address.province);
            setNewDistrict(address.district);
            setNewWard(address.ward);
            setNewDetail(address.detail);
            setNewPhone(address.phone);
        }
    }, [address]);

    const id = address?.id
    const province = address?.province
    const district = address?.district
    const ward = address?.ward
    const detail = address?.detail
    const phone = address?.phone

    const updateAddress = () => {
        const updatedAddress = {
            id: id,
            province: newProvince,
            district: newDistrict,
            ward: newWard,
            detail: newDetail,
            phone: newPhone,
        }
        console.log({ updatedAddress })
        userApi.upadtetUserAddressById(updatedAddress)
            .then(res => {
                console.log("Cập nhật thành công", res.data);
                Alert.alert("Thành công", "Cập nhật thông tin thành công!");
                refetchAddresses();
            })
            .catch(err => {
                console.error("Cập nhật thất bại", err);
                Alert.alert("Lỗi", "Cập nhật thất bại. Vui lòng thử lại sau!");
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.label}>Tỉnh/thành</Text>
                <TextInput style={styles.input} placeholder="Tỉnh/thành" defaultValue={newProvince} onChangeText={setNewProvince} />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Quận/huyện</Text>
                <TextInput style={styles.input} placeholder="Quận/huyện" defaultValue={newDistrict} onChangeText={setNewDistrict} />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Xã/phường/thị trấn</Text>
                <TextInput style={styles.input} placeholder="Xã/phường/thị trấn" defaultValue={newWard} onChangeText={setNewWard} />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Tên đường/số nhà</Text>
                <TextInput style={styles.input} placeholder="Tên đường/số nhà" defaultValue={newDetail} onChangeText={setNewDetail} />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input} placeholder="Số điện thoại" defaultValue={newPhone} onChangeText={setNewPhone} />
            </View>

            <TouchableOpacity style={styles.button} onPress={updateAddress}>
                <Text style={styles.buttonText}>Lưu thay đổi</Text>
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
    input: {
        backgroundColor: "#f1f5f9",
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
});

export default AddressForm;
