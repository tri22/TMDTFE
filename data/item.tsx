import getWishlistByUserId from "@/api/WishlistAPI";

interface Item {
  id: number;
  image: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

const cartItems: Item[] = [];
async function fetchData(id: number) {
  try {
    const data = await getWishlistByUserId(id);
    for (const item of data) {
      const { id, thumbnail, name, price } = item;
      cartItems.push({
        id,
        image: thumbnail.url,
        name,
        price,
        color: "defaultColor", // Bạn có thể thay đổi giá trị này nếu cần
        size: "defaultSize", // Bạn có thể thay đổi giá trị này nếu cần
        quantity: 1, // Mặc định số lượng là 1
      });
    }
    // xử lý data ở đây
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
  }
}

fetchData(3);

// Sample data for the cart items

export default cartItems;
export type { Item };
