import {
  AddressInfo,
  CardItem,
  ContactInfo,
  PaymentMethodModal,
  PaymentStatusModal,
  ProductItemSection,
  TotalAmount,
  VoucherModal,
} from "@/components";
import { CardData, VoucherData } from "@/data";
import { Item } from "@/data/item";
import { Voucher } from "@/data/voucher";
import { FormValidation } from "@/validate";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useMemo, useState } from "react"; // Thêm import useMemo
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PaymentScreen: React.FC = () => {
  const searchParams = useSearchParams(); // Sửa thành const
  const data = searchParams.get("data");
  const cartItems: Item = data
    ? JSON.parse(data)
    : {
        id: 0,
        name: "",
        price: 0,
        imageUrl: "",
        quantity: 1,
      };

  const [VoucherDisplay, setVoucherDisplay] = useState("Voucher");
  const [totalAmount, setTotalAmout] = useState(
    cartItems.price * cartItems.quantity
  );
  const [visibleVoucher, setVisibleVoucher] = useState(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const vouchers: Voucher[] = VoucherData;

  const handleAddVoucher = (id: number) => {
    const selectedVoucher = vouchers.find((voucher) => voucher.id === id);
    if (selectedVoucher) {
      setVoucher(selectedVoucher);
      setVoucherDisplay(`${selectedVoucher.discount}% Payoff`);
      setTotalAmout(
        (prevAmount) =>
          prevAmount - (prevAmount * selectedVoucher.discount) / 100
      );
      setVisibleVoucher(false);
    }
  };

  const [visibleCard, setVisibleCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const cards = CardData;
  const handleAddCard = () => {
    alert("Thêm thẻ mới");
  };

  const handleSelectCard = (card: any) => {
    if (selectedCard !== card) {
      setSelectedCard(card);
    }
  };

  const [childData, setChildData] = useState<any>({ email: "", phone: "" });

  const handleDataFromChild = (email: string, phone: string) => {
    const data = { email, phone };
    setChildData(data);
    return data; // Ensure the function returns the object
  };

  // Sửa thành useMemo
  const validateData = useMemo(
    () => ({
      carts: cartItems,
      cards: selectedCard,
      total: totalAmount,
      voucher: voucher,
      email: childData.email,
      phone: childData.phone,
    }),
    [
      cartItems,
      selectedCard,
      totalAmount,
      voucher,
      childData.email,
      childData.phone,
    ]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure">(
    "failure"
  );

  const isSubmitDisabled = FormValidation(validateData);
  const handlePayment = () => {
    setPaymentStatus(isSubmitDisabled ? "success" : "failure");
    setModalVisible(true);
  };

  const handleRetry = () => {
    setModalVisible(false);
  };

  const router = useRouter();

  return (
    <>
      <ScrollView style={styles.container}>
        <AddressInfo />
        <ContactInfo onSendData={handleDataFromChild} />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Sản phẩm</Text>{" "}
          {/* Sửa thành Text */}
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => setVisibleVoucher(true)}
            >
              {VoucherDisplay}
            </Text>
          </TouchableOpacity>
          <VoucherModal
            visible={visibleVoucher}
            onClose={() => setVisibleVoucher(false)}
            vouchers={vouchers}
            onAddVoucher={handleAddVoucher}
          />
        </View>
        <ProductItemSection key={cartItems.id} {...cartItems} />
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setVisibleCard(true)}>
            {selectedCard ? (
              <CardItem
                cardType={selectedCard.cardType}
                cardNumber={selectedCard.cardNumber}
                ownerName={selectedCard.ownerName}
                expiry={selectedCard.expiry}
                onSettings={() => alert("Settings")}
              />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  Chọn phương thức thanh toán
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <PaymentMethodModal
            visible={visibleCard}
            onClose={() => setVisibleCard(false)}
            cards={cards}
            onAddCard={handleAddCard}
            onSelectCard={handleSelectCard}
          />
        </View>
        <TotalAmount total={`${totalAmount}.000 VND`} />
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </ScrollView>
      <PaymentStatusModal
        visible={modalVisible}
        status={paymentStatus}
        message={
          paymentStatus === "success"
            ? "Thành công"
            : "Chúng tôi không thể tiến hành thanh toán của bạn"
        }
        subMessage={
          paymentStatus === "success"
            ? "Thanh toán đơn hàng của bạn đã hoàn tất"
            : "Vui lòng kiểm tra thông tin hoặc thử lại"
        }
        buttonPrimaryText={
          paymentStatus === "success" ? "Xem đơn hàng" : "Thử lại"
        }
        buttonSecondaryText={
          paymentStatus === "failure" ? "Thay đổi" : undefined
        }
        onPrimaryPress={() => {
          setModalVisible(false);
          if (paymentStatus === "success") {
            router.push({
              pathname: "/(tabs)/OrderScreen",
              params: { dataOrder: JSON.stringify(validateData) },
            });
          }
        }}
        onSecondaryPress={paymentStatus === "failure" ? handleRetry : undefined}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  sectionHeader: {
    marginVertical: 12,
    fontSize: 18,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderText: {
    // Thêm style mới
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4F8EF7",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  placeholder: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  placeholderText: {
    color: "#888888",
  },
});

export default PaymentScreen;
