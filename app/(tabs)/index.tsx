import { showToast } from "@/api/axiosInstance";
import { createStompClient } from "@/util/Websocket";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import Toast from "react-native-toast-message";
import Home from "./home";

registerTranslation("en", en);

export default function HomeScreen() {
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
    <PaperProvider theme={DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Home />
        {/* <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                      
                    </ScrollView>
                      
                    <BottomNavigation />
                </View> */}
        <Toast />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    // flex: 1,
    // justifyContent: "flex-end",
    // backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 100, // Đảm bảo BottomNavigation không che khuất nội dung
  },
});
