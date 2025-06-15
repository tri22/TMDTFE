import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Định nghĩa interface cho Category
export interface Category {
    id: number;
    title: string;
    link: string;
    isDeleted: boolean;
}

// API gọi đến backend để lấy tất cả danh mục
export const postProductApi = {
    getAllCategories: async (): Promise<AxiosResponse<Category[]>> => {
        return await axiosInstance.get<Category[]>('/categories');
    }
}