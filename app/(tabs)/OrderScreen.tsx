import { Card, CardContent, ProductItemSection } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Item } from "@/data/item";
import { useSearchParams } from "expo-router/build/hooks";
import { Clipboard } from "lucide-react";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OrderScreen = () => {
  const list = useSearchParams().get("dataOrder");
  const data = list ? JSON.parse(list) : [];
  const cartsList = data.carts;
  const email = data.email;
  const phone = data.phone;
  const total = data.total;
  const voucher = data.voucher;
  // get the current date and time
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
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.title}>Đơn hàng</Text>
            <Text style={styles.subtitle}>Trạng thái đơn hàng</Text>
          </View>
        </View>

        {/* Order Card */}
        <Card style={styles.card}>
          <CardContent>
            {/* Show list item  */}
            {cartsList.map((item: Item) => (
              <ProductItemSection key={item.id} {...item} />
            ))}

            {/* Total show  */}
            <View style={styles.totalContainer}>
              <Text style={styles.deliveryText}>Tổng tiền:</Text>
              <Text style={styles.priceText}>{total}.000 VND</Text>
            </View>

            {/* Tracking Information */}
            <View style={styles.trackingContainer}>
              <Text style={styles.trackingLabel}>Mã vận đơn</Text>
              <View style={styles.trackingRow}>
                <Text style={styles.trackingCode}>LGS-i92927839300763731</Text>
                <TouchableOpacity>
                  <Clipboard size={18} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Status Information */}
            <View style={styles.statusContainer}>
              <Text style={styles.statusHeader}>Đã đặt hàng</Text>
              <Text style={styles.statusDate}>
                {date} – {time}
              </Text>
              <Text style={styles.statusDescription}>
                Bạn xác nhận mua hàng và đang chờ người bán xác nhận
              </Text>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    paddingBottom: 0,
    marginBottom: 80,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  title: { fontSize: 20, fontWeight: "600" },
  subtitle: { color: "#6b7280" },
  card: { marginVertical: 8 },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  deliveryText: { color: "#6b7280" },
  priceText: { fontSize: 18, fontWeight: "700", color: "#3b82f6" },
  trackingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  trackingLabel: { color: "#6b7280" },
  trackingRow: { flexDirection: "row", alignItems: "center" },
  trackingCode: { fontWeight: "600", marginRight: 8 },
  statusContainer: { marginTop: 16 },
  statusHeader: { fontWeight: "600" },
  statusDate: { color: "#6b7280" },
  statusDescription: { color: "#6b7280" },
});

export default OrderScreen;
