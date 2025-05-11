import ProductItem from "@/components/productItem";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { colors } from "@/baseStyle/Style";
import { IconButton, SimpleButton } from "@/components/button";
import { formatMoney } from "@/util";
// import { FlatList } from "react-native-gesture-handler";
import { CommentItem, MyCarousel, ShopInfo } from "./components";

const imgDir = "@/assets/images/searchProduct";

type ProductItem = {
  name: string;
  image: ImageSourcePropType;
  price: number;
  link: string;
  description?: string;
};

const product: ProductItem = {
  name: "Quần jean",
  image: require(`${imgDir}/quan-jean.png`),
  price: 125000,
  link: "jean",
  description:
    "Kính còn khoảng 95%, không trầy xước\nForm kính chuẩn, đeo nhẹ mặt.\nTròng tốt, không mờ hay loá.\nFull hộp + khăn lau kính đi kèm.",
};

type ShopInfo = {
  name: string;
  image: ImageSourcePropType;
  avgRating: number;
  link: string;
  saledQty: number;
};

const shopInfo: ShopInfo = {
  name: "To Minh Nhat",
  image: require("@/assets/images/avatar.jpg"),
  avgRating: 4,
  link: "jean",
  saledQty: 10,
};

type CommentItem = {
  name: string;
  image: ImageSourcePropType;
  content: string;
  time: string;
  replies: CommentItem[];
};

const comment: CommentItem = {
  name: "To Nhat",
  image: require("@/assets/images/avatar.jpg"),
  content: "Chất liệu là gì v",
  time: "11 giờ trước",
  replies: [
    {
      name: "Nhan vien",
      image: require("@/assets/images/avatar.jpg"),
      content: "Bằng carbon",
      time: "11 giờ trước",
      replies: [],
    },
  ],
};

type ProductOfSaler = {
  image: ImageSourcePropType;
  link: string;
};

const productOfSalers: ProductOfSaler[] = [
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
  {
    image: require("@/assets/images/searchProduct/quan-jean.png"),
    link: "quan-jean",
  },
];

type ShippingFeeItem = {
  title: string;
  time: string;
  price: number;
};

const shippingFeeItems: ShippingFeeItem[] = [
  {
    title: "Tiêu chuẩn",
    time: "5 - 7 ngày",
    price: 15000,
  },
  {
    title: "Nhanh",
    time: "1 - 3 ngày",
    price: 25000,
  },
];

const products: ProductItem[] = [
  {
    name: "Quần jean",
    image: require(`${imgDir}/quan-jean.png`),
    price: 125000,
    link: "jean",
  },
  {
    name: "Áo Champion",
    image: require(`${imgDir}/ao-champion.jpg`),
    price: 325000,
    link: "superment",
  },
  {
    name: "Kính mát Channel nữ Authentic",
    image: require(`${imgDir}/kinh-channel.png`),
    price: 725000,
    link: "channel",
  },
];

type ClassificationItem = {
  title: string;
  link: string;
  price: number;
  qty: number;
};

const classificationItems: ClassificationItem[] = [
  {
    title: "size M",
    price: 125000,
    link: "jean",
    qty: 100,
  },
  {
    title: "size L",
    price: 125000,
    link: "jean",
    qty: 0,
  },
  {
    title: "size XL",
    price: 125000,
    link: "jean",
    qty: 100,
  },
];

function ProductDetail() {
  const showAlert = () => {
    console.log("show alert");
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Đây là thông báo Toast",
      text2: "Thông báo này sẽ biến mất sau vài giây",
      visibilityTime: 3000, // Toast sẽ tự động ẩn sau 3 giây
    });
  };

  const imageList = [
    require(`${imgDir}/quan-jean.png`),
    require(`${imgDir}/ao-champion.jpg`),
    require(`${imgDir}/kinh-channel.png`),
  ];

  const handlePress = () => {
    console.log("handlePress");
    showAlert();
  };

  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setSearch("");
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Định nghĩa chiều cao mở ra của bottom sheet
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleOpenBottomSheet = useCallback(() => {
    console.log("handleOpenBottomSheet");
    bottomSheetRef.current?.snapToIndex(1); // mở tới 50%
  }, []);

  const ClassificationSelection = () => {
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState("title");

    const handleSelect = (item: ClassificationItem) => {
      setQty(item.qty);
      setPrice(item.price);
      setTitle(item.title);
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0} // mờ khi index >= 0
            disappearsOnIndex={-1} // ẩn khi index -1
            opacity={0.5} // độ mờ nền
          />
        )}
      >
        <BottomSheetView style={{}}>
          <View style={styles.dFlex}>
            <Image source={product.image} style={styles.image} />
            <View>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>{title}</Text>
              <View style={styles.dFlex}>
                <Text style={styles.price}>{formatMoney(price)}</Text>
                <Text style={{ marginLeft: 20 }}>Số lượng: {qty}</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.label, { marginLeft: 10 }]}>
            Chọn phân loại sản phẩm
          </Text>
          <View
            style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}
          >
            {classificationItems.map((item, index) => (
              <SimpleButton
                key={index}
                title={item.title}
                onPress={() => handleSelect(item)}
                textColor="black"
                style={{
                  backgroundColor: "#ccc",
                  margin: 4,
                  paddingHorizontal: 10,
                }}
              />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <MyCarousel images={imageList} />
        <View
          style={[
            styles.dFlexSpBetween,
            { paddingHorizontal: 10, marginTop: 10 },
          ]}
        >
          <Text style={styles.price}>{formatMoney(product.price)}</Text>
          <IconButton
            icon="share-social-sharp"
            onPress={handlePress}
            style={{ backgroundColor: colors.blurPrimary }}
          />
        </View>
        <View style={[{ paddingHorizontal: 10 }]}>
          <Text style={styles.title}>{product.name}</Text>
        </View>
        <View style={[{ padding: 10 }]}>
          <View>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
        <View style={[{ padding: 10 }]}>
          <ShopInfo
            name={shopInfo.name}
            image={shopInfo.image}
            avgRating={shopInfo.avgRating}
            link={shopInfo.link}
            saledQty={shopInfo.saledQty}
          />
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
              marginVertical: 10,
            }}
          />
        </View>

        <View style={[{ padding: 10 }]}>
          <Text style={styles.label}>Bình luận</Text>
          <View style={[{ marginTop: 10 }]}>
            <View style={[styles.inputWrapper, { marginBottom: 10 }]}>
              <TextInput
                style={[styles.inputText, isFocused && styles.inputFocused]}
                placeholderTextColor={"lightgray"}
                placeholder="Nhập bình luận"
                onChangeText={setSearch}
                value={search}
                onFocus={() => setIsFocused(true)}
              />
              <IconButton
                icon="send-sharp"
                onPress={handlePress}
                iconColor="#fff"
                iconSize={20}
                style={{
                  backgroundColor: colors.primary,
                  alignSelf: "stretch",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
            </View>

            <CommentItem
              name={comment.name}
              content={comment.content}
              time={comment.time}
              image={comment.image}
              replies={comment.replies}
            />
          </View>
        </View>
        <View style={[{ padding: 10 }]}>
          <Text style={styles.label}>Phí vận chuyển</Text>
          <FlatList
            data={shippingFeeItems}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dFlexSpBetween, styles.shippingFeeItem]}
              >
                <Text style={{ fontSize: 17 }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: "blue" }}>{item.time}</Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: colors.primary,
                    fontWeight: 500,
                  }}
                >
                  {formatMoney(item.price)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={[{ padding: 10 }]}>
          <Text style={styles.label}>Xem thêm sản phẩm từ người bán</Text>
          <FlatList
            data={productOfSalers}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productOfSalerItem}
                onPress={() => Linking.openURL("https://google.com")}
              >
                <Image source={item.image} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={[{ padding: 10 }]}>
          <Text style={[styles.label, { marginBottom: 10 }]}>
            Có thể bạn quan tâm
          </Text>
          <FlatList
            data={products}
            nestedScrollEnabled={true}
            keyExtractor={(item) => item.link}
            renderItem={({ item }: { item: ProductItem }) => (
              <ProductItem
                name={item.name}
                image={item.image}
                price={item.price}
                link={item.link}
              />
            )}
            numColumns={2}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBarContainer}>
        <SimpleButton
          title="Thêm vào giỏ hàng"
          onPress={handleOpenBottomSheet}
          style={{
            flex: 1,
            marginHorizontal: 5,
            backgroundColor: colors.darkPrimary,
          }}
          textColor="white"
        />
        <SimpleButton
          title="Mua ngay"
          onPress={handlePress}
          style={{
            flex: 1,
            marginHorizontal: 5,
            backgroundColor: colors.primary,
          }}
          textColor="white"
        />
      </View>
      <ClassificationSelection />
    </View>
  );
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    // padding: 15,
    // marginTop: 40,
    // backgroundColor: '#fff'
  },
  dFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  inputText: {
    padding: 10,
    flex: 1,
    borderWidth: 0,
  },
  inputFocused: {
    borderWidth: 0,
  },
  dFlexSpBetween: {
    flexDirection: "row", // xếp ngang
    justifyContent: "space-between", // cách đều nhau
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  price: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 25,
  },
  description: {
    fontSize: 17,
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 7,
  },

  label: {
    fontSize: 17,
    fontWeight: "400",
    color: "gray",
  },
  icon: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  productOfSalerItem: {
    padding: 4,
    borderRadius: 7,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.primary,
    margin: 10,
    backgroundColor:"#fff"
  },
  shippingFeeItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.primary,
    margin: 10,
  },

  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "space-between",
  },
  cartBtn: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
