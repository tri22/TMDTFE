import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ProductItem from "@/app/(tabs)/product/components/productItem";
import { colors } from "@/baseStyle/Style";
import { IconButton, SimpleButton } from "@/components/button";
import { ProductItemModel } from "@/models/ProductItemModel";
import {
  clearSearchHistory,
  getRecentViewedProduct,
  getSearchHistory,
  saveSearchHistory,
} from "@/util/historySeach";
import { useLocalSearchParams, useRouter } from "expo-router";

const suggestions: string[] = [
  "Váy",
  "Phụ kiện",
  "Áo thun đen",
  "Jeans",
  "Giày trắng",
];

type Props = {
  isBack?: boolean;
};

function Search({ isBack }: Props) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentViewedProducts, setRecentViewedProducts] = useState<
    ProductItemModel[]
  >([]);
  const { search: searchingParam } = useLocalSearchParams();
  const searchParam = useMemo(() => {
    if (Array.isArray(searchingParam)) {
      return searchingParam.length > 0 ? searchingParam[0] : "";
    }
    return searchingParam || "";
  }, [searchingParam]);

  const { height: screenHeight } = Dimensions.get("window");
  const inputRef = useRef<TextInput>(null);
  const handleSearch = () => {
    router.push({
      pathname: "/product",
      params: {
        search: search,
      },
    });
    saveSearchHistory(search);
    fetchHistory();
  };

  const handlePressRecentSeachItem = (keyword: string) => {
    router.push({
      pathname: "/product",
      params: {
        search: keyword,
      },
    });
    saveSearchHistory(keyword);
  };
  const fetchHistory = async () => {
    const searches = await getSearchHistory(); // await ở đây
    setRecentSearches(searches ?? []);
  };

  const fetchRecentViewedProducts = async () => {
    const products = await getRecentViewedProduct();
    setRecentViewedProducts(products ?? []);
  };

  useEffect(() => {
    fetchHistory(); // gọi hàm async
    fetchRecentViewedProducts();
    if (searchParam !== "") setSearch(searchParam);
    setIsFocused(false);
  }, []);

  const clearSearch = () => {
    setSearch("");
  };

  useEffect(() => {
    if (!isFocused && inputRef.current) {
      console.log("chuan bi blur");
      inputRef.current.blur();
    }
    fetchHistory(); // gọi hàm async
    fetchRecentViewedProducts();
  }, [isFocused]);

  const router = useRouter();

  const handleGoBack = () => {
    // back?.();
    setIsFocused(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.dFlex}>
        {isBack === true && !isFocused && (
          <TouchableOpacity
            onPress={handleGoBack}
            style={{ padding: 10, paddingLeft: 0 }}
          >
            <Text style={{ color: colors.primary }}>Quay lại</Text>
          </TouchableOpacity>
        )}
        {isFocused && (
          <IconButton
            icon="arrow-back"
            onPress={() => setIsFocused(false)}
            status="blur"
            style={{ paddingLeft: 0 }}
          />
        )}

        <View style={[styles.inputWrapper]}>
          <TextInput
            ref={inputRef}
            style={[styles.inputText, isFocused && styles.inputFocused]}
            placeholderTextColor={"lightgray"}
            placeholder="Tìm kiếm"
            onChangeText={setSearch}
            value={search}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            // onBlur={() => {
            //   setTimeout(() => setIsFocused(false), 100); // delay nhẹ
            // }}
          />
          {search !== "" && (
            <IconButton
              icon="close-circle"
              onPress={clearSearch}
              iconColor="#bbb"
              iconSize={20}
              style={{ padding: 0, marginRight: 7 }}
            />
          )}

          <IconButton
            icon="search"
            onPress={handleSearch}
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
      </View>
      {isFocused  && (
        <View style={{ height: screenHeight }}>
          {recentSearches.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <View style={styles.dFlexSpBetween}>
                <Text style={styles.label}>Đã tìm gần đây</Text>
                <IconButton
                  icon="trash-outline"
                  onPress={() => {
                    setRecentSearches([]);
                    clearSearchHistory();
                  }}
                  iconColor="red"
                  style={{}}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {recentSearches.map((item: string, index: number) => (
                  <SimpleButton
                    key={index}
                    title={item}
                    onPress={() => handlePressRecentSeachItem(item)}
                    textColor="black"
                    style={{
                      backgroundColor: "#ccc",
                      margin: 4,
                      paddingHorizontal: 10,
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={styles.label}>Gợi ý</Text>
            </View>
            <View
              style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}
            >
              {suggestions.map((item, index) => (
                <SimpleButton
                  key={index}
                  title={item}
                  onPress={() => handlePressRecentSeachItem(item)}
                  textColor="black"
                  style={{
                    backgroundColor: "#ccc",
                    margin: 4,
                    paddingHorizontal: 10,
                  }}
                />
              ))}
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Khám phá</Text>
            <FlatList
              horizontal
              data={recentViewedProducts}
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
          </View>
        </View>
      )}
    </View>
  );
}

export default Search;

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
    fontSize: 30,
    fontWeight: "bold",
  },
  label: {
    fontSize: 17,
    fontWeight: "400",
    color: "gray",
  },
  icon: {
    padding: 10,
  },

  dropdown: {
    marginTop: 5,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  examScheduleContainer: {
    marginTop: 16,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  examScheduleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subjectsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectContainer: {
    width: "100%",
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    backgroundColor: colors.backgroundColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  scoreItem: {
    flex: 1,
    textAlign: "left",
  },

  loadingContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#bec4c2",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: 0 }],
    width: 150,
    height: 150,
    justifyContent: "center",
    borderRadius: 10,
    opacity: 0.8,
  },
});
