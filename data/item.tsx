interface Item {
  id: number;
  image: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

const cartItems: Item[] = [
  {
    id: 1,
    image: "https://example.com/jacket.png",
    name: "Jacket Champion - Hàng 2hand, legit",
    price: 250.0,
    color: "Pink",
    size: "M",
    quantity: 1,
  },
  {
    id: 2,
    image: "https://example.com/glasses.png",
    name: "Kính mát Chanel nữ authentic",
    price: 170.0,
    color: "Pink",
    size: "M",
    quantity: 1,
  },
];

export default cartItems;
export type { Item };
