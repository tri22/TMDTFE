import { PaginatedProductsResult, ProductItemModel, ProductResponse } from "@/models/ProductItemModel";
import axiosInstance from './axiosInstance';

// export async function getByCategory(categoryLink: String): Promise<ProductItemModel[]> {
//   try {
//     const response = await axiosInstance.post<ProductItemModel[]>(`/products/${categoryLink}`, {});

//        const products = response.data.content.map((item: any): ProductItemModel => ({
//       id: item.id,
//       name: item.name,
//       price: item.price,              // ✅ giữ nguyên là number
//       thumbnail: item.thumbnail,
//       isSold: item.sold               // ✅ map từ 'sold' -> 'isSold'
//     }));

//     return products;
//   } catch (error: any) {
//     console.error('Lỗi khi lấy category count:', error?.message || error);
//     throw new Error('Không thể tải danh sách danh mục');
//   }
// }

export async function getProductsByCategory(
  categoryLink: string, 
  page: number,         
): Promise<PaginatedProductsResult> {
  console.log("getProductsByCategory:" + categoryLink+ " page: " + page );
  try {
    const response = await axiosInstance.post<ProductResponse<any>>(
      `/products/${categoryLink}`,{},
      {
        params: { 
          page,
        }
      }
    );

    const responseData = response.data;

    const products: ProductItemModel[] = responseData.content.map((item: any): ProductItemModel => ({
      id: item.id,
      name: item.name +" id" + item.id,
      price: item.price,
      thumbnail: item.thumbnail,
      isSold: item.sold, 
    }));

    return {
      products: products,
      isFirst: responseData.last,
      isLast: responseData.last, 
      nextPage: !responseData.last ? responseData.number + 1 : 0,
    };

  } catch (error: any) {
    console.error('Lỗi khi lấy sản phẩm theo category (paginated):', error?.response?.data || error?.message || error);
    throw new Error('Không thể tải danh sách sản phẩm.');
  }
}
