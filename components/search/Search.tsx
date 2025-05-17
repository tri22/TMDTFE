import React, { useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { colors } from "@/baseStyle/Style";
import { IconButton, SimpleButton } from "@/components/button";
import ProductItem from "@/components/productItem";

const imgDir = "@/assets/images/searchProduct";

const recentSearches: string[] = [
  "túi xách",
  "kính râm",
  "nón",
  "quần mustard",
  "giày addidas",
];

const suggestions: string[] = [
  "Váy",
  "Phụ kiện",
  "Áo thun đen",
  "Jeans",
  "Giày trắng",
];

type ProductItem = {
  name: string;
  image: ImageSourcePropType;
  price: number;
  link: string;
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

function Search() {
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

  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    console.log("handlePress");
    showAlert();
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.dFlex}>
        {isFocused && (
          <IconButton
            icon="arrow-back"
            onPress={()=> setIsFocused(false)}
            status="blur"
            style={{ paddingLeft: 0 }}
          />
        )}

        <View style={[styles.inputWrapper]}>
          <TextInput
            style={[styles.inputText, isFocused && styles.inputFocused]}
            placeholderTextColor={"lightgray"}
            placeholder="Tìm kiếm"
            onChangeText={setSearch}
            value={search}
            onFocus={() => setIsFocused(true)}
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
      </View>
      {isFocused && (
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <View style={styles.dFlexSpBetween}>
              <Text style={styles.label}>Đã tìm gần đây</Text>
              <IconButton
                icon="trash-outline"
                onPress={handlePress}
                iconColor="red"
                style={{}}
              />
            </View>
            <View
              style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}
            >
              {recentSearches.map((item, index) => (
                <SimpleButton
                  key={index}
                  title={item}
                  onPress={handlePress}
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
                  onPress={handlePress}
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
              data={products}
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
