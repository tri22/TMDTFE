import { BottomNavigation } from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SERVER_URL_BASE } from "../../../api/ipConstant";
import userApi, { UserRequest } from '../../../api/userApi';


const ProfileSetting = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.getUserById(4);
                const user = response.data;
                console.log(user);
                if (user) {
                    setBirthDate(new Date(user.birthday));
                    setEmail(user.email)
                    setFullName(user.name)
                    setPhone(user.phone)
                    setAvatar(user.imageUrl)

                }
            } catch (error) {
                console.error("Lỗi khi lấy người dùng:", error);
            }
        };

        fetchUser();
    }, []);

    const updateInfoHandler = () => {
        const updatedUser: UserRequest = {
            fullName: fullName,
            email: email,
            birthday: birthDate,
            phone: phone,
            avatar: avatar
        };

        userApi.upadtetUserById(4, updatedUser)
            .then(res => {
                console.log("Cập nhật thành công", res.data);
                Alert.alert("Thành công", "Cập nhật thông tin thành công!");
            })
            .catch(err => {
                console.error("Cập nhật thất bại", err);
                Alert.alert("Lỗi", "Cập nhật thất bại. Vui lòng thử lại sau!");
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}
                style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
                {/* Avatar */}
                <View style={styles.center}>
                    <Image
                        source={{ uri: `${SERVER_URL_BASE}/images/avatars/${avatar}` }}
                        style={styles.avatar}
                    />

                </View>

                {/* Thông tin tài khoản */}
                <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
                <View style={styles.field}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <TextInput style={styles.input} placeholder="Họ và tên" defaultValue={fullName} onChangeText={setFullName} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" defaultValue={email} onChangeText={setEmail} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Số điện thoại</Text>
                    <TextInput style={styles.input} placeholder="Số điện thoại" defaultValue={phone} onChangeText={setPhone} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Ngày sinh</Text>
                    <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setBirthDate(selectedDate);
                            }
                        }}
                        style={{ marginLeft: -15, }}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Ảnh đại diện</Text>
                    <TextInput style={styles.input} placeholder="Đường dẫn ảnh" defaultValue={avatar} onChangeText={setAvatar} />
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
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.iconButton}
                    >
                        <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Đổi Mật Khẩu</Text>
                </TouchableOpacity>

            </ScrollView>
            <BottomNavigation></BottomNavigation>
        </SafeAreaView>
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
    }
});

