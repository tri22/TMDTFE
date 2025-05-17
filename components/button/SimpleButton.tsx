import { colors } from "@/baseStyle/Style";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";


// cach dung
{/* <Button title="Ẩn nhẹ" onPress={handlePress} status="blur" style={{ marginTop: 20, borderRadius: 12 }}/> */}


type ButtonStatus = 'active' | 'blur' | 'disabled';

type Props = {
  title: string;
  onPress: () => void;
  status?: ButtonStatus;
  style?: StyleProp<ViewStyle>; // 👈 thêm prop style ngoài
  textColor?: string;
};

export default function SimpleButton({ title, onPress, status, style, textColor }: Props) {
  const isDisabled = status === 'disabled';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        status === 'active' && styles.active,
        status === 'blur' && styles.blur,
        isDisabled && styles.disabled,
        style, // 👈 style truyền từ ngoài
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[styles.text, isDisabled && styles.disabledText, textColor && { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: '#fff',
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    text: {
      color: '#000',
      fontWeight: '500',
    },
    active: {
      backgroundColor: colors.blurPrimary,
      borderColor: colors.primary,
      color: colors.primary
    },
    blur: {
      borderColor: colors.blurPrimary,
    },
    disabled: {
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
    },
    disabledText: {
      color: '#999',
    },
  });
