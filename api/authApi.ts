import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface LoginRequest {
    email: string;
    pwd: string;
}

export interface RegisterRequest {
    email: string;
    pwd: string;
    phone: number;
}

export interface UserResponse {
    id?: string;
    name?: string;
    email?: string;
    birthday?: string;
    phone?: string;
    imageUrl?: string;
    token?: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<AxiosResponse<UserResponse>> => {
        return await axiosInstance.post<UserResponse>('/users/login', data);
    },

    register: async (data: RegisterRequest): Promise<AxiosResponse<UserResponse>> => {
        return await axiosInstance.post<UserResponse>('/users/register', data);
    },

}
