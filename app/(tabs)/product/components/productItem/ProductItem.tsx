import { colors } from "@/baseStyle/Style";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { formatMoney } from "@/util";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

type Props = {
  id?: number;

  name: string;
  // onPress: () => void;
  style?: StyleProp<ViewStyle>;
  thumbnail?: string;
  price?: number;
};

export default function ProductItem({
  id,
  name,
  thumbnail,
  style,
  price,
}: Props) {
  const router = useRouter();

  const handlePress = (item: Props) => {
    console.log("press on productItem id: " + item);
    router.push({
      pathname: "/productDetail",
      params: {
        id: item.id,
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => handlePress({ id, name, thumbnail, price })}
      >
        <View style={styles.imgContainer}>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.price}>{formatMoney(price ?? 0)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: screenWidth * 0.5 - 6 - 20,
    margin: 3,
  },
  container: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 6,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    // marginHorizontal:5,
    // marginBottom: 5,
  },
  imgContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  title: {
    color: "gray",
    fontWeight: "400",
    marginBottom: 5,
  },
  price: {
    color: colors.primary,
    fontWeight: "500",
  },
  active: {
    backgroundColor: colors.blurPrimary,
    borderColor: colors.primary,
    color: colors.primary,
  },
  blur: {
    borderColor: colors.blurPrimary,
  },
  disabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
  },
  disabledText: {
    color: "#999",
  },
});
