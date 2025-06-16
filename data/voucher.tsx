interface Voucher {
  id: number;
  title: string;
  description: string;
  discount: number;
  expiry: string;
}

const vouchers: Voucher[] = [
  {
    id: 1,
    title: "Đơn hàng đầu tiên",
    description: "Giảm 5% cho đơn hàng đầu tiên của bạn",
    discount: 5,
    expiry: "5/6/2024",
  },
  {
    id: 2,
    title: "Ưu đãi Giáng sinh",
    description: "Giảm 15% cho đơn hàng trên 1 triệu",
    discount: 15,
    expiry: "25/12/2024",
  },
  {
    id: 3,
    title: "Ưu đãi Giáng sinh",
    description: "Giảm 15% cho đơn hàng trên 1 triệu",
    discount: 15,
    expiry: "25/12/2024",
  },
];

export default vouchers;
export type { Voucher };
