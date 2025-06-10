import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { API_BASE_URL } from "./ipConstant";

//chinh ve dia chi cua spring boot neu chay fe tren dien thoai: 

// vd: ip của spring boot: 192.168.1.100
// thi chinh http://localhost:8080 thanh http://192.168.1.100:8080

// trinh duyet
// const API_BASE = "http://localhost:8080/api/v1";
// export const SERVER_URL_BASE = "http://localhost:8080";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const showToast = (
    type: "success" | "error" | "info",
    text1: string,
    text2?: string
): void => {
    Toast.show({
        type,
        text1,
        text2,
        position: "top",
        visibilityTime: 2000,
    });
};

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<any>) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                showToast("info", "Phiên đăng nhập đã hết hạn");
            } else if (status === 403) {
                showToast("error", "Bạn không có quyền truy cập");
            } else if (status === 500) {
                showToast("error", "Lỗi máy chủ, vui lòng thử lại sau");
            } else {
                const message =
                    (error.response.data as { message?: string })?.message ||
                    "Đã xảy ra lỗi";
                showToast("error", message);
            }
        } else {
            showToast("error", "Không thể kết nối đến máy chủ");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
