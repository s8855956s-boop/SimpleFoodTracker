import { StyleSheet, View } from "react-native";
import FoodLog from "./components/foodLog";

export default function FoodPage() {
  return (
    <View style={styles.container}>
      <FoodLog title="早餐" totalCalories={300} foodItems={["燕麥", "香蕉"]} />
      <View style={styles.separator} />
      <FoodLog title="午餐" />
      <View style={styles.separator} />
      <FoodLog title="晚餐" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: "10%",
    width: "90%",
  },
  separator: {
    height: 1,
    backgroundColor: "#848484",
    marginVertical: 4,
  },
});
