import { BOTTOM_NAV_HEIGHT, BottomNavigation } from "@/components/BottomNavigation";
import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
type Props = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 40 }}>
      <View
        style={{
          flex: 1,
          marginBottom: isKeyboardVisible ? 0 : BOTTOM_NAV_HEIGHT,
        }}
      >
        {children}
      </View>
      {!isKeyboardVisible && <BottomNavigation />}

      <Toast />
    </GestureHandlerRootView>
  );
}
