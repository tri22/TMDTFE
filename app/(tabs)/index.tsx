import { StyleSheet } from "react-native";

import Home from "../../components/home";
export default function HomeScreen() {
  return (
    <Home></Home>
    // <ScrollView>
   

    //   <BottomNavigation />
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
