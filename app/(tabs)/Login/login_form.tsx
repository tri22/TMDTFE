
import { authApi } from "@/api/authApi";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import InputField from "./Components/InputField";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Chuyển hướng đến trang đăng ký
    const handleRegister = () => router.replace("/(tabs)/Login/register_form");

    // Chuyển hướng đến trang quên mật khẩu
    const handleForgetPass = () =>
        router.replace("/(tabs)/Login/password_recovery");
    const handleHomePage = () => router.push("/");

    // Chức năng đăng nhập
    const handleLogin = async () => {
        if (!email || !pwd) {
            alert("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }
        setIsLoading(true);
        try {
            const response = await authApi.login({ email, pwd });
            const userData = response.data;
            const token = response.data.token;

            console.log("Đăng nhập thành công:", userData);
            console.log("Đăng nhập thành công:", token);
            // Lưu thông tin user vào AsyncStorage
            if (token) {
                await AsyncStorage.setItem('token', token);
            } else {
                console.error("Token is undefined");
            }
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            handleHomePage();
        } catch (error) {
            console.error("Đăng nhập thất bại:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formWrapper1}>
                <Text style={styles.titleHead}>Đăng nhập</Text>
                <Text style={styles.greet}>Chào mừng bạn quay trở lại</Text>
            </View>
            <View style={styles.formWrapper2}>
                <InputField placeholder="Email" value={email} onChangeText={setEmail} />

                <InputField
                    placeholder="Mật khẩu"
                    value={pwd}
                    onChangeText={setPwd}
                    secureTextEntry={!showPwd}
                    rightIcon={
                        <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
                            <Feather
                                name={showPwd ? "eye" : "eye-off"}
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    }
                />
            </View>
            <View style={styles.formWrapper}>
                <Text style={styles.forPassText} onPress={handleForgetPass}>
                    Quên mật khẩu ?
                </Text>
            </View>
            <View style={styles.formWrapper2}>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginBtnText}>
                        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ggLoginBtn} onPress={handleHomePage}>
                    <Text style={styles.ggLoginBtnText}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fbLoginBtn} onPress={handleHomePage}>
                    <Text style={styles.fbLoginBtnText}>Đăng nhập bằng Facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formWrapper3}>
                <Text style={styles.questText}>Bạn chưa có tài khoản ?</Text>
                <Text style={styles.registerText} onPress={handleRegister}>
                    Đăng ký ngay
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
        justifyContent: "center",
    },
    formWrapper1: {
        width: "100%",
        marginVertical: 20,
        marginTop: 130,
    },
    titleHead: {
        fontSize: 40,
        fontWeight: "700",
    },
    greet: {
        fontSize: 18,
    },
    formWrapper2: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    input: {
        width: "95%",
        height: 55,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 40,
        backgroundColor: "#f1f1f1",
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    passwordContainer: {
        width: "95%",
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 40,
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
    passwordInput: {
        flex: 1,
    },
    formWrapper: {
        width: "90%",
        alignItems: "flex-start",
    },
    forPassText: {
        color: "#4e5276",
        fontWeight: "500",
    },
    loginBtn: {
        width: "60%",
        borderRadius: 16,
        backgroundColor: "#323660",
        alignItems: "center",
        paddingVertical: 10,
        marginTop: 10,
    },
    loginBtnText: {
        fontSize: 22,
        fontWeight: "300",
        color: "#f3f3f3",
    },
    ggLoginBtn: {
        width: "90%",
        backgroundColor: "#FFEBEB",
        alignItems: "center",
        borderRadius: 16,
        paddingVertical: 15,
        marginTop: 50,
        marginBottom: 10,
    },
    ggLoginBtnText: {
        fontWeight: "500",
        fontSize: 15,
        color: "#707070",
    },
    fbLoginBtn: {
        width: "90%",
        backgroundColor: "#E5EBFC",
        alignItems: "center",
        borderRadius: 16,
        paddingVertical: 15,
        marginBottom: 10,
    },
    fbLoginBtnText: {
        fontWeight: "500",
        fontSize: 15,
        color: "#707070",
    },
    formWrapper3: {
        flex: 1,
        flexDirection: "row",
    },
    questText: {
        fontWeight: "300",
        fontSize: 15,
        marginRight: 10,
    },
    registerText: {
        fontWeight: "900",
        color: "#4472C4",
        fontSize: 15,
    },
});
