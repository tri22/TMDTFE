import axiosInstance from "./axiosInstance";

const createOrder = async (orderData: any): Promise<any> => {
  try {
    const orderRequest = {
      idUser: 3, // nếu bạn đã xác định userId là 3
      email: orderData.email,
      phone: orderData.phone,
      total: orderData.total,
      addressOrder: {
        address: `${orderData.address.street} - ${orderData.address.ward} - ${orderData.address.district} - ${orderData.address.city}`,
      },
      cardOrder: {
        // id: orderData.cards.id, // ✅ đúng key: id
        cardInfor: `${orderData.cards.cardType} - ${orderData.cards.cardNumber} - ${orderData.cards.ownerName}`,
      },
      productOrder: {
        // id: orderData.carts.id,
        name: orderData.carts.name,
        price: orderData.carts.price,
        quantity: orderData.carts.quantity,
        image: orderData.carts.image || "", // ✅ tránh undefined
      },
      voucherOrder: {
        // id: orderData.voucher?.id || null,
        title: orderData.voucher?.title,
        description: orderData.voucher?.description,
        discount: orderData.voucher?.discount,
        expiry: orderData.voucher?.expiry,
      },
    };

    const response = await axiosInstance.post("/orders", orderRequest);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export default createOrder;
