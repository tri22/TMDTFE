import { colors } from "@/baseStyle/Style";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";

// cach dung
{
  /* <Button title="Ẩn nhẹ" onPress={handlePress} status="blur" style={{ marginTop: 20, borderRadius: 12 }}/> */
}

type ButtonStatus = "active" | "blur" | "disabled" | "gray";

type Props = {
  icon: string; // ví dụ: "chevron-forward"
  onPress: () => void;
  status?: ButtonStatus;
  style?: StyleProp<ViewStyle>; // 👈 thêm prop style ngoài
  iconSize?: number;
  iconColor?: string;
};

export default function IconButton({ icon, onPress, status, style, iconSize, iconColor }: Props) {
  const isDisabled = status === "disabled";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        status === "active" && styles.active,
        status === "blur" && styles.blur,
        status === "gray" && styles.gray,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Ionicons
        name={icon as any}
        size={iconSize ?? 25} 
        color={isDisabled ? "#aaa" : (iconColor ? iconColor : colors.primary)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 0,
    alignItems: "center",
    // alignSelf: "flex-start",
  },
  text: {
    color: "#000",
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
  gray: {
    // backgroundColor: "#ccc",
    // color: colors.white,
  },
  disabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
  },
  disabledText: {
    color: "#999",
  },
});
