import { postProductApi } from '@/api/postApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import AddressSelection from './components/AddressSelection';
import CategorySelection from './components/CategorySelection';
import ImageUploadSection from './components/ImageUploadSection';
import ProductDetails from './components/ProductDetails';

export default function PostProductScreen() {
    const [termAccept, setTermAccept] = useState(false);
    const [product, setProduct] = useState({});
    const [pickupAddress, setPickupAddress] = useState({});
    const [images, setImages] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [user, setUser] = useState(); // Lấy User được lưu trong storage 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
            }
        }; fetchUser();
    }, []);

    // const handlePost = async () => {
    //     if (!termAccept) {
    //         Alert.alert("Bạn phải đồng ý điều khoản trước khi đăng");
    //         return;
    //     }
    //     const data = {
    //         ...product,
    //         categoryTitle: categoryTitle,
    //         pickupAddress: pickupAddress,
    //         imageUrls: images,
    //         userId: user?.id,
    //         termsAccepted: termAccept,
    //     };
    //     try {
    //         console.log('Dữ liệu gửi lên:', JSON.stringify(data, null, 2));
    //         const response = await postProductApi.createProduct(data); // ✅ Gọi qua postProductApi
    //         console.log("Phản hồi từ server:", response.data);
    //         Alert.alert("Đăng sản phẩm thành công!");
    //     } catch (error) {
    //         console.error('Lỗi khi gọi API:', error);
    //         if (error.response) {
    //             // Lỗi từ server
    //             console.log('Status:', error.response.status);
    //             console.log('Data:', error.response.data);
    //             Alert.alert('Lỗi', error.response.data.message || 'Không thể đăng sản phẩm.');
    //         } else if (error.request) {
    //             // Không nhận được phản hồi (lỗi kết nối)
    //             console.log('Không có phản hồi từ server:', error.request);
    //             Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
    //         } else {
    //             // Lỗi khác
    //             console.log('Lỗi khác:', error.message);
    //             Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi yêu cầu.');
    //         }
    //     }
    // };

    const handlePost = async () => {
        if (!termAccept) {
            Alert.alert("Bạn phải đồng ý điều khoản trước khi đăng");
            return;
        }

        try {
            // Bắt đầu upload từng ảnh
            const uploadedUrls = [];

            for (const uri of images) {
                if (uri) {
                    const uploadedUrl = await postProductApi.uploadImage(uri);
                    uploadedUrls.push(uploadedUrl);
                }
            }

            const data = {
                ...product,
                categoryTitle: categoryTitle,
                pickupAddress: pickupAddress,
                imageUrls: uploadedUrls,
                userId: user?.id,
                termsAccepted: termAccept,
            };

            console.log('Dữ liệu gửi lên:', JSON.stringify(data, null, 2));
            const response = await postProductApi.createProduct(data);

            console.log("Phản hồi từ server:", response.data);
            Alert.alert("Đăng sản phẩm thành công!");

        } catch (error) {
            console.error('Lỗi khi xử lý đăng sản phẩm:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng sản phẩm.');
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
            <SafeAreaView style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <ImageUploadSection onchange={setImages} />
                    <CategorySelection onchange={(title) => setCategoryTitle(title)} />
                    <ProductDetails onchange={setProduct} />
                    <AddressSelection onchange={setPickupAddress} />
                    <View style={styles.checkboxRow}>
                        <Checkbox
                            status={termAccept ? 'checked' : 'unchecked'}
                            onPress={() => setTermAccept(!termAccept)} color="#2e384d"
                        />
                        <Text>Đồng ý với điều khoản sử dụng</Text>
                    </View>
                    <View style={styles.groupBtn}>
                        <TouchableOpacity style={styles.btnCancle}>
                            <Text style={styles.btnTextCancle}>Huỷ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={handlePost}
                        >
                            <Text style={styles.btnTextSubmit}>Đăng</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    checkboxRow: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupBtn: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 50,
    },
    btnCancle: {
        backgroundColor: '#e3eaec',
        width: '48%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnSubmit: {
        backgroundColor: '#323660',
        width: '48%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnTextCancle: {
        color: '#000',
        fontWeight: '600',
    },
    btnTextSubmit: {
        color: '#fff',
        fontWeight: '600',
    },

    // =========================
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
    btnDisabled: {
        backgroundColor: '#aaa',
    },
    btnCancel: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginRight: 8,
    },
    btnTextCancel: {
        color: '#333',
        fontSize: 16,
    },
});