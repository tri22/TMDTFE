import axios from "axios";
import { API_BASE_URL } from "./ipConstant";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Thời gian chờ 10 giây
  headers: {
    "Content-Type": "application/json",
  },
}); 

// Không cần interceptors để gắn token nữa
// Nhưng vẫn giữ interceptor response để xử lý lỗi chung nếu cần

axiosInstance.interceptors.response.use( 
  (response) => response,
  (error) => {
    console.log("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
