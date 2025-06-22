import { AxiosResponse } from "axios";
import * as FileSystem from 'expo-file-system';
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
    },
    createProduct: async (data: any): Promise<AxiosResponse<any>> => {
        return await axiosInstance.post('/products/create', data);
    },

    uploadImage: async (uri: string): Promise<string> => {
        try {
            // Lấy tên file từ uri
            const fileName = uri.split('/').pop() || `image_${Date.now()}.jpg`;

            // Lấy thông tin file để xác định type MIME (image/jpeg, png, ...)
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) {
                throw new Error('Ảnh không tồn tại tại URI đã chọn');
            }

            const formData = new FormData();

            formData.append('file', {
                uri,
                name: fileName,
                type: 'image/jpeg', // Bạn có thể cải tiến bằng cách suy ra MIME từ fileName nếu cần
            } as any);

            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data; // URL trả về từ server (uploads/...)
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    },

    getAllMaterial: async (): Promise<AxiosResponse<string[]>> => {
        return await axiosInstance.get<string[]>('/products/material');
    },
}