import React, { useState } from "react";
import { Button, View } from "react-native";
import PaymentStatusModal from "./PaymentStatusModa";

const CheckoutScreen: React.FC = ({ ...isSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure">(
    "failure"
  );

  const handlePayment = () => {
    // Giả lập xử lý thanh toán
    setPaymentStatus(true ? "success" : "failure");
    setModalVisible(true);
  };

  const handleRetry = () => {
    setModalVisible(false);
    handlePayment();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Thanh toán" onPress={handlePayment} />
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
            : "Vui lòng thay đổi phương thức thanh toán hoặc thử lại"
        }
        buttonPrimaryText={
          paymentStatus === "success" ? "Xem đơn hàng" : "Thử lại"
        }
        buttonSecondaryText={
          paymentStatus === "failure" ? "Thay đổi" : undefined
        }
        onPrimaryPress={() => {
          setModalVisible(false);
        }}
        onSecondaryPress={paymentStatus === "failure" ? handleRetry : undefined}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default CheckoutScreen;
