import ProductItem from "@/components/productItem";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Toast from "react-native-toast-message";

import { getCategoryCount } from '@/api/feApi';
import { colors } from "@/baseStyle/Style";
import Search from "@/components/search";
import { CategoryCount } from '@/models/CategoryCount';

const imgDirRoot = "@/assets/images";
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

function Product() {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
    const { link, title } = useLocalSearchParams ();

   useEffect(() => {
    const fetchCategoryCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategoryCount();
        setCategoryCounts(data); 
      } catch (err) {
        setError('Không thể tải danh mục');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);


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

  type CategoryType = {
    icon1: ImageSourcePropType;
    icon2: ImageSourcePropType;
    icon3: ImageSourcePropType;
    icon4: ImageSourcePropType;
    title: string;
    qty: number;
    link: string;
  };

  type ProductType = {
    name: string;
    image: ImageSourcePropType;
    price: number;
    link: string;
  };

  const newestProducts: ProductType[] = [
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


  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.header}>
          
      </View> */}
      <Search />
      <ScrollView style={styles.container}>
        <Text style={[styles.heading, { marginTop: 10 }]}>{title}</Text>
        <FlatList
          data={newestProducts}
          renderItem={({ item }) => (
            <ProductItem
              name={item.name}
              price={item.price}
              image={item.image}
              link={item.link}
            />
          )}
          numColumns={2}
        />
      </ScrollView>
    </View>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
  heading: {
    fontSize: 25,
    fontWeight: "500",
    color: colors.darkPrimary,
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
  categoryItem: {
    padding: 10,
    borderRadius: 7,
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 7,
  },
  categoryImage: {
    width: "40%", // 2 ảnh mỗi hàng, còn 4% khoảng cách
    aspectRatio: 1,
    borderRadius: 5,
    margin: 4,
  },
  timeDitgit: {
    backgroundColor: "#ccc",
    color: "black",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    margin: 1,
    fontWeight: 500,
    fontSize: 20,
  },
});
