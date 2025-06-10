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
    id: number;
    province: string;
    district: string;
    ward: string;
    detail: string;
    phone: string;
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

    upadtetUserAddressById: (data: AddressRequest) => {
        return axiosInstance.put(`/users/address-update`, data);
    },

    getUserAddress: (userId: number) => {
        return axiosInstance.get(`/users/address-list/${userId}`);
    }

}


export default userApi;