import { SERVER_URL_BASE } from '@/api/ipConstant';
import userApi from '@/api/userApi';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Feather, Ionicons } from '@expo/vector-icons'; // icon thư viện phổ biến
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


export interface User {
    id?: number;
    name?: string;
    email?: string;
    birthday?: string;
    phone?: string;
    avatar?: string;
    token?: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    qty: number;
    images: {
        id: number;
        url: string;
        alt: string;
    }[];
};


export default function ProfileScreen() {
    const navigateSetting = () => router.push('/(tabs)/Settings');
    const navigateEdit = () => router.push('/(tabs)/Setting/ProfileSetting')
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    // Phần hiển thị toast đã thành công sau khi đăng sản phẩm
    const { toast } = useLocalSearchParams();
    useEffect(() => {
        if (toast === 'success') {
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Đăng sản phẩm thành công!',
            });
        }
    }, [toast]);

    // Lấy ra user được lưu trong AsyncStorage
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                    console.log(JSON.parse(userData))
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                if (user?.id) {
                    const response = await userApi.getProductsByUser(user.id);
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm của user:', error);
            }
        };

        if (user?.id) {
            fetchUserProducts();
        }
    }, [user]);


    // Điều hướng qua trang PostProduct
    const navigatePostProduct = () => {
        router.push('/(tabs)/Profile/PostProduct')
    }

    // Điều hướng qua trang PostProduct
    const handleEditProduct = (item: Product) => {
        router.push({
            pathname: '/(tabs)/Profile/EditProduct',
            params: { id: item.id.toString() }
        });

    }
    console.log(user?.avatar);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.profileHeader}>
                    <Image
                        source={{
                            uri: user?.avatar
                                ? `${SERVER_URL_BASE}/${user?.avatar}`
                                : 'http://192.168.1.2:8080/uploads/category-dong-ho-1.png',
                        }}
                        style={styles.avatar}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{user?.name || 'Ẩn danh'}</Text>
                        <View style={styles.verifiedContainer}>
                            <View style={styles.verifiedIcon}>
                                <Ionicons name="checkmark" size={12} color="#fff" />
                            </View>
                            <Text style={styles.verifiedText}>Đã xác minh</Text>
                        </View>
                    </View>
                    <View style={styles.actionGroup}>
                        <TouchableOpacity onPress={navigateEdit} style={[styles.actionButton, { backgroundColor: '#4472c4' }]}>
                            <Feather name="edit-3" size={18} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#f8f8f8' }]}>
                            <View style={styles.notificationDot} />
                            <Ionicons name="notifications-outline" size={20} color="#4472c4" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateSetting} style={[styles.actionButton, { backgroundColor: '#f8f8f8' }]}>
                            <Ionicons name="settings-outline" size={20} color="#4472c4" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.cardContent}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>Đăng bán sản phẩm của bạn!</Text>
                            <Text style={styles.cardDescription}>Sản phẩm của bạn đang chờ người mua, hãy mô tả ngay!</Text>
                        </View>
                        <TouchableOpacity onPress={navigatePostProduct}>
                            <View style={styles.cardIcon}>
                                <Ionicons name="images" size={20} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.orderTrackingSection}>
                    <Text style={styles.orderTrackingTitle}>Theo dõi đơn hàng</Text>
                    <View style={styles.orderButtonGroup}>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Đã đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Đang giao</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Đã nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.sellingSection}>
                    <Text style={styles.sellingTitle}>Sản phẩm đang bán</Text>
                    <View style={styles.productGrid}>
                        {products.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.productCard} onPress={() => handleEditProduct(item)}>
                                <Image
                                    source={{ uri: `${SERVER_URL_BASE}/${item.images[0].url}` }}
                                    style={styles.productImageCard}
                                    resizeMode="cover"
                                />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.productPrice}>{item.price} vnđ</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <BottomNavigation></BottomNavigation>
            <Toast />
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center'
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    nameContainer: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    verifiedIcon: {
        backgroundColor: '#28a745',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    verifiedText: {
        fontSize: 12,
        color: '#28a745',
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 6,
    },
    notificationDot: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4472c4',
        zIndex: 1,
    },

    // View thứ 2
    cardContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        marginBottom: 16,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323660',
        marginBottom: 4,
    },

    cardDescription: {
        fontSize: 14,
        color: '#323660',
    },

    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#323660',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },

    // View thứ 3
    orderTrackingSection: {
        width: '100%',
        alignItems: 'flex-start',
    },
    orderTrackingTitle: {
        fontSize: 22,
        color: '#323660',
        marginBottom: 12,
        fontWeight: 'bold',
    },
    orderButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    orderButton: {
        flex: 1,
        backgroundColor: '#e5ebfc',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#0042e0',
    },
    // View thứ 4
    savedProductsSection: {
        width: '100%',
        marginTop: 30,
    },
    savedTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#323660',
        marginBottom: 10,
    },
    imageCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#323660',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    productImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    // View thứ 5
    sellingSection: {
        marginTop: 20,
        marginBottom: 70,
    },
    sellingTitle: {
        fontSize: 22,
        color: '#323660',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 4,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: 240, // chiều cao cố định
    },

    productImageCard: {
        width: '100%',
        height: 160,
        borderRadius: 5,
        marginBottom: 8,
    },

    productInfo: {
        flex: 1,
        flexDirection: 'column',
        padding: 4
    },

    productName: {
        fontSize: 14,
        color: '#333',
        alignSelf: 'flex-start',
    },

    productPrice: {
        fontSize: 14,
        color: '#202020',
        fontWeight: 'bold',
    },


});