import voucherApi from "@/api/voucherApi";
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
import { Address } from "@/components/AddressInfo";
import { CardData } from "@/data";
import { Item } from "@/data/item";
import { Voucher } from "@/data/voucher";
import { FormValidation } from "@/validate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

const PaymentScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const temp: Item = data
    ? JSON.parse(data)
    : {
        id: 0,
        name: "",
        price: 0,
        imageUrl: "",
        quantity: 1,
      };

  const [cartItems, setCartItems] = useState<Item>(temp);
  const [voucherDisplay, setVoucherDisplay] = useState("Voucher");
  const [totalAmount, setTotalAmount] = useState(
    cartItems.price * cartItems.quantity
  );
  const [visibleVoucher, setVisibleVoucher] = useState(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  voucherApi
    .getAllVouchers()
    .then((response) => {
      console.log(response);
      setVouchers(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching vouchers:", error);
      return [];
    });

  const handleAddVoucher = (id: number) => {
    const selectedVoucher = vouchers.find((voucher) => voucher.id === id);
    if (selectedVoucher) {
      setVoucher(selectedVoucher);
      setVoucherDisplay(`${selectedVoucher.discount}% Payoff`);
      setTotalAmount(
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

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (!userString) {
          console.warn("No user data found");
          return;
        }
        const user = JSON.parse(userString);
        setChildData({
          email: user.email,
          phone: user.phone,
        });
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const [addressData, setAddressData] = useState<Address>({
    street: "",
    ward: "",
    district: "",
    city: "",
  });

  const handleDataFromChild = (email: string, phone: string) => {
    const data = { email, phone };
    setChildData(data);
    return data;
  };

  const handleDataFromChildForAddress = (address: Address) => {
    setAddressData(address);
  };

  const validateData = useMemo(
    () => ({
      carts: cartItems,
      cards: selectedCard,
      total: totalAmount,
      voucher: voucher,
      email: childData.email,
      phone: childData.phone,
      address: addressData,
    }),
    [
      cartItems,
      selectedCard,
      totalAmount,
      voucher,
      childData.email,
      childData.phone,
      addressData,
    ]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure">(
    "failure"
  );

  const isSubmitDisabled = FormValidation(validateData);

  const handlePayment = () => {
    setPaymentStatus(1 ? "success" : "failure");
    setModalVisible(true);
  };

  const handleRetry = () => {
    setModalVisible(false);
  };

  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AddressInfo onSave={handleDataFromChildForAddress} />
        <ContactInfo />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Sản phẩm</Text>
          <TouchableOpacity
            style={styles.voucherButton}
            onPress={() => setVisibleVoucher(true)}
          >
            <Text style={styles.buttonText}>{voucherDisplay}</Text>
          </TouchableOpacity>
          <VoucherModal
            visible={visibleVoucher}
            onClose={() => setVisibleVoucher(false)}
            vouchers={vouchers}
            onAddVoucher={handleAddVoucher}
          />
        </View>
        <ProductItemSection
          key={cartItems.id}
          {...cartItems}
          onIncrease={() => {
            const newQuantity = cartItems.quantity + 1;
            setTotalAmount(cartItems.price * newQuantity);
            setCartItems({
              ...cartItems,
              quantity: newQuantity,
            });
          }}
          onDecrease={() => {
            const newQuantity =
              cartItems.quantity > 1 ? cartItems.quantity - 1 : 1;
            setTotalAmount(cartItems.price * newQuantity);
            setCartItems({
              ...cartItems,
              quantity: newQuantity,
            });
          }}
        />
        <TouchableOpacity onPress={() => setVisibleCard(true)}>
          {selectedCard ? (
            <CardItem
              img={selectedCard.img || ""}
              cardNumber={selectedCard.cardNumber}
              ownerName={selectedCard.ownerName}
              expiry={selectedCard.expiry}
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
        <TotalAmount total={`${totalAmount}.000 VND`} />
      </ScrollView>
      <View
        style={[
          styles.paymentButtonContainer,
          { paddingBottom: insets.bottom },
        ]}
      >
        <TouchableOpacity
          style={[styles.paymentButton]}
          onPress={handlePayment}
        >
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    paddingHorizontal: isSmallDevice ? 12 : 16,
    paddingBottom: 100,
  },
  sectionHeader: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: "600",
    color: "#333",
  },
  voucherButton: {
    backgroundColor: "#4F8EF7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    minHeight: 44,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: "600",
  },
  placeholder: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginVertical: 8,
  },
  placeholderText: {
    color: "#888888",
    fontSize: isSmallDevice ? 14 : 16,
  },
  paymentButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: isSmallDevice ? 12 : 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  paymentButton: {
    backgroundColor: "#4F8EF7",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 50,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: "600",
  },
});

export default PaymentScreen;
