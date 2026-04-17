import { StyleSheet, View } from "react-native";
import FoodDetailEdit from "./component/foodDetailEdit";

export default function FoodItemEditPageScreen() {
  return (
    <View style={styles.container}>
      <FoodDetailEdit />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
