import { SERVER_BASE_URL } from '@/api/ipConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '@stomp/stompjs';
import { EventEmitter } from 'events';
import SockJS from 'sockjs-client';

/** Singleton quản lý STOMP + phát sự kiện */
class WSService extends EventEmitter {
  private client?: Client;
  private connected = false;

  async connect() {
    if (this.connected) return;

    const userJson = await AsyncStorage.getItem('user');
    const userId = userJson ? JSON.parse(userJson).id : undefined;
    if (!userId) return;     // Chưa login

    const token = await AsyncStorage.getItem('token');

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${SERVER_BASE_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      debug: (s) => console.log('[STOMP]', s),
      onConnect: () => {
        this.connected = true;
        this.client!.subscribe(`/topic/user.${userId}`, (msg) => {
          try {
            this.emit('message', JSON.parse(msg.body));  // phát ra EventEmitter
          } catch {
            this.emit('message', { message: msg.body });
          }
        });
      },
      onDisconnect: () => (this.connected = false),
    });

    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
    this.connected = false;
  }
}

export const wsService = new WSService();
