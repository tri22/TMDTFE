// websocket.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SERVER_BASE_URL } from "../api/ipConstant";

const URL = `${SERVER_BASE_URL}/ws`;

export async function getUserId(): Promise<number | undefined> {
  try {
    const json = await AsyncStorage.getItem("user"); // "{"id":123,"name":"A"}" | null
    console.log("user: " + json);
    if (!json) return undefined;

    const user = JSON.parse(json) as { id?: number };
    return user.id;
  } catch (err) {
    console.error("Lỗi đọc user từ AsyncStorage", err);
    return undefined;
  }
}

export const createStompClient = async (
  onMessage: (msg: string) => void
): Promise<Client | undefined> => {
  const userId = await getUserId();
  console.log("userId:", userId);

  if (!userId) return;
  const token = await AsyncStorage.getItem("token"); // ví dụ "eyJhbGciOi..."

  const client = new Client({
    webSocketFactory: () => new SockJS(URL),
    connectHeaders: { Authorization: `Bearer ${token}` }, // <<< thêm dòng này

    reconnectDelay: 5000,
    debug: (str) => console.log("[STOMP]", str),

    onConnect: () => {
      console.log("✅ Connected to WebSocket");
      client.subscribe(`/topic/user.${userId}`, (msg) => {
        console.log("📩 Received message:", msg.body);
        onMessage(msg.body); // <-- gọi callback khi nhận tin nhắn
      });
    },

    onDisconnect: () => {
      console.log("🔌 Disconnected from WebSocket");
    },

    onStompError: (frame) => {
      console.error("❌ Broker error:", frame.headers["message"]);
    },
  });

  client.activate(); // bắt đầu kết nối
  return client;
};
