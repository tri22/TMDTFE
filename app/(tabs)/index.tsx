import { StyleSheet, View } from "react-native";
import { BottomNavigation } from "../../components/BottomNavigation";

import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Home from "./home";

export default function HomeScreen() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Home></Home>
                </ScrollView>

                <BottomNavigation />
            </View>
            <Toast />
        </GestureHandlerRootView>
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
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 100, // Đảm bảo BottomNavigation không che khuất nội dung
    },
});
