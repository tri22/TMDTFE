import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import Toast from "react-native-toast-message";

import { getCategoryCount } from "@/api/feApi";
import { getNewestProducts } from "@/api/productApi";
import Search from "@/app/(tabs)/home/components/search";
import { colors } from "@/baseStyle/Style";
import { IconButton } from "@/components/button";
import { CategoryCount } from "@/models/CategoryCount";
import {
  PaginatedProductsResult,
  ProductItemModel,
} from "@/models/ProductItemModel";
import DefaultLayout from "../DefaultLayout";
import ProductItem from "../product/components/productItem";
import { MyCarousel } from "./components";

const imgDirRoot = "@/assets/images";
const imgDir = "@/assets/images/searchProduct";

type CategoryType = {
  icon1: ImageSourcePropType;
  icon2: ImageSourcePropType;
  icon3: ImageSourcePropType;
  icon4: ImageSourcePropType;
  title: string;
  qty: number;
  link: string;
};

type CategoryProps = {
  category: CategoryType;
};

const categories: CategoryType[] = [
  {
    icon1: require(`${imgDirRoot}/category/category-quan-ao-1.jpg`),
    icon2: require(`${imgDirRoot}/category/category-quan-ao-2.png`),
    icon3: require(`${imgDirRoot}/category/category-quan-ao-3.jpg`),
    icon4: require(`${imgDirRoot}/category/category-quan-ao-4.jpg`),
    title: "Quần áo",
    qty: 109,
    link: "quan-ao",
  },

  {
    icon1: require(`${imgDirRoot}/category/category-giay-dep-1.jpg`),
    icon2: require(`${imgDirRoot}/category/category-giay-dep-2.png`),
    icon3: require(`${imgDirRoot}/category/category-giay-dep-3.png`),
    icon4: require(`${imgDirRoot}/category/category-giay-dep-4.png`),
    title: "Giày dép",
    qty: 70,
    link: "giay-dep",
  },
  {
    icon1: require(`${imgDirRoot}/category/category-tui-xach-1.png`),
    icon2: require(`${imgDirRoot}/category/category-tui-xach-2.png`),
    icon3: require(`${imgDirRoot}/category/category-tui-xach-3.png`),
    icon4: require(`${imgDirRoot}/category/category-tui-xach-4.jpg`),
    title: "Túi xách",
    qty: 200,
    link: "/tui-xach",
  },
  {
    icon1: require(`${imgDirRoot}/category/category-dong-ho-1.png`),
    icon2: require(`${imgDirRoot}/category/category-dong-ho-2.png`),
    icon3: require(`${imgDirRoot}/category/category-dong-ho-3.png`),
    icon4: require(`${imgDirRoot}/category/category-dong-ho-4.png`),
    title: "Đồng hồ",
    qty: 600,
    link: "dong-ho",
  },
];

function Home() {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([]);
  const [newestProducts, setNewestProducts] = useState<ProductItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategoryCount();
        setCategoryCounts(data);
      } catch (err) {
        setError("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async (page: number) => {
      try {
        const result: PaginatedProductsResult = await getNewestProducts(page);
        setNewestProducts(result.products);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        console.error("Failed to fetch newest products:", err);
      } finally {
      }
    };

    fetchCategoryCounts();
    fetchProducts(0);
  }, []);

  const handlePressCategory = (category: CategoryType) => {
    router.push({
      pathname: "/product",
      params: {
        link: category.link,
        title: category.title,
      },
    });
  };

  const handleNewestProduct = (keyword: string) => {
    router.push({
      pathname: "/product",
      params: {
        search: keyword,
      },
    });
  };

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

  const handleCategoryPress = () => {
    router.push({
      pathname: "/category",
      params: {
       
      },
    });
  }

  const Category = ({ category }: CategoryProps) => {
    const { width } = useWindowDimensions();
    const containerSize = width / 2 - 24; // hoặc điều chỉnh cho vừa ý

    const padding = 8;
    const spacing = 8;
    const imageSize = (containerSize - padding * 2 - spacing) / 2;

    const categoryCount = categoryCounts.find((c) => c.link === category.link);

    return (
      <TouchableOpacity
        onPress={() => handlePressCategory(category)}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
          margin: 4,
        }}
      >
        <View
          style={{
            width: containerSize,
            height: containerSize,
            padding: padding,
            backgroundColor: "#f0f0f0",
            borderRadius: 12,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "space-between",
          }}
        >
          {[category.icon1, category.icon2, category.icon3, category.icon4].map(
            (icon, index) => (
              <Image
                key={index}
                source={icon}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: 6,
                  backgroundColor: "#ddd",
                }}
              />
            )
          )}
        </View>

        <View
          style={[
            styles.dFlexSpBetween,
            { flex: 1, paddingHorizontal: 10, paddingVertical: 2 },
          ]}
        >
          <Text
            style={{ color: colors.darkPrimary, fontSize: 17, fontWeight: 500 }}
          >
            {category.title}
          </Text>
          <Text
            style={{
              backgroundColor: colors.primary,
              color: "black",
              paddingHorizontal: 7,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            {categoryCount ? categoryCount.count : 0}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  type SalingItemProps = {
    product: ProductItemModel;
  };

  const SalingItem = ({ product }: SalingItemProps) => {
    const screenWidth = Dimensions.get("window").width;
    const imgSize = screenWidth * 0.5 - 10;

    return (
      <View style={{ width: imgSize, margin: 6 }}>
        <TouchableOpacity
          // onPress={() => Linking.openURL(product.link)}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            margin: 4,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              // source={product.image}
              style={{ width: imgSize - 6, height: imgSize - 6 }}
            />
            <View
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                backgroundColor: "red",
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>
                -20%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <DefaultLayout >
      <Search />
      <FlatList
        style={{paddingHorizontal: 20}}
        ListHeaderComponent={
          <>
            <View style={{ borderRadius: 10, overflow: "hidden" }}>
              <MyCarousel images={imageList} carouselHeight={200} />
            </View>
            <View style={[styles.dFlexSpBetween, { marginTop: 10 }]}>
              <Text style={styles.heading}>Danh mục</Text>
              {/* <TouchableOpacity
                style={[styles.dFlex]}
                onPress={handleCategoryPress}
              >
                <Text style={{ color: "black", fontSize: 20 }}>Xem thêm</Text>
                <IconButton
                  icon="arrow-forward-circle"
                  onPress={handleCategoryPress}
                  iconColor={colors.darkPrimary}
                  iconSize={40}
                  style={{ padding: 0, marginLeft: 2 }}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.dFlex}>
              <Category category={categories[0]} />
              <Category category={categories[1]} />
            </View>
            <View style={styles.dFlex}>
              <Category category={categories[2]} />
              <Category category={categories[3]} />
            </View>
            <View style={[styles.dFlexSpBetween, { marginTop: 10 }]}>
              <Text style={styles.heading}>Mới nhất</Text>
              <TouchableOpacity
                style={[styles.dFlex]}
                onPress={() => handleNewestProduct("newest")}
              >
                <Text style={{ color: "black", fontSize: 20 }}>Xem thêm</Text>
                <IconButton
                  icon="arrow-forward-circle"
                  onPress={() => handleNewestProduct("newest")}
                  iconColor={colors.darkPrimary}
                  iconSize={40}
                  style={{ padding: 0, marginLeft: 2 }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={newestProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  thumbnail={item.thumbnail}
                />
              )}
            />
          </>
        }
        data={[]}
        renderItem={null}
      />
      {/* <Search />
      <ScrollView style={styles.container}>
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <MyCarousel images={imageList} carouselHeight={200} />
        </View>
        <View style={[styles.dFlexSpBetween, { marginTop: 10 }]}>
          <Text style={styles.heading}>Danh mục</Text>
          <TouchableOpacity
            style={[styles.dFlex]}
            onPress={() => Linking.openURL("https://example.com")}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Xem thêm</Text>
            <IconButton
              icon="arrow-forward-circle"
              onPress={handlePress}
              iconColor={colors.darkPrimary}
              iconSize={40}
              style={{ padding: 0, marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dFlex}>
          <Category category={categories[0]} />
          <Category category={categories[1]} />
        </View>
        <View style={styles.dFlex}>
          <Category category={categories[2]} />
          <Category category={categories[3]} />
        </View>
        <View style={[styles.dFlexSpBetween, { marginTop: 10 }]}>
          <Text style={styles.heading}>Mới nhất</Text>
          <TouchableOpacity
            style={[styles.dFlex]}
            onPress={() => handleNewestProduct("newest")}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Xem thêm</Text>
            <IconButton
              icon="arrow-forward-circle"
              onPress={() => handleNewestProduct("newest")}
              iconColor={colors.darkPrimary}
              iconSize={40}
              style={{ padding: 0, marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={newestProducts}
          renderItem={({ item }) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              thumbnail={item.thumbnail}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
        </ScrollView> */}
      {/* <View style={[styles.dFlexSpBetween, { marginTop: 10 }]}>
          <Text style={styles.heading}>Giảm giá sốc</Text>
          <TouchableOpacity
            style={[styles.dFlex]}
            onPress={() => Linking.openURL("https://example.com")}
          >
            <IconButton
              icon="alarm-outline"
              onPress={handlePress}
              iconColor={colors.darkPrimary}
              iconSize={30}
              style={{ padding: 0, marginLeft: 2 }}
            />
            <View style={[styles.dFlex]}>
              <Text style={styles.timeDitgit}>00</Text>
              <Text style={styles.timeDitgit}>10</Text>
              <Text style={styles.timeDitgit}>59</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={newestProducts}
          renderItem={({ item }) => <SalingItem product={item} />}
          showsHorizontalScrollIndicator={false}
        /> */}
      {/* <Text style={[styles.heading, { marginTop: 10 }]}>Dành cho bạn</Text> */}
      {/* <FlatList
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
        /> */}
    </DefaultLayout>
  );
}

export default Home;

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
