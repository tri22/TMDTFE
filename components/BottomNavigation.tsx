import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const getIconColor = (path: string) => {
    return pathname === path ? "#FF6347" : "#4472C4"; // Màu đỏ cho icon active, xanh cho không active
  };

  return (
    <View style={styles.container}>
      <Link href="/(tabs)" asChild>
        <Pressable style={styles.iconWrapper}>
          <Feather name="home" size={24} color={getIconColor("/(tabs)")} />
        </Pressable>
      </Link>

      <Link href="/(tabs)/WishlistScreen" asChild>
        <Pressable style={styles.iconWrapper}>
          <AntDesign name="hearto" size={24} color={getIconColor("/(tabs)")} />
        </Pressable>
      </Link>

      <Link href="/(tabs)" asChild>
        <Pressable style={styles.iconWrapper}>
          <MaterialIcons
            name="list-alt"
            size={24}
            color={getIconColor("/(tabs)")}
          />
        </Pressable>
      </Link>

      <Link href="/(tabs)/CartlistScreen" asChild>
        <Pressable style={styles.iconWrapper}>
          <Feather name="bookmark" size={24} color={getIconColor("/(tabs)")} />
        </Pressable>
      </Link>

      <Link href="/(tabs)/Profile" asChild>
        <Pressable style={styles.iconWrapper}>
          <FontAwesome5
            name="user"
            size={24}
            color={getIconColor("/(tabs)/Profile")}
          />
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 1,
    elevation: 5,
    zIndex: 999, // đảm bảo không bị che
  },

  iconWrapper: {
    width: 24,
    height: 24,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
