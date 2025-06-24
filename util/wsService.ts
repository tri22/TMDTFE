import { createStompClient } from '@/util/Websocket'; // chính file websocket.ts bạn đã có
import { EventEmitter } from 'eventemitter3';


class WSService extends EventEmitter {
  private active = false;

  /** Gọi 1 lần sau khi user đăng nhập */
  async connect() {
    if (this.active) return;          // đã kết nối rồi
    this.active = true;

    await createStompClient((msg) => {
      try {
        this.emit('message', JSON.parse(msg)); // phát object
      } catch {
        this.emit('message', { message: msg }); // fallback
      }
    });
  }

  /** Gọi khi logout hoặc unmount root */
  disconnect() {
    // createStompClient đã trả về client nếu cần, bạn có thể giữ reference
    // và deactivate() ở đây (tùy bạn mở rộng).
    this.active = false;
  }
}

export const wsService = new WSService();
