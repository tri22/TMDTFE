import { colors } from "@/baseStyle/Style";
import { Ionicons } from '@expo/vector-icons';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

// cach dung
{/* <Button title="Ẩn nhẹ" 
  onPress={handlePress} 
  status="blur" 
  style={{ marginTop: 20, borderRadius: 12 }}
  image={require('../assets/login.png')}
  /> */}


type ButtonStatus = 'show' | 'hide' | 'disabled';

type Props = {
  title: string;
  onPress: () => void;
  status?: ButtonStatus;
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
};

export default function SimpleButton({ title,image, onPress, status, style }: Props) {
  const isShow = status === 'show';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style, 
      ]}
      onPress={onPress}
      disabled={status==='disabled'}
    >
      
      <View style={styles.content}>
        {image && <Image source={image} style={styles.image} />}
        <Text style={styles.text}>{title}</Text>
      </View>
      <Ionicons
          name={isShow ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#333"
        />
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
      justifyContent: 'space-between',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 20,
      height: 20,
      marginRight: 8,
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
