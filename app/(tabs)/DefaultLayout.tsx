import { BottomNavigation } from "@/components/BottomNavigation";
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    return (
        <GestureHandlerRootView style={{ flex: 1, paddingTop: 40 }}>
            <View style={{ flex: 1, marginBottom: 84 }}>{children}</View>
            <BottomNavigation />

            <Toast />
        </GestureHandlerRootView>
    );
}
