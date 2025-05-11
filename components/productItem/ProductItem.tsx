import { colors } from "@/baseStyle/Style";
import {
  Image,
  ImageSourcePropType,
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { formatMoney } from "@/util";
type Props = {
  name: string;
  // onPress: () => void;
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
  price?: number;
  link?: string;
};

export default function ProductItem({
  name,
  image,
  // onPress,
  style,
  price,
  link,
}: Props) {
  const openURL = () => {
    const url = link || "/home";
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={openURL}>
      <View style={styles.imgContainer}>
        {image && <Image source={image} style={styles.image} />}
      </View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>{formatMoney(price ?? 0)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 6,
    width: "45%",
    marginHorizontal:5,
    marginBottom: 5,
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
    marginBottom: 5
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
