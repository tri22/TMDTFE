import createOrder from "@/api/orderApi";
import { Card, CardContent, ProductItemSection } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const OrderScreen = () => {
  const list = useSearchParams().get("dataOrder");
  const data = list ? JSON.parse(list) : null;

  createOrder(data);

  if (!data) return null;

  const { carts, cards, voucher, total, email, phone, address } = data;

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = currentDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <CardContent style={styles.headerContent}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.title}>Đơn hàng của bạn</Text>
              <Text style={styles.subtitle}>
                Trạng thái: <Text style={styles.paid}>Đã thanh toán</Text>
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Product Card */}
        <Card style={styles.card}>
          <CardContent>
            <ProductItemSection key={carts.id} {...carts} />
          </CardContent>
        </Card>

        {/* Voucher */}
        {voucher && (
          <Card style={styles.card}>
            <CardContent style={styles.rowBetween}>
              <Text style={styles.label}>Khuyến mãi:</Text>
              <Text style={styles.voucherText}>
                {voucher.discount}% ({voucher.title})
              </Text>
            </CardContent>
          </Card>
        )}

        {/* Tổng tiền */}
        <Card style={styles.card}>
          <CardContent style={styles.rowBetween}>
            <Text style={styles.label}>Tổng tiền:</Text>
            <Text style={styles.totalPrice}>{total.toLocaleString()} VND</Text>
          </CardContent>
        </Card>

        {/* Email và SĐT */}
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>

            <Text style={[styles.label, { marginTop: 12 }]}>
              Số điện thoại:
            </Text>
            <Text style={styles.value}>{phone}</Text>
          </CardContent>
        </Card>

        {/* Địa chỉ nếu có */}
        {address && (
          <Card style={styles.card}>
            <CardContent>
              <Text style={styles.label}>Địa chỉ:</Text>
              <Text style={styles.value}>
                {address.street}, {address.ward}, {address.district},{" "}
                {address.city}
              </Text>
            </CardContent>
          </Card>
        )}

        {/* Ngày giờ */}
        <Card style={styles.card}>
          <CardContent style={styles.rowBetween}>
            <Text style={styles.label}>Ngày đặt:</Text>
            <Text style={styles.value}>
              {date} {time}
            </Text>
          </CardContent>
        </Card>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  paid: {
    color: "green",
    fontWeight: "600",
  },
  card: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  value: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
  },
  voucherText: {
    color: "green",
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DAA520", // gold
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default OrderScreen;
