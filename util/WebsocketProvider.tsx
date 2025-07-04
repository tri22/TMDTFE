import React, { createContext, useEffect } from 'react';
import { wsService } from './wsService';

export const WebSocketContext = createContext(wsService);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    wsService.connect();              // mở kết nối khi App mount
    return () => wsService.disconnect();
  }, []);

  return (
    <WebSocketContext.Provider value={wsService}>
      {children}
    </WebSocketContext.Provider>
  );
};
