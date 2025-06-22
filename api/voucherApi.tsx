import axiosInstance from "./axiosInstance";

export interface Voucher {
  id: number;
  code: string;
  description: string;
  discount: number;
  minOrderValue:number;
  expiryDate: string;
}

const voucherApi={
    getAllVouchers:()=>{
        return axiosInstance.get("/vouchers")
    }
}
export default voucherApi;