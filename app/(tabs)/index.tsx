import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomNavigation } from "../../components/BottomNavigation";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>hello</Text>
        <Text>hello</Text>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 100, // Đảm bảo BottomNavigation không che khuất nội dung
  },
});
