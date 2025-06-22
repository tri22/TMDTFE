
import * as FileSystem from 'expo-file-system';
import axiosInstance from "./axiosInstance";

export interface UserRequest {
    id?: number;
    fullName: String;
    email: String;
    birthday: Date;
    phone: String;
    avatar: String;
}

export interface AddressRequest {
    id?: number;
    province: string;
    district: string;
    ward: string;
    detail: string;
    phone: string;
    userId?: number;
}

const userApi = {
    getCurrentUser: () => {
        return axiosInstance.get(`/users/me`);
    },

    getUserById: (userId: number) => {
        return axiosInstance.get(`/users/${userId}`);
    },

    upadtetUserById: (userId: number, data: UserRequest) => {
        return axiosInstance.put(`/users/${userId}`, data);
    },
  
  addUserAddress:(data: AddressRequest)=>{
    return axiosInstance.post(`/users/add-address`,data)
  },

  upadtetUserAddressById: (data: AddressRequest) => {
    return axiosInstance.put(`/users/address-update`, data);
  },

    upadtetUserAddressById: (data: AddressRequest) => {
        return axiosInstance.put(`/users/address-update`, data);
    },

    getUserAddress: (userId: number) => {
        return axiosInstance.get(`/users/address-list/${userId}`);
    },

    getUserSpending: (userId: number) => {
        return axiosInstance.get(`/users/spending/${userId}`);
    },

    getProductsByUser: (userId: number) => {
        return axiosInstance.get(`/products/seller/${userId}`);
    },

    uploadAvatarImage: async (uri: string): Promise<string> => {
        try {
            const fileName = uri.split('/').pop() || `avatar_${Date.now()}.jpg`;
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) {
                throw new Error('File không tồn tại');
            }

            const formData = new FormData();
            formData.append('file', {
                uri,
                name: fileName,
                type: 'image/jpeg', // hoặc kiểm tra extension để đổi thành image/png nếu cần
            } as any);

            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data; // Trả về 'uploads/ten_anh.jpg'
        } catch (error) {
            console.error('Upload ảnh thất bại:', error);
            throw error;
        }
    },
};

export default userApi;