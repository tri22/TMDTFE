import {
    AntDesign,
    Feather,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export const BottomNavigation: React.FC = () => {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false); // 👈 Trạng thái hiển thị modal
    const getIconColor = (path: string) => {
        return pathname === path ? "#FF6347" : "#4472C4"; // Màu đỏ cho icon active, xanh cho không active
    };
    const handleProfilePress = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (!userData) {
                setShowModal(true); // 👈 Hiển thị modal
                return;
            }
            router.push('/(tabs)/Profile');
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Link href="/(tabs)" asChild>
                <Pressable style={styles.iconWrapper}>
                    <Feather name="home" size={24} color={getIconColor("/(tabs)")} />
                </Pressable>
            </Link>

            <Link href="/(tabs)/WishlistScreen" asChild>
                <Pressable style={styles.iconWrapper}>
                    <AntDesign name="hearto" size={24} color={getIconColor("/(tabs)")} />
                </Pressable>
            </Link>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.iconWrapper}>
                    <MaterialIcons
                        name="list-alt"
                        size={24}
                        color={getIconColor("/(tabs)")}
                    />
                </Pressable>
            </Link>

            <Link href="/(tabs)/CartlistScreen" asChild>
                <Pressable style={styles.iconWrapper}>
                    <Feather name="bookmark" size={24} color={getIconColor("/(tabs)")} />
                </Pressable>
            </Link>

            <Pressable style={styles.iconWrapper} onPress={handleProfilePress}>
                <FontAwesome5
                    name="user"
                    size={24}
                    color={getIconColor("/(tabs)/Profile")}
                />
            </Pressable>

            {/* Modal thông báo khi chưa đăng nhập */}
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bạn cần đăng nhập</Text>
                        <Text style={styles.modalText}>Vui lòng đăng nhập để truy cập trang Profile</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setShowModal(false);
                                    router.push('/(tabs)/MainLogin'); // Chuyển sang trang đăng nhập
                                }}
                            >
                                <Text style={styles.modalButtonText}>Đăng nhập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#aaa' }]}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.16,
        shadowRadius: 1,
        elevation: 5,
        zIndex: 999, // đảm bảo không bị che
    },

    iconWrapper: {
        width: 24,
        height: 24,
        bottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    modalButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
