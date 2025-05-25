import { colors } from "@/baseStyle/Style";
import { SimpleButton } from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type DropdownItem = {
  title: string;
  link: string;
};

type Props = {
  title: string;
  data: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  selectedItem: DropdownItem | null;
  image?: ImageSourcePropType;
};

export default function CategoryDropdown({
  title,
  data,
  onSelect,
  selectedItem,
  image,
}: Props) {
  const [visible, setVisible] = useState(false);

  const handleToggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    setVisible(false);
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={handleToggleDropdown}
      >
        <View style={styles.content}>
          {image && <Image source={image} style={styles.image} />}
          <Text style={styles.text}>{title}</Text>
        </View>
        {Array.isArray(data) && data.length > 0 ? (
          <Ionicons
            name={visible ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        ) : (
          <View
            style={{
              backgroundColor: colors.primary, 
              borderRadius: 50,
              padding: 10, 
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
            }}
          >
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </View>
        )}
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.link}
            renderItem={({ item }) => (
              <SimpleButton
                title={item.title}
                onPress={() => handleSelect(item)}
                status="blur"
                style={{ width: "50%", marginHorizontal: 10, marginBottom: 10 }}
              />
            )}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    // iOS shadow properties
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Vị trí bóng (width, height)
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 4, // Độ rộng của bóng

    // Android shadow property
    elevation: 5, // Độ cao của bóng (tạo bóng trên Android)
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 4,
  },
  text: {
    color: "#000",
    fontWeight: "500",
  },
  dropdown: {
    // padding: 12,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 6,
  },
  dropdownList: {
    marginTop: 15,
  },
  item: {
    margin: 10,
  },
});
