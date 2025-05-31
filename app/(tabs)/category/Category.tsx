import { FlatList, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

import { colors } from "@/baseStyle/Style";
import { SimpleButton } from "@/components/button";
import CategoryDropdown from "./components/CategoryDropdown";

type CategoryItem = {
  title: string;
  link: string;
};

type Category = {
  title: string;
  image: ImageSourcePropType;

  items: CategoryItem[];
};

const imgDir = "@/assets/images/category"

const categories: Category[] = [
  {
    title: "Quần áo",
    image: require(`${imgDir}/clothes.png`),
    items: [
      { title: "Áo thun", link: "ao-thun" },
      { title: "Polo", link: "polo" },
      { title: "Quần dài", link: "quan-dai" },
      { title: "Quần đùi", link: "quan-dui" },
      { title: "Váy", link: "vay" },
      { title: "Áo khoác", link: "ao-khoac" },
      { title: "Khác", link: "khác" },
    ],
  },
  {
    title: "Giày",
    image: require(`${imgDir}/shoe.png`),
    items: [
      { title: "Áo thun", link: "ao-thun" },
      { title: "Polo", link: "polo" },
      { title: "Quần dài", link: "quan-dai" },
      { title: "Quần đùi", link: "quan-dui" },
      { title: "Váy", link: "vay" },
      { title: "Áo khoác", link: "ao-khoac" },
      { title: "Khác", link: "khác" },
    ],
  },
  {
    title: "Túi xách",
    image: require(`${imgDir}/bag.png`),
    items: [
      { title: "Áo thun", link: "ao-thun" },
      { title: "Polo", link: "polo" },
      { title: "Quần dài", link: "quan-dai" },
      { title: "Quần đùi", link: "quan-dui" },
      { title: "Váy", link: "vay" },
      { title: "Áo khoác", link: "ao-khoac" },
      { title: "Khác", link: "khác" },
    ],
  },
  {
    title: "Phụ kiện",
    image: require(`${imgDir}/accessory.jpg`),
    items: [
      { title: "Áo thun", link: "ao-thun" },
      { title: "Polo", link: "polo" },
      { title: "Quần dài", link: "quan-dai" },
      { title: "Quần đùi", link: "quan-dui" },
      { title: "Váy", link: "vay" },
      { title: "Áo khoác", link: "ao-khoac" },
      { title: "Khác", link: "khác" },
    ],
  },
  {
    title: "Dành cho bạn",
    image: require(`${imgDir}/forYou.png`),
    items: [],
  },
];

function Category() {
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

  const handlePress = () => {
    console.log("handlePress");
    showAlert();
  };

  return (
    <View style={styles.container}>
      <View style={styles.dFlexSpBetween}>
        <Text style={styles.title}>Danh mục</Text>
        <Icon name="times" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={[styles.dFlexSpBetween, { marginTop: 30 }]}>
        <SimpleButton
          title="Chung"
          onPress={handlePress}
          status="blur"
          style={{ flex: 1 }}
        />
        <SimpleButton
          title="Nam"
          onPress={handlePress}
          status="active"
          style={{ flex: 1, marginHorizontal: 10 }}
        />
        <SimpleButton
          title="Nữ"
          onPress={handlePress}
          status="blur"
          style={{ flex: 1 }}
        />
      </View>
      <View style={{marginTop:15}}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.title} // dùng title vì item không có `link` trực tiếp
          renderItem={({ item }: { item: Category }) => (
            <CategoryDropdown
              title={item.title}
              image={item.image}  
              data={item.items.map((subItem) => ({
                title: subItem.title,
                link: subItem.link,
              }))}
              selectedItem={null}
              onSelect={(selected) => console.log(selected)}
            />
          )}
        />
      </View>
    </View>
  );
}

export default Category;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 40,
    // backgroundColor: '#fff'
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
