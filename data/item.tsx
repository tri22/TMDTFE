import { SERVER_BASE_URL } from "@/api/ipConstant";
import wishlistAPI from "@/api/WishlistAPI";
interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onDelete: (id: number) => void;
}

const cartItems: Item[] = [];
export default async function fetchDataWishlist(id: number) {
  try {
    const object = await wishlistAPI.getWishlistByUserId(id);

    for (const item of object.data) {
      const { id, name, price, imageUrl, qty } = item; // <-- use image

      cartItems.push({
        id,
        name,
        price,
        imageUrl: SERVER_BASE_URL + "/" + imageUrl, // <-- use image here
        quantity: qty,
        onDelete: function (id: number): void {},
      });
    }

    return cartItems; // trả về mảng cartItems sau khi đã xử lý
    // xử lý data ở đây
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
    return []; // trả về mảng rỗng nếu có lỗi
  }
}

export type { Item };
