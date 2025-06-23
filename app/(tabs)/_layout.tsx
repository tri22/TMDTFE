import { showToast } from "@/api/axiosInstance";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createStompClient } from "@/util/Websocket";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({});

    useEffect(() => {
      let client: any;
  
      const handleMessage = (msg: string) => {
        // Xử lý UI khi nhận tin nhắn
        const payload = JSON.parse(msg); // chuyển chuỗi JSON → object
        const messageText = payload.message ?? "Có thông báo mới";
  
        console.log("📩 Thông báo từ server:", messageText);
        showToast("info", messageText);
      };
  
      createStompClient(handleMessage).then((c) => {
        client = c;
      });
  
      return () => {
        client?.deactivate();
      };
    }, []);

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Settings" options={{ headerShown: false }} />
          <Stack.Screen
            name="Setting/AddressSettings"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting/MyActivity"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting/OrderHistory"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting/PaymentSetting"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Setting/About" options={{ headerShown: false }} />
          <Stack.Screen
            name="Setting/OrderManagement"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting/ProfileSetting"
            options={{ headerShown: false }}
          />
          {/* Phần login */}
          <Stack.Screen name="MainLogin" options={{ headerShown: false }} />
          <Stack.Screen
            name="Login/register_form"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login/account_auth"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login/login_form"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login/sms_recovery"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login/email_recovery"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login/password_recovery"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login/new_pass_form"
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Profile" options={{ headerShown: false }} />
          <Stack.Screen name="VoucherScreen" options={{ headerShown: false }} />
          {/* product, product detail */}
          <Stack.Screen name="product" />
          <Stack.Screen name="productDetail" />

          {/* Phần Đăng bán sản phẩm */}
          <Stack.Screen
            name="Profile/PostProduct"
            options={{
              headerShown: true,
              title: "Đăng bán sản phẩm",
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                color: "#2e384d",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Profile/EditProduct"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
