import { getProductById, updateProduct } from "@/api/productApi";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
export default function EditProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [id]);

    const fetchProductById = async (id: string) => {
        try {
            const response = await getProductById(Number(id))
            const data = response.data
            console.log(data)
            if (data) {
                setName(data.name);
                setPrice(data.price);
                setImgUrl(data.images[0].url);
                setDescription(data.description);
                setBrand(data.brand);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleupdateProduct = async () => {
        const newData = {
            name,
            price: Number(price),
            imgUrl,
            description,
            brand,
        };
        console.log("Sending update for ID:", id, newData); // log dữ liệu gửi

        try {
            const response = await updateProduct(Number(id), newData);
            console.log("Cập nhật thành công", response.data);
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:",  error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingBottom: 80 }}>
                <Text style={styles.title}>Cài đặt</Text>
                <Text style={styles.subtitle}>Thông tin sản phẩm</Text>
                <View style={styles.field}>
                    <Text style={styles.label}>Tên sản phẩm</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên sản phẩm"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Mô tả</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mô tả"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Hình ảnh</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Hình ảnh"
                        value={imgUrl}
                        onChangeText={setImgUrl}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Giá</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Giá"
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Thương hiệu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Thương hiệu"
                        value={brand}
                        onChangeText={setBrand}
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleupdateProduct}>
                    <Text style={styles.buttonText}>Lưu thay đổi</Text>
                </TouchableOpacity>
            </View>
            <BottomNavigation></BottomNavigation>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 48,
        paddingRight: 20,
        paddingLeft: 20,
    },
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