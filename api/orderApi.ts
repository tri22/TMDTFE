import axiosInstance from "./axiosInstance";

// function to call api order
const createOrder = async (orderData: any): Promise<any> => {
  try {
    const orderRequest = {
      idUser: 3,
      email: orderData.email,
      phone: orderData.phone,
      total: orderData.total,
      addressOrder: {
        street: orderData.address.street,
        ward: orderData.address.ward,
        district: orderData.address.district,
        city: orderData.address.city,
      },
      cardOrder: {
        cardId: orderData.cards.id,
        cardType: orderData.cards.cardType,
        cardNumber: orderData.cards.cardNumber,
        ownerName: orderData.cards.ownerName,
        expiryDate: orderData.cards.expiryDate,
      },
      productOrder: {
        id: orderData.carts.id,
        name: orderData.carts.name,
        price: orderData.carts.price,
        quantity: orderData.carts.quantity,
      },
      voucherOrder: {
        id: orderData.voucher.id,
        title: orderData.voucher.title,
        description: orderData.voucher.description,
        discount: orderData.voucher.discount,
        expiry: orderData.voucher.expiry,
      },
    };

    const response = await axiosInstance.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export default createOrder;
