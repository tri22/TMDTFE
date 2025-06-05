import getWishlistByUserId from "@/api/WishlistAPI";
interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

const cartItems: Item[] = [];
export default async function fetchDataWishlist(id: number) {
  try {
    const data = await getWishlistByUserId(id);
    for (const item of data) {
      const { id, name, price, imageUrl, qty } = item; // <-- use image
      cartItems.push({
        id,
        name,
        price,
        imageUrl: imageUrl, // <-- use image here
        quantity: qty,
      });
      console.log("Item added to cartItems:");
    }

    return cartItems; // trả về mảng cartItems sau khi đã xử lý
    // xử lý data ở đây
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
    return []; // trả về mảng rỗng nếu có lỗi
  }
}

export type { Item };
