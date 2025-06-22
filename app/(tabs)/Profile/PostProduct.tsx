import { showToast } from '@/api/axiosInstance';
import { postProductApi } from '@/api/postApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AddressSelection from './components/AddressSelection';
import CategorySelection from './components/CategorySelection';
import ImageUploadSection from './components/ImageUploadSection';
import ProductDetails from './components/ProductDetails';
import { commonStyles } from './styles/PostPdStyle';

export default function PostProductScreen() {
    const [formData, setFormData] = useState({
        product: {},
        pickupAddress: '',
        images: [],
        categoryTitle: '',
        termAccept: false,
    });

    interface User {
        id: string;
        [key: string]: any;
    }
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
                showToast('error', 'lỗi', 'Không thể lấy thông tin người dùng');
            }
        };
        fetchUser();
    }, []);

    const updateFormData = useCallback((key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    }, []);

    const uploadImages = async (images: string[]) => {
        try {
            const uploadedUrls = [];
            for (const uri of images) {
                if (uri) {
                    const uploadedUrl = await postProductApi.uploadImage(uri);
                    uploadedUrls.push(uploadedUrl);
                }
            }
            return uploadedUrls;
        } catch (error) {
            showToast('error', 'Lỗi', 'Không thể upload ảnh.');
        }
    };

    const handlePost = async () => {
        if (!formData.termAccept) {
            showToast('info', 'Thông báo', 'Bạn phải đồng ý với điều khoản sử dụng');
            return;
        }

        try {
            const uploadedUrls = await uploadImages(formData.images);
            const data = {
                ...formData.product,
                categoryTitle: formData.categoryTitle,
                pickupAddress: formData.pickupAddress,
                imageUrls: uploadedUrls,
                userId: user?.id,
                termsAccepted: formData.termAccept,
            };

            const response = await postProductApi.createProduct(data);
            console.log('Phản hồi từ server:', response.data);
            showToast('success', 'Thành công', 'Đăng sản phẩm thành công!');
            router.replace({ pathname: '/(tabs)/Profile', params: { toast: 'success' } });
        } catch (error: any) {
            console.error('Lỗi khi đăng sản phẩm:', error);
            showToast('error', 'lỗi', 'Lỗi khi đăng sản phẩm!');
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <ImageUploadSection onChange={useCallback((images: string[]) => updateFormData('images', images), [updateFormData])} />
                <CategorySelection onChange={useCallback((title: string) => updateFormData('categoryTitle', title), [updateFormData])} />
                <ProductDetails onChange={useCallback((product: any) => updateFormData('product', product), [updateFormData])} />
                <AddressSelection onChange={useCallback((address: string) => updateFormData('pickupAddress', address), [updateFormData])} />
                <View style={styles.checkboxRow}>
                    <Checkbox
                        status={formData.termAccept ? 'checked' : 'unchecked'}
                        onPress={() => updateFormData('termAccept', !formData.termAccept)}
                        color="#2e384d"
                    />
                    <Text>Đồng ý với điều khoản sử dụng</Text>
                </View>
                <View style={styles.groupBtn}>
                    <TouchableOpacity style={[commonStyles.button, styles.btnCancel]}>
                        <Text style={[commonStyles.buttonText, styles.btnTextCancel]}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonStyles.button, styles.btnSubmit]} onPress={handlePost}>
                        <Text style={[commonStyles.buttonText, styles.btnTextSubmit]}>Đăng</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Toast></Toast>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    checkboxRow: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupBtn: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    btnCancel: {
        backgroundColor: '#e3eaec',
    },
    btnSubmit: {
        backgroundColor: '#323660',
    },
    btnTextCancel: {
        color: '#000',
    },
    btnTextSubmit: {
        color: '#fff',
    },
});