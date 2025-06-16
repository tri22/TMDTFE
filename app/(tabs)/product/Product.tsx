import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ProductItem from "./components/productItem";

import {
  getNewestProducts,
  getProductsByCategory,
  searchProductByKeyword,
} from "@/api/productApi";
import { colors } from "@/baseStyle/Style";
import {
  PaginatedProductsResult,
  ProductItemModel,
} from "@/models/ProductItemModel";
import { ActivityIndicator } from "react-native-paper";
import DefaultLayout from "../DefaultLayout";
import Search from "../home/components/search";

const imgDirRoot = "@/assets/images";
const imgDir = "@/assets/images/searchProduct";

function Product() {
  const [products, setProducts] = useState<ProductItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { link, title, search } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(true); // Đổi tên từ hasMore cho nhất quán
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<number>(0); // Trang hiện tại backend trả về (bắt đầu từ 0)
  const [pageTitle, setPageTitle] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);


  const categoryLink = useMemo(() => {
    if (Array.isArray(link)) {
      return link.length > 0 ? link[0] : "/home";
    }
    return link;
  }, [link]);

  const categoryTitle = useMemo(() => {
    if (Array.isArray(title)) {
      return title.length > 0 ? title[0] : "Phân loại";
    }
    return title || "Phân loại";
  }, [title]);

  const searchParam = useMemo(() => {
    if (Array.isArray(search)) {
      return search.length > 0 ? search[0] : null;
    }
    return search || null;
  }, [search]);

  const fetchProductsByCategory = async (
    categoryLink: string,
    page: number
  ) => {
    if (!hasNext) {
      console.log("het san pham");
      return;
    }
    try {
      const result: PaginatedProductsResult = await getProductsByCategory(
        categoryLink,
        page
      );
      setProducts((prevProducts) => [...prevProducts, ...result.products]);
      setHasNext(!result.isLast);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("Failed to fetch products:", err);
    } finally {
    }
  };

  const fetchSearchProducts = async (keyword: string, page: number) => {
    try {
      const result: PaginatedProductsResult =
        keyword === "newest"
          ? await getNewestProducts(page)
          : await searchProductByKeyword(keyword, page);
      setProducts((prevProducts) => [...prevProducts, ...result.products]);
      setHasNext(!result.isLast);
      if (keyword === "newest") setPageTitle(`Kết quả tìm kiếm theo Mới nhất`);
      else setPageTitle(`Kết quả tìm kiếm cho ${keyword}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("Failed to fetch products:", err);
    } finally {
    }
  };

  useEffect(() => {
    setPageTitle(categoryTitle);
  }, [categoryTitle]);

  useEffect(() => {
    setProducts([]);
    setNextPage(0);
  }, [categoryLink, searchParam]);

  useEffect(() => {
    if (nextPage != null)
      if (searchParam === null) fetchProductsByCategory(categoryLink, nextPage);
      else fetchSearchProducts(searchParam, nextPage);
  }, [nextPage]);

  const handleLoadMore = () => {
    setNextPage((prev) => prev + 1);
  };

  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator style={{ marginVertical: 20 }} size="large" />;
    }
    if (!hasNext && products.length > 0) {
      return (
        <Text
          style={{ textAlign: "center", marginVertical: 20, color: "#888" }}
        >
          Đã tải hết sản phẩm.
        </Text>
      );
    }
    return null;
  };

  return (
    <DefaultLayout>
      {/* <Search isBack={true} back={handleGoBack} isFocusing={isSearchFocused}/> */}
      <Search isBack={true}/>
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <Text
            style={[
              styles.heading,
              {
                marginTop: 10,
                marginBottom: 10,
              },
            ]}
          >
            {pageTitle}
          </Text>
        }
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            id={item.id}
            name={item.name}
            price={item.price}
            thumbnail={item.thumbnail}
          />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
     
    </DefaultLayout>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
