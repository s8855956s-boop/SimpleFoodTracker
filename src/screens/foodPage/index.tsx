import { StyleSheet, View } from "react-native";
import FoodLog from "./components/foodLog";

export default function FoodPage() {
  return (
    <View style={style.container}>
      <FoodLog title="Breakfast" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#e4e4e4",
    padding: 10,
    height: "100%",
    width: "100%",
  },
});
