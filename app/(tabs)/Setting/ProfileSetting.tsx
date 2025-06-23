import { authApi } from "@/api/authApi";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import { SERVER_URL_BASE } from "../../../api/ipConstant";
import userApi, { UserRequest } from '../../../api/userApi';

interface User {
    id: number
    name: string,
    email: string,
    phone: string;
    avatar: string,
    role: string,
    token: string
}


const ProfileSetting = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    // Lấy ra user được lưu trong AsyncStorage
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                console.log("Userdata", userData);
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
            }
        };
        fetchUser();
    }, []);

    // Lấy ra thông tin của user 
    useEffect(() => {
        if (!user) return;

        const fetchUserFromAPI = async () => {
            try {
                const response = await userApi.getUserById(user?.id);
                const fetchedUser = response.data;
                console.log('fetchUserData: ', fetchedUser);
                if (fetchedUser) {
                    if (fetchedUser.birthday && !isNaN(new Date(fetchedUser.birthday).getTime())) {
                        setBirthDate(new Date(fetchedUser.birthday));
                    } else {
                        // fallback nếu birthday không hợp lệ
                        setBirthDate(new Date(2000, 0, 1)); // ví dụ mặc định là 01/01/2000
                    }
                    setEmail(fetchedUser.email as string);
                    setFullName(fetchedUser.name);
                    setPhone(fetchedUser.phone);
                    setAvatar(fetchedUser.avatar);
                }
            } catch (error) {
                console.error("Lỗi khi lấy người dùng từ API:", error);
            }
        };

        fetchUserFromAPI();
    }, [user]);

    const updateInfoHandler = async () => {
        if (!user) {
            Alert.alert("Lỗi", "Không tìm thấy người dùng.");
            return;
        }

        try {
            let avatarPath = avatar;

            // Nếu previewAvatar tồn tại và là ảnh local => upload
            if (previewAvatar && (previewAvatar.startsWith("file://") || previewAvatar.startsWith("data:"))) {
                avatarPath = await userApi.uploadAvatarImage(previewAvatar);
            }

            const updatedUser: UserRequest = {
                fullName: fullName,
                email: email,
                birthday: birthDate,
                phone: phone,
                avatar: avatarPath,
            };

            await userApi.upadtetUserById(user.id, updatedUser);

            const response = await userApi.getUserById(user.id);
            const freshUser = response.data;

            await AsyncStorage.setItem('user', JSON.stringify(freshUser));
            setUser(freshUser);

            Alert.alert("Thành công", "Cập nhật thông tin thành công!");
        } catch (err) {
            console.error("Cập nhật thất bại", err);
            Alert.alert("Lỗi", "Cập nhật thất bại. Vui lòng thử lại sau!");
        }
    };

    const handlePickAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Thông báo', 'Bạn cần cấp quyền truy cập thư viện ảnh.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setPreviewAvatar(selectedImageUri); // chỉ thay đổi ảnh preview
        }
    };

    const handleChangePassword = async () => {
        if (!user) {
            Alert.alert("Lỗi", "Không tìm thấy người dùng.");
            return;
        }

        // Kiểm tra mật khẩu cũ (gọi API để kiểm tra)
        try {
            const loginResponse = await authApi.login({
                email: user.email,
                pwd: oldPassword,
            });
            if (!loginResponse.data) {
                Alert.alert("Lỗi", "Mật khẩu cũ không đúng.");
                return;
            }
        } catch (error) {
            Alert.alert("Lỗi", "Mật khẩu cũ không đúng.");
            return;
        }

        // Kiểm tra mật khẩu mới và xác nhận
        if (newPassword !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }

        // Gửi yêu cầu forgot password để nhận mã xác thực
        try {
            await authApi.forgotPassword({ email: user.email });
            setShowVerificationModal(true); // Hiển thị modal
            Alert.alert("Thành công", "Mã xác thực đã được gửi đến email của bạn.");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể gửi mã xác thực. Vui lòng thử lại.");
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            Alert.alert("Lỗi", "Vui lòng nhập mã xác thực.");
            return;
        }

        try {
            // Xác minh mã
            console.log("Sending verification:", {
                email: user?.email,
                code: verificationCode,
            });
            if (!user?.email) {
                Alert.alert("Lỗi", "Không tìm thấy email người dùng.");
                return;
            }
            const verifyResponse = await authApi.verifyCode({
                email: user?.email,
                code: verificationCode,
            });
            console.log('verifyResponse.data.isValid:', verifyResponse.data.success)
            if (!verifyResponse.data.success) {
                Alert.alert("Lỗi", "Mã xác thực không đúng.");
                return;
            }

            // Reset mật khẩu
            await authApi.resetPassword({
                email: user?.email,
                password: newPassword,
            });

            setShowVerificationModal(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setVerificationCode("");
            Alert.alert("Thành công", "Mật khẩu đã được đổi thành công!");
        } catch (error) {
            Alert.alert("Lỗi", "Xác thực thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={0} // Giá trị này nên điều chỉnh theo header/toolbar của bạn>
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }}
                    style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={styles.center}>
                        {previewAvatar ? (
                            <Image source={{ uri: previewAvatar }} style={styles.avatar} />
                        ) : avatar ? (
                            <Image source={{ uri: `${SERVER_URL_BASE}/${avatar}` }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ color: '#fff' }}>Chưa có ảnh</Text>
                            </View>
                        )}
                    </View>

                    {/* Thông tin tài khoản */}
                    <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
                    <View style={styles.field}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput style={styles.input} placeholder="Họ và tên" defaultValue={fullName} onChangeText={setFullName} />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Email" defaultValue={email} onChangeText={setEmail} editable={false} />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput style={styles.input} placeholder="Số điện thoại" defaultValue={phone} onChangeText={setPhone} />
                    </View>
                    <View style={styles.field}>
                        <View style={styles.field}>
                            <View style={styles.field}>
                                <Text style={styles.label}>Ngày sinh</Text>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                                    <Text>
                                        {birthDate instanceof Date && !isNaN(birthDate.getTime())
                                            ? birthDate.toLocaleDateString('vi-VN')
                                            : "Chưa có ngày sinh"}
                                    </Text>
                                </TouchableOpacity>

                                <DatePickerModal
                                    locale="en"
                                    mode="single"
                                    visible={showDatePicker}
                                    onDismiss={() => setShowDatePicker(false)}
                                    date={birthDate}
                                    onConfirm={(params) => {
                                        setShowDatePicker(false);
                                        if (params.date) {
                                            const adjustedDate = new Date(params.date);
                                            adjustedDate.setHours(12);
                                            setBirthDate(adjustedDate);
                                        }
                                    }}

                                />
                            </View>

                        </View>

                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Ảnh đại diện</Text>
                        <TouchableOpacity style={styles.chooseImageButton} onPress={handlePickAvatar}>
                            <Text style={styles.chooseImageText}>Chọn file ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={updateInfoHandler}>Cập Nhật</Text>
                    </TouchableOpacity>

                    {/* Đổi mật khẩu */}
                    <Text style={styles.sectionTitle}>Đổi mật khẩu</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            placeholder="Mật khẩu cũ"
                            style={styles.inputWithIcon}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.iconButton}
                        >
                            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            secureTextEntry={!showNewPassword}
                            placeholder="Mật khẩu mới"
                            style={styles.inputWithIcon}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            style={styles.iconButton}
                        >
                            <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            secureTextEntry={!showConfirmPassword}
                            placeholder="Xác nhận mật khẩu"
                            style={styles.inputWithIcon}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.iconButton}
                        >
                            <Ionicons
                                name={showConfirmPassword ? "eye" : "eye-off"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Đổi Mật Khẩu</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={showVerificationModal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setShowVerificationModal(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Nhập mã xác thực</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Nhập mã xác thực từ email"
                                    value={verificationCode}
                                    onChangeText={setVerificationCode}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleVerifyCode}
                                >
                                    <Text style={styles.modalButtonText}>Xác nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalCancelButton}
                                    onPress={() => setShowVerificationModal(false)}
                                >
                                    <Text style={styles.modalCancelText}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
            <BottomNavigation></BottomNavigation>
        </KeyboardAvoidingView>
    );
};

export default ProfileSetting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 48,
        paddingRight: 20,
        paddingLeft: 20,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 16,
        color: "#111",
    },
    center: {
        alignItems: "center",
        marginBottom: 16,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: "#ccc",
    },
    avatarText: {
        marginTop: 8,
        fontSize: 13,
        color: "#007AFF",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 24,
        marginBottom: 12,
        color: "#1e1b4b",
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: "#333",
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#f1f5f9",
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    field: {
        marginBottom: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    button: {
        backgroundColor: "#1e1b4b",
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 24,
        marginBottom: 32,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    inputWrapper: {
        position: "relative",
        marginBottom: 16,
    },
    inputWithIcon: {
        backgroundColor: "#f1f5f9",
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        paddingRight: 40,
    },
    iconButton: {
        position: "absolute",
        right: 12,
        top: 12,
    },
    mb100: {
        marginBottom: 100,
    },
    chooseImageButton: {
        marginTop: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#1e1b4b',
        borderRadius: 6,
    },
    chooseImageText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Các style cho modal
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalInput: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    modalCancelButton: {
        marginTop: 10,
    },
    modalCancelText: {
        color: "#ff0000",
        fontSize: 14,
    },
});

