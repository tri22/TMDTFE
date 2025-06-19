import axiosInstance from "./axiosInstance";

export interface Category {
  id: number;
  title: string;
  link: string;
  isDeleted: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  pwd: string;
  birthday: string | null;
  addresses: any[]; // bạn có thể định nghĩa rõ hơn nếu cần
  saledOrderQty: number;
  isDeleted: number;
}

export interface Thumbnail {
  id: number;
  url: string;
  alt: string;
  title: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  user: User;
  thumbnail: Thumbnail;
  description: string;
  images: any[]; // nếu có cấu trúc rõ hơn thì định nghĩa thêm
  comments: any[];
  isSold: number;
  isDeleted: number;
  createdAt: string;
}

// Hàm gọi API lấy danh sách wishlist theo userId

const wishlistAPI = {
  addWishlistByUserId: (userId: number, productId: number) => {
    return axiosInstance.post(`/wishlists/${userId}/add/${productId}`);
  },
  getWishlistByUserId: (userId: number) => {
    return axiosInstance.get(`/wishlists/${userId}`);
  },
};
export default wishlistAPI;
