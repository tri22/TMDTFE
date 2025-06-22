import React, { useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";
import StarRating from "react-native-star-rating-widget";

type Props = {
  name?: string;
  // onPress: () => void;
  style?: StyleProp<ViewStyle>;
  image?: string;
  avgRating?: number;
  link?: string;
  soldOrderQty?: number;
  isDisabled?: boolean;
};

function ShopInfo({
  name,
  style,
  avgRating = 0,
  link,
  soldOrderQty,
  image,
  isDisabled = false,
}: Props) {
  const [rating, setRating] = useState(3);
  return (
    <View style={styles.dFlexSpBetween}>
      <View style={styles.dFlex}>
        <Image source={{ uri: image }} style={styles.image} />
        <View>
          <View style={styles.dFlex}><Text style={styles.name}>{name}</Text><Text style={{marginLeft:10, fontStyle: 'italic'}}>(Đã bán {soldOrderQty} sản phẩm)</Text></View>
          
          <View style={styles.dFlex}>
            <View pointerEvents="none">
              <StarRating rating={Math.round(avgRating)} starSize={20} onChange={setRating} />
            </View>
            <Text style={{ fontSize: 20, color: "gray", marginLeft: 10 }}>
              {avgRating}
            </Text>
          </View>
        </View>
      </View>
      <View style={{}}>
        {/* <Text
          style={{
            color: "blue",
            textDecorationLine: "underline",
            fontSize: 17,
          }}
          onPress={() => Linking.openURL("https://google.com")}
        >
          Xem đánh giá
        </Text> */}
        {/* <Text style={{}}>Đã bán {soldOrderQty} sản phẩm</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  dFlexSpBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 7,
  },
  name: {
    fontSize: 25,
    fontWeight: "500",
  },
});

export default ShopInfo;
