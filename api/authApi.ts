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
export interface ForgotPasswordRequest {
    email: string;
}

export interface ResendCodeRequest {
    email: string;
}

export interface VerifyCodeRequest {
    email: string;
    code: string;
}

export interface ResetPasswordRequest {
    email: string;
    password: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<AxiosResponse<UserResponse>> =>
        await axiosInstance.post<UserResponse>('/users/login', data),

    register: async (data: RegisterRequest): Promise<AxiosResponse<UserResponse>> =>
        await axiosInstance.post<UserResponse>('/users/register', data),

    forgotPassword: async (data: ForgotPasswordRequest): Promise<AxiosResponse<any>> =>
        await axiosInstance.post('/users/forgot-password', data),

    resendCode: async (data: ResendCodeRequest): Promise<AxiosResponse<any>> =>
        await axiosInstance.post('/users/resend-code', data),

    verifyCode: async (data: VerifyCodeRequest): Promise<AxiosResponse<any>> =>
        await axiosInstance.post('/users/verify-code', data),

    resetPassword: async (data: ResetPasswordRequest): Promise<AxiosResponse<any>> =>
        await axiosInstance.post('/users/reset-password', data),
};
