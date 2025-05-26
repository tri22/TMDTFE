import { CategoryCount } from "@/models/CategoryCount";
import axiosInstance from './axiosInstance';

export async function getCategoryCount(): Promise<CategoryCount[]> {
  
  // test comment thi bat cai nay len
  // await AsyncStorage.setItem('userId', '1');

  try {
    const response = await axiosInstance.post<CategoryCount[]>('/categories/count', {});

    // Axios trả dữ liệu trong `response.data`, không dùng `.json()`
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi lấy category count:', error?.message || error);
    throw new Error('Không thể tải danh sách danh mục');
  }
}
